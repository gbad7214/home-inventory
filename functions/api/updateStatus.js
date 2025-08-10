export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return new Response(JSON.stringify({ error: '缺少 id 或 status' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    await env.DB.prepare('UPDATE items SET status = ? WHERE id = ?').bind(status, id).run();
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: '伺服器錯誤' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
