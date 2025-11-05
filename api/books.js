export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Backend not configured" });
  }

  // read query params from frontend
  const { search = "", limit = 50, offset = 0 } = req.query;

  try {
    // base query
    let url = `${SUPABASE_URL}/rest/v1/books?select=*`;

    // if search term given
    if (search) {
      const encoded = encodeURIComponent(`%${search}%`);
      url += `&or=(file_name.ilike.${encoded},caption.ilike.${encoded})`;
    }

    // add pagination
    url += `&limit=${limit}&offset=${offset}`;

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: "Failed to fetch from Supabase", details: errText });
    }

    const data = await response.json();

    res.status(200).json({
      data,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
