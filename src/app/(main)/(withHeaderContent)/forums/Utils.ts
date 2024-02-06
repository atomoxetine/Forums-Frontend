import { GetProfileFromUuid } from '@/services/controller/ProfileService';
import { GetActiveRanks } from '@/services/controller/GrantService';
import Rank from '@/libs/types/entities/Rank';
import { isResultError, tryParseInt } from '@/libs/Utils';
import Thread from '@/libs/types/entities/Thread';

export const getAuthorInfo = async (authorId?: string) => {
  if (!authorId) return;

  const author: {username: string, rank?: Rank} = {username: '', rank: undefined};
  const profilePromise = GetProfileFromUuid(authorId)
    .then(res => {
      if (!isResultError(res)) return res;
      console.error("Error fetching author: HTTP " + res[1]);
    });
  const ranksPromise = GetActiveRanks(authorId)
    .then(res => {
      if (!isResultError(res)) return res;
      console.error("Error fetching author rank: HTTP " + res[1]);
    });
  
  const profile = await profilePromise;
  if (!profile) return;
  author.username = profile[0]!.name;

  const ranks = await ranksPromise;
  if (ranks)
    author.rank = ranks[0]!.sort((a, b) => a.priority - b.priority)[ranks[0]!.length - 1];

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