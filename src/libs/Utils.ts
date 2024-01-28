export const stringToDate = (dateString?: string) => {
  if (!dateString) return null;
  const dateInt = tryParseInt(dateString);
  return !dateInt || dateInt === -1 ? null : new Date(dateInt);
};

export const tryParseInt = (intAsStr?: string) => {
  if (!intAsStr) return null;
  try {return parseInt(intAsStr)} catch { }
  return null;
};

export const toLocaleString = (date?: Date | null) => {
  if (!date) return "Never";
  return date.toLocaleString();
};

export const isResultError = (res: any, isNullable: boolean = false) =>
  !(res[1] >= 200 && res[1] <= 299) || (!isNullable && !res[0]);

export const awaitAll = async <T>(promises?: Promise<T>[]): Promise<T[]> => {
  if (!promises) return [];
  const results: any[] = [];
  if (promises) {
    for (const promise of promises)
      results.push(await promise);
  }
  return results;
}