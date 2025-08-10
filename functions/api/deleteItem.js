export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: '缺少 id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    await env.DB.prepare('DELETE FROM items WHERE id = ?').bind(id).run();
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: '伺服器錯誤' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
