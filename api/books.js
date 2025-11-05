export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Backend not configured" });
  }

  const { search = "", limit = 50, offset = 0 } = req.query;

  try {
    // build query dynamically
    let url = `${SUPABASE_URL}/rest/v1/books?select=*`;

    // search by file_name or caption (case-insensitive)
    if (search) {
      const encodedSearch = encodeURIComponent(`%${search}%`);
      url += `&or=(file_name.ilike.${encodedSearch},caption.ilike.${encodedSearch})`;
    }

    // pagination
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

    // optional: count header for total available rows
    const total = response.headers.get("content-range") || null;

    res.status(200).json({
      data,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
