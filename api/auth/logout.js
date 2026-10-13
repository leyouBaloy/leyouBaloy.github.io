import { TOKEN_COOKIE } from '../_lib/github.js';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', `${TOKEN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  res.status(200).json({ ok: true });
}
