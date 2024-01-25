import { NextRequest } from "next/server";

export async function GET(req: NextRequest | Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  let uuid: string | undefined = undefined;

  try {
    uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      .then(res => res?.json())
      .then(res => res?.id);
  } catch { /* Do nothing */ }

  if (!uuid) { // Fallback in case Mojang's API is down
    try {
      uuid = await fetch(`https://playerdb.co/api/player/minecraft/${username}`)
        .then(res => res?.json())
        .then(res => res?.data?.player?.raw_id);
    } catch { /* Do nothing */ }
  }
  
  return Response.json({ uuid });
}