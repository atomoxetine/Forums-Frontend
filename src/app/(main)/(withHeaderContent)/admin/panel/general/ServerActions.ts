'use server'

import { isResultError } from "@/libs/Utils";
import WebEntry from "@/libs/types/entities/WebEntry"
import { updateEntry } from "@/services/forum/websiteData/WebsiteDataService"

export async function updateDataAction(entries: WebEntry[]): Promise<string | undefined> {
  'use server'

  for (let entry of entries) {
    const res = await updateEntry(entry);
    if (isResultError(res))
      return "Error: " + (res[2] || res[1]);
  }
}
