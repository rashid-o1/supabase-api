const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // for environment variables

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// API endpoint to get all countries
app.get('/countries', async (req, res) => {
  const { data, error } = await supabase.from('Countries').select('*');

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true, data });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
