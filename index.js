const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get('/countries', async (req, res) => {
  const { data, error } = await supabase.from('Countries').select('*');
  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
  res.json({ success: true, data });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
