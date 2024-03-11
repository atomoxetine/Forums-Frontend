'use server'

import { getUsernameFromUuid, getUuid } from "@/services/forum/account/AccountService"
import { getPunishments } from "@/services/forum/punishment/PunishmentService";

export async function getPunishmentsInfo(username: string) {
  const uuid = (await getUuid(username));

  const punishments = (await getPunishments(uuid))[0] || [];

  const uuidToName: { [key: string]: string } = {};
  uuidToName["00000000-0000-0000-0000-000000000000"] = "Server/Console"

  for (let p of punishments) {
    for (let proof of p.proof) {
      if (!uuidToName[proof.addedBy])
        uuidToName[proof.addedBy] = (await getUsernameFromUuid(proof.addedBy))!;
    }

    if (!uuidToName[p.issuedBy])
      uuidToName[p.issuedBy] = (await getUsernameFromUuid(p.issuedBy))!;

    if (!uuidToName[p.removedBy])
      uuidToName[p.removedBy] = (await getUsernameFromUuid(p.removedBy))!;
  }

  punishments.sort((a,b) => Number(b.issuedAt) - Number(a.issuedAt));

  return {
    uuid: uuid,
    uuidToName: uuidToName,
    punishments: punishments,
  }
}
