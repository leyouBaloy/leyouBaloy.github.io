// Builds public/comments-snapshot.json (term -> {discussion, comments}) for the static preview.
// Usage: GITHUB_TOKEN=... node scripts/build-comments-snapshot.mjs [grok-ids.json]
// Comments whose IDs are listed in the optional ids file are rendered as Grok Bot (preview-only overlay,
// simulating the `<!-- grok-bot -->` marker before it is actually added on GitHub).
import fs from 'node:fs';
import { GROK_MARKER, REPO_NAME, REPO_OWNER, gql, shapeComment } from '../api/_lib/github.js';

const ids = new Set(process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).map((x) => x.id || x) : []);
const F = 'id body createdAt url isMinimized author { login avatarUrl url } reactions { totalCount }';
const Q = `query($c: String) { repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
  discussions(first: 50, after: $c) { pageInfo { hasNextPage endCursor }
    nodes { id number title url comments(first: 100) { totalCount nodes { ${F} replies(first: 50) { nodes { ${F} } } } } } } } }`;

const out = {};
let cursor = null;
const mark = (c) => (ids.has(c.id) && !c.body.startsWith(GROK_MARKER) ? { ...c, body: `${GROK_MARKER}\n${c.body}` } : c);
do {
  const d = (await gql(Q, { c: cursor })).repository.discussions;
  for (const n of d.nodes) {
    out[n.title] = {
      discussion: { id: n.id, number: n.number, url: n.url, totalCount: n.comments.totalCount },
      comments: n.comments.nodes.map((c) => shapeComment({ ...mark(c), replies: { nodes: c.replies.nodes.map(mark) } })),
    };
  }
  cursor = d.pageInfo.hasNextPage ? d.pageInfo.endCursor : null;
} while (cursor);
fs.writeFileSync('public/comments-snapshot.json', JSON.stringify(out));
console.log(`snapshot: ${Object.keys(out).length} discussions, ${ids.size} Grok Bot overrides`);
