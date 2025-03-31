const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// اتصال به Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors());
app.use(express.json());

// GET همه‌ی کاربران
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST اضافه‌کردن کاربر جدید
app.post('/users', async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from('users').insert([{ name }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});