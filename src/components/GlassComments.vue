<template>
  <div class="gc glass" id="comments">
    <header class="gc-head">
      <h3>评论 <span v-if="total" class="gc-count">{{ total }}</span></h3>
      <div class="gc-user">
        <template v-if="user">
          <img :src="user.avatarUrl" alt="" class="gc-avatar sm" />
          <span>{{ user.login }}</span>
          <button type="button" class="gc-btn ghost" @click="logout">退出</button>
        </template>
        <button v-else-if="canPost" type="button" class="gc-btn" @click="login">使用 GitHub 登录</button>
      </div>
    </header>

    <div v-if="state === 'loading'" class="gc-state">
      <span class="gc-spinner" aria-hidden="true"></span> 评论加载中...
    </div>
    <div v-else-if="state === 'error'" class="gc-state">
      评论暂时无法加载。
      <a :href="fallbackUrl" target="_blank" rel="noopener">去 GitHub 查看讨论 ↗</a>
      <button type="button" class="gc-btn ghost" @click="load">重试</button>
    </div>
    <template v-else>
      <p v-if="!comments.length" class="gc-state">还没有评论，来抢沙发吧～</p>
      <ul class="gc-list">
        <li v-for="c in comments" :key="c.id" class="gc-item">
          <CommentCard :c="c" />
          <ul v-if="c.replies.length" class="gc-replies">
            <li v-for="r in c.replies" :key="r.id"><CommentCard :c="r" /></li>
          </ul>
          <div class="gc-actions">
            <button v-if="canPost && user" type="button" class="gc-link" @click="replyTo = replyTo === c.id ? null : c.id">
              {{ replyTo === c.id ? '取消回复' : '回复' }}
            </button>
          </div>
          <Composer v-if="replyTo === c.id" :busy="busy" placeholder="写下你的回复（支持 Markdown）" @submit="(t) => submit(t, c.id)" />
        </li>
      </ul>
    </template>

    <footer class="gc-foot">
      <p v-if="!canPost" class="gc-note">
        预览模式：评论为静态快照，登录与发表已禁用。
        <a :href="fallbackUrl" target="_blank" rel="noopener">在 GitHub 上参与讨论 ↗</a>
      </p>
      <Composer v-else-if="user" :busy="busy" placeholder="留下你的评论（支持 Markdown）" @submit="(t) => submit(t, null)" />
      <p v-else class="gc-note">登录 GitHub 后即可评论，评论会保存在仓库的 Discussions 中。</p>
      <p v-if="postError" class="gc-error">{{ postError }}</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({ term: { type: String, required: true } });

const SNAPSHOT = import.meta.env.VITE_COMMENTS_MODE === 'snapshot';
const REPO = 'leyouBaloy/leyouBaloy.github.io';
// html:false escapes any raw HTML in comment bodies; markdown-it also rejects javascript:/data: links.
const md = new MarkdownIt({ html: false, linkify: true, breaks: true });
const defaultLink = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  tokens[idx].attrSet('target', '_blank');
  tokens[idx].attrSet('rel', 'noopener nofollow ugc');
  return defaultLink(tokens, idx, opts, env, self);
};

const state = ref('loading');
const comments = ref([]);
const discussion = ref(null);
const user = ref(null);
const replyTo = ref(null);
const busy = ref(false);
const postError = ref('');
const canPost = !SNAPSHOT;

const total = computed(() => comments.value.reduce((n, c) => n + 1 + c.replies.length, 0));
const fallbackUrl = computed(() =>
  discussion.value?.url || `https://github.com/${REPO}/discussions?discussions_q=${encodeURIComponent(`"${props.term}"`)}`,
);

const fmt = (d) => new Date(d).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' });

const CommentCard = defineComponent({
  props: { c: Object },
  setup(p) {
    return () => {
      const c = p.c;
      const name = c.author.url
        ? h('a', { href: c.author.url, target: '_blank', rel: 'noopener', class: 'gc-name' }, c.author.name)
        : h('span', { class: 'gc-name' }, c.author.name);
      return h('article', { class: ['gc-card', c.isGrokBot && 'is-bot'] }, [
        h('img', { class: 'gc-avatar', src: c.author.avatarUrl, alt: c.author.name, loading: 'lazy' }),
        h('div', { class: 'gc-main' }, [
          h('div', { class: 'gc-meta' }, [
            name,
            c.isGrokBot ? h('span', { class: 'gc-badge', title: '由 AI 助手撰写' }, 'AI') : null,
            h('a', { class: 'gc-time', href: c.url, target: '_blank', rel: 'noopener' }, fmt(c.createdAt)),
          ]),
          c.isMinimized
            ? h('p', { class: 'gc-body muted' }, '该评论已被隐藏')
            : h('div', { class: 'gc-body markdown', innerHTML: md.render(c.body || '') }),
          c.reactions ? h('span', { class: 'gc-react' }, `👍 ${c.reactions}`) : null,
        ]),
      ]);
    };
  },
});

const Composer = defineComponent({
  props: { busy: Boolean, placeholder: String },
  emits: ['submit'],
  setup(p, { emit }) {
    const text = ref('');
    const send = () => {
      if (!text.value.trim() || p.busy) return;
      emit('submit', text.value);
      text.value = '';
    };
    return () =>
      h('div', { class: 'gc-composer' }, [
        h('textarea', {
          value: text.value,
          placeholder: p.placeholder,
          rows: 4,
          onInput: (e) => (text.value = e.target.value),
          onKeydown: (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') send(); },
        }),
        h('button', { type: 'button', class: 'gc-btn', disabled: p.busy || !text.value.trim(), onClick: send }, p.busy ? '发送中...' : '发表'),
      ]);
  },
});

async function load() {
  state.value = 'loading';
  try {
    let data;
    if (SNAPSHOT) {
      const res = await fetch('/comments-snapshot.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('snapshot');
      data = (await res.json())[props.term] || { discussion: null, comments: [] };
    } else {
      const res = await fetch(`/api/comments?term=${encodeURIComponent(props.term)}`);
      if (!res.ok) throw new Error(String(res.status));
      data = await res.json();
    }
    discussion.value = data.discussion;
    comments.value = data.comments || [];
    state.value = 'ready';
  } catch {
    state.value = 'error';
  }
}

async function loadUser() {
  if (!canPost) return;
  try {
    const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (res.ok) user.value = (await res.json()).user;
  } catch { /* ignore */ }
}

function login() {
  window.location.href = `/api/auth/login?return=${encodeURIComponent(window.location.pathname)}`;
}
async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  user.value = null;
}

async function submit(body, replyToId) {
  busy.value = true;
  postError.value = '';
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ term: props.term, body, replyToId }),
    });
    if (res.status === 401) { user.value = null; throw new Error('登录已过期，请重新登录'); }
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || '发表失败');
    replyTo.value = null;
    await load();
  } catch (e) {
    postError.value = e.message;
  } finally {
    busy.value = false;
  }
}

onMounted(() => { load(); loadUser(); });
watch(() => props.term, load);
</script>

<style scoped>
.gc { padding: var(--space-5); color: var(--glass-text); text-align: left; }
.gc-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: var(--space-4); }
.gc-head h3 { margin: 0; font-size: 18px; }
.gc-count { font-size: 13px; padding: 2px 8px; border-radius: var(--radius-pill); background: var(--glass-bg-strong); color: var(--glass-text-muted); margin-left: 4px; }
.gc-user { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.gc-state { color: var(--glass-text-muted); display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-size: 14px; }
.gc-state a, .gc-note a { color: var(--accent); }
.gc-spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--glass-border); border-top-color: var(--accent); animation: gc-spin .8s linear infinite; }
@keyframes gc-spin { to { transform: rotate(360deg); } }
.gc-list, .gc-replies { list-style: none; margin: 0; padding: 0; }
.gc-item { padding: var(--space-3) 0; border-bottom: 1px solid var(--glass-border); }
.gc-item:last-child { border-bottom: 0; }
.gc-replies { margin: var(--space-2) 0 0 44px; padding-left: var(--space-3); border-left: 2px solid var(--glass-border); }
:deep(.gc-card) { display: flex; gap: 12px; padding: var(--space-2); border-radius: var(--radius-md); }
:deep(.gc-card.is-bot) { background: linear-gradient(135deg, rgba(56,189,248,.10), rgba(139,92,246,.10)); }
:deep(.gc-avatar), .gc-avatar { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; object-fit: cover; box-shadow: var(--glass-shadow); }
.gc-avatar.sm { width: 24px; height: 24px; }
:deep(.gc-main) { min-width: 0; flex: 1; }
:deep(.gc-meta) { display: flex; align-items: center; gap: 8px; font-size: 13px; flex-wrap: wrap; }
:deep(.gc-name) { font-weight: 600; color: var(--glass-text); text-decoration: none; }
:deep(.gc-badge) { font-size: 10px; font-weight: 700; letter-spacing: .5px; padding: 1px 6px; border-radius: var(--radius-pill); color: #fff; background: linear-gradient(135deg, #38bdf8, #8b5cf6); }
:deep(.gc-time) { color: var(--glass-text-muted); text-decoration: none; }
:deep(.gc-body) { font-size: 15px; line-height: 1.7; word-break: break-word; margin-top: 2px; }
:deep(.gc-body p) { margin: 4px 0; }
:deep(.gc-body pre) { overflow-x: auto; padding: 8px; border-radius: var(--radius-sm); background: var(--glass-bg-strong); }
:deep(.gc-body img) { max-width: 100%; }
:deep(.gc-body a) { color: var(--accent); }
:deep(.gc-body.muted) { color: var(--glass-text-muted); font-style: italic; }
:deep(.gc-react) { font-size: 12px; color: var(--glass-text-muted); }
.gc-actions { margin-left: 48px; }
.gc-link { background: none; border: 0; color: var(--accent); cursor: pointer; font-size: 13px; padding: 0; }
.gc-foot { margin-top: var(--space-4); }
.gc-note { color: var(--glass-text-muted); font-size: 13px; margin: 0; }
.gc-error { color: #ef4444; font-size: 13px; }
:deep(.gc-composer) { display: flex; flex-direction: column; gap: 8px; margin-top: var(--space-2); }
:deep(.gc-composer textarea) { width: 100%; box-sizing: border-box; resize: vertical; padding: 10px 12px; font: inherit; color: var(--glass-text); background: var(--glass-bg-strong); border: 1px solid var(--glass-border); border-radius: var(--radius-md); outline: none; }
:deep(.gc-composer textarea:focus) { border-color: var(--accent); }
:deep(.gc-btn), .gc-btn { align-self: flex-end; padding: 6px 14px; border-radius: var(--radius-pill); border: 1px solid var(--glass-border); background: var(--accent); color: #fff; cursor: pointer; font-size: 13px; }
:deep(.gc-btn:disabled) { opacity: .5; cursor: not-allowed; }
.gc-btn.ghost { background: var(--glass-bg-strong); color: var(--glass-text); }
</style>
