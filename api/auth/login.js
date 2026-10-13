import crypto from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return res.status(500).send('GITHUB_CLIENT_ID not configured');
  const url = new URL(req.url, `https://${req.headers.host}`);
  const ret = url.searchParams.get('return') || '/';
  const safeReturn = ret.startsWith('/') && !ret.startsWith('//') ? ret : '/';
  const state = crypto.randomBytes(16).toString('hex');
  res.setHeader('Set-Cookie', [
    `cc_oauth_state=${state}; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    `cc_return=${encodeURIComponent(safeReturn)}; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  ]);
  const gh = new URL('https://github.com/login/oauth/authorize');
  gh.searchParams.set('client_id', clientId);
  gh.searchParams.set('redirect_uri', `https://${req.headers.host}/api/auth/callback`);
  gh.searchParams.set('scope', 'public_repo');
  gh.searchParams.set('state', state);
  res.statusCode = 302;
  res.setHeader('Location', gh.toString());
  res.end();
}
