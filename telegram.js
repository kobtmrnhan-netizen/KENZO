export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  
  const TOKEN = process.env.TG_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;
  const { text } = req.body || {};

  if (!TOKEN || !CHAT_ID) return res.status(500).json({ ok: false, error: 'Thiếu cấu hình' });
  if (!text) return res.status(400).json({ ok: false, error: 'Thiếu nội dung' });

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'HTML' })
    });
    const data = await tgRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Lỗi Server' });
  }
}