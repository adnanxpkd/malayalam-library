export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  console.log("🔍 ENV CHECK:", { SUPABASE_URL, keyExists: !!SUPABASE_KEY });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Backend not configured" });
  }

  const { search = "", limit = 50, offset = 0 } = req.query;

  try {
    let url = `${SUPABASE_URL}/rest/v1/books?select=*`;

    if (search) {
      const encoded = encodeURIComponent(`%${search}%`);
      url += `&or=(file_name.ilike.${encoded},caption.ilike.${encoded})`;
    }

    url += `&limit=${limit}&offset=${offset}`;

    console.log("📡 Fetching:", url);

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
    });

    console.log("✅ Supabase Response Status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Supabase Error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    console.log("📚 Books Fetched:", data.length);
    res.status(200).json(data);
  } catch (err) {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ error: err.message });
  }
}
