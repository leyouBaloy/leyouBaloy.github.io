import { TOKEN_COOKIE, cookie, parseCookies } from '../_lib/github.js';

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookies = parseCookies(req);
  if (!code || !state || state !== cookies.cc_oauth_state) return res.status(400).send('Invalid OAuth state');
  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `https://${req.headers.host}/api/auth/callback`,
    }),
  });
  const json = await r.json().catch(() => ({}));
  if (!json.access_token) return res.status(400).send('OAuth exchange failed');
  res.setHeader('Set-Cookie', [
    cookie(TOKEN_COOKIE, json.access_token, 60 * 60 * 24 * 30),
    'cc_oauth_state=; Path=/api/auth; Max-Age=0',
    'cc_return=; Path=/api/auth; Max-Age=0',
  ]);
  const ret = cookies.cc_return || '/';
  res.statusCode = 302;
  res.setHeader('Location', ret.startsWith('/') && !ret.startsWith('//') ? `${ret}#comments` : '/');
  res.end();
}
