export async function GET(req: { url: string | URL; }) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  let uuid: string | undefined = undefined;

  try {
    uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      .then(res => res?.json())
      .then(res => res?.id);
  } catch { /* Do nothing */ }

  if (!uuid) { // Fallback in case Mojang's API is down
    console.log(1)
    try {
      uuid = await fetch(`https://playerdb.co/api/player/minecraft/${username}`)
        .then(res => res?.json())
        .then(res => res?.data?.player?.raw_id);
    } catch { /* Do nothing */ }
  }
  
  return Response.json({ uuid });
}