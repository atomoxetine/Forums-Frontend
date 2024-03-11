import { MCHead } from "@/components/Minecraft/base";
import { GetProfileFromUuid } from "@/services/controller/ProfileService";
import { getAccountFromUuid, getUsernameFromUuid, getUuid } from "@/services/forum/account/AccountService";

interface Params {
  params: {
    username: string
  }
}

export default async function Page(params: Params) {
  const { username } = params.params;

  const uuid = await getUuid(username);
  const profile = (await GetProfileFromUuid(uuid))[0]!;
  const account = (await getAccountFromUuid(uuid))[0]!;

  const altName: { [key: string]: string } = {};

  for (let alt of profile.alts) {
    const name = await getUsernameFromUuid(alt);
    if (!name) continue;

    altName[alt] = name;
  }

  return <div className="flex flex-row flex-wrap gap-2 justify-around px-4 mt-3">
    <div className="rounded-xl bg-base-300 text-xl min-w-[300px]">
      <div className="bg-base-100 p-3 rounded-t-xl text-center font-bold">
        Forum Account Email
      </div>
      <div className="p-5 text-center">
        {account.email}
      </div>
    </div>
    <div className="rounded-xl bg-base-300 text-xl min-w-[300px] max-w-[600px]">
      <div className="bg-base-100 p-3 rounded-t-xl text-center font-bold">
        Alts
      </div>
      <div className="p-5 text-center flex flex-row flex-wrap justify-around gap-2">
        {profile.alts.map((uuid, i) =>
          <div key={i} className="py-2 w-fit bg-base-100 px-3 rounded-xl">
            <MCHead uuid={uuid} username={altName[uuid]} className="mx-auto" />
            <div>{altName[uuid]}</div>
          </div>
        )}
      </div>
    </div>
  </div>
}
