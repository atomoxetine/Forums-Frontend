'use server'

import Rank from "@/libs/types/entities/Rank";
import { GetActiveRanks, GetRank, getGrants, getRankColor, getRankFromName } from "@/services/controller/GrantService";
import { getUsernameFromUuid, getUuid } from "@/services/forum/account/AccountService";


export async function getPlayerGrantsInfo(username: string) {
  'use server'

  const uuid = await getUuid(username);
  let grants = (await getGrants(uuid))[0] || [];

  const uuidToName: { [key: string]: string } = {};
  const rankIdToRank: { [key: string]: Rank } = {};
  const rankIdToColor: { [key: string]: string } = {};
  const uuidToRank: { [key: string]: Rank } = {};

  const CONSOLE = "00000000-0000-0000-0000-000000000000";
  uuidToName[CONSOLE] = "Server/Console";
  uuidToRank[CONSOLE] = {_id: "console"} as Rank;
  rankIdToRank[uuidToRank[CONSOLE]._id] = uuidToRank[CONSOLE];
  rankIdToColor[uuidToRank[CONSOLE]._id] = "teal";

  const updateRankCache = async (rankId: string) => {
    if (!rankIdToRank[rankId]) {
      const rankRes = await GetRank(rankId);
      if (rankRes[0]) {
        rankIdToRank[rankId] = rankRes[0];
        rankIdToColor[rankId] = await getRankColor(rankId);
      }
    }
  }

  const getUserHighestRank = async (uuid: string) => {
    const rank = ((await GetActiveRanks(uuid))[0] || [])
      .reduce((acc, crr) =>
        crr.priority > acc.priority ? crr : acc,
        { priority: -1 } as Rank)

    return rank.priority != -1
      ? rank
      : null
  }

  for (let grant of grants) {
    if (!uuidToName[grant.issuedBy])
      uuidToName[grant.issuedBy] = (await getUsernameFromUuid(grant.issuedBy))!;

    if (!uuidToName[grant.removedBy])
      uuidToName[grant.removedBy] = (await getUsernameFromUuid(grant.removedBy))!;

    updateRankCache(grant.rankId);

    const issuerRank = await getUserHighestRank(grant.issuedBy)
    const removerRank = await getUserHighestRank(grant.removedBy)
    if (issuerRank) {
      updateRankCache(issuerRank._id);
      uuidToRank[grant.issuedBy] = issuerRank;
    }
    if (removerRank) {
      updateRankCache(removerRank._id);
      uuidToRank[grant.removedBy] = removerRank;
    }
  }

  const targetRank = await getUserHighestRank(uuid);
  if (targetRank) {
    updateRankCache(targetRank._id);
    uuidToRank[uuid] = targetRank;
  }

  grants.sort((a, b) => Number(b.issuedAt) - Number(a.issuedAt));
  grants = grants.filter(g => rankIdToRank[g.rankId]);

  return {
    uuid: uuid,
    uuidToName: uuidToName,
    rankIdToRank: rankIdToRank,
    rankIdToColor: rankIdToColor,
    uuidToRank: uuidToRank,
    grants: grants,
  }
}

