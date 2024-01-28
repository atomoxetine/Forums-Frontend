import { GetProfileFromUuid } from '@/services/controller/ProfileService';
import { GetActiveRanks } from '@/services/controller/GrantService';
import Rank from '@/libs/types/entities/Rank';
import { isResultError, tryParseInt } from '@/libs/Utils';
import Thread from '@/libs/types/entities/Thread';

export const getAuthorInfo = async (authorId?: string) => {
  if (!authorId) return;

  let res0 = await GetProfileFromUuid(authorId);
  if (isResultError(res0)) {
    console.error("Error fetching author: HTTP " + res0[1]);
    return;
  }
  
  const author: {username: string, rank?: Rank} = {username: res0[0]!.name, rank: undefined};

  const res1 = await GetActiveRanks(authorId);
  if (isResultError(res1)) {
    console.error("Error fetching author rank: HTTP " + res1[1]);
    return author;
  }

  author.rank = res1[0]!.sort((a, b) => a.priority - b.priority)[res1[0]!.length - 1];
  return author;
};

export const threadSorter = (a?: Thread, b?: Thread) => {
  const intA = tryParseInt(a?.createdAt);
  const intB = tryParseInt(b?.createdAt);
  return intA && intB ? intB - intA : 0;
};

export const getThreadShortId = (id?: string) => {
  const temp = id?.split('.');
  return temp?.[temp.length - 1];
}