export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    if (!data.name || !data.quantity || data.quantity < 1) {
      return new Response(JSON.stringify({ error: '輸入資料錯誤' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    await env.DB.prepare(
      'INSERT INTO items (name, quantity, status) VALUES (?, ?, ?)'
    ).bind(data.name, data.quantity, '100%').run();

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: '伺服器錯誤' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
