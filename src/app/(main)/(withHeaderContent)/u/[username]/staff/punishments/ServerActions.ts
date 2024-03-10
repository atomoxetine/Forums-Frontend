import { getPunishments } from "@/services/forum/punishment/PunishmentService";


export async function getAllPunishments(uuid: string) {
  return await getPunishments(uuid);
}
