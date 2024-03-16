
export async function getPlayerCount(): Promise<number> {
  const res = await fetch("https://api.mcsrvstat.us/3/mccade.net")
  const json = await res.json();
  return json?.players?.online || undefined;
}
