import { CATEGORY_ID, REPO_ID, TOKEN_COOKIE, findDiscussion, gql, normalizeTerm, parseCookies, sha1, shapeComment } from './_lib/github.js';

const SITE = process.env.SITE_URL || 'https://leyoubaloy.github.io';

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { return {}; }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    if (req.method === 'GET') {
      const term = normalizeTerm(req.query?.term ?? new URL(req.url, 'http://x').searchParams.get('term'));
      if (!term) return res.status(400).json({ error: 'invalid term' });
      const d = await findDiscussion(term);
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=300');
      if (!d) return res.status(200).json({ term, discussion: null, comments: [] });
      return res.status(200).json({
        term,
        discussion: { id: d.id, number: d.number, url: d.url, totalCount: d.comments.totalCount },
        comments: d.comments.nodes.map(shapeComment),
      });
    }

    if (req.method === 'POST') {
      const token = parseCookies(req)[TOKEN_COOKIE];
      if (!token) return res.status(401).json({ error: 'login required' });
      const { term: rawTerm, body, replyToId } = await readBody(req);
      const term = normalizeTerm(rawTerm);
      const text = String(body || '').trim();
      if (!term) return res.status(400).json({ error: 'invalid term' });
      if (!text || text.length > 65536) return res.status(400).json({ error: 'empty or too long' });

      let discussionId = (await findDiscussion(term))?.id;
      if (!discussionId) {
        // Same title/body format as Giscus (mapping=pathname)
        const url = `${SITE}/${term}`;
        const dBody = `# ${term}\n\n\n\n${url}\n\n<!-- sha1: ${sha1(term)} -->`;
        // Created with the server token so the discussion is owned by the repo owner, like Giscus' bot.
        const created = await gql(
          `mutation($r: ID!, $c: ID!, $t: String!, $b: String!) {
            createDiscussion(input: { repositoryId: $r, categoryId: $c, title: $t, body: $b }) { discussion { id } } }`,
          { r: REPO_ID, c: CATEGORY_ID, t: term, b: dBody },
        );
        discussionId = created.createDiscussion.discussion.id;
      }
      const data = await gql(
        `mutation($d: ID!, $b: String!, $r: ID) {
          addDiscussionComment(input: { discussionId: $d, body: $b, replyToId: $r }) {
            comment { id body createdAt url isMinimized author { login avatarUrl url } reactions { totalCount } replies(first: 1) { nodes { id } } } } }`,
        { d: discussionId, b: text, r: replyToId || null },
        token,
      );
      return res.status(201).json({ comment: shapeComment(data.addDiscussionComment.comment) });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.message });
  }
}
