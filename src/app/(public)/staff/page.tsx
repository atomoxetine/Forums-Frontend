import MCHead from "@/components/Minecraft/MCHead";

export default function Staff() {
  const staff = [
    {username: "Oestradiol", rank: "developer"},
    {username: "Oestradiol", rank: "developer"},
    {username: "OhEmilyy", rank: "owner"},
    {username: "OhEmilyy", rank: "owner"},
    {username: "OhEmilyy", rank: "owner"}
  ].sort((a, b) => {
    const getVal = a => ({
      "owner": 0,
      "developer": 1,
    }[a.rank]);
    return getVal(a) - getVal(b);
  });
  const rankColor = (rank: string) => ({
    owner: "#9F000C",
    developer: "#ff4141"
  }[rank] ?? "#ffffff");
  
  return <>
    <section className="flex flex-col justify-center items-center min-h-0">
      <div className="flex flex-row flex-wrap h-min w-full max-w-screen-xl inner bg-base-300 rounded-xl overflow-hidden p-2 gap-2">
        {
          staff.map((d, i) => (
            <div key={i} className="flex-[1_0_32%] flex flex-col justify-center items-center rounded-lg overflow-hidden bg-base-100 flex-1 py-4">
              <div className="w-[45px] h-[49px] relative">
                <MCHead shadowColor={rankColor(d.rank)} className="scale-[.675] absolute left-[-11px] top-[-12px]" username={d.username} />
              </div>
              <span className="text-center inline-flex flex-col">
                <h5 className="font-bold">{d.username}</h5>
                <small style={{color: rankColor(d.rank)}} className="smaller font-bold uppercase tracking-wider">{d.rank}</small>
              </span>
            </div>
          ))
        }
      </div>
    </section>
  </>;
}