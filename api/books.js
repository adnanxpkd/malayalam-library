export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

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

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error(`Supabase error ${response.status}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
