const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // 💡 فعال‌کردن CORS برای همه دامنه‌ها (یا فقط دامنه خودت)
  res.setHeader('Access-Control-Allow-Origin', '*'); // یا دامنه خاص مثل 'https://my-frontend.vercel.app'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // پاسخ سریع به درخواست OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  // POST
  if (req.method === 'POST') {
    const { name } = req.body;
    const { data, error } = await supabase.from('users').insert([{ name }]);
    if (error) return res.status(500).json({ error });
    return res.status(201).json(data);
  }

  // سایر متدها مجاز نیستند
  res.status(405).json({ error: 'Method not allowed' });
};