import { TOKEN_COOKIE, parseCookies, viewerFromToken } from '../_lib/github.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const token = parseCookies(req)[TOKEN_COOKIE];
  if (!token) return res.status(200).json({ user: null });
  try {
    return res.status(200).json({ user: await viewerFromToken(token) });
  } catch {
    return res.status(200).json({ user: null });
  }
}
