'use client';
import { useCallback, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

declare namespace globalThis {
  let elyGlobals: {[key: string]: BehaviorSubject<any>};
}
globalThis.elyGlobals ??= {};

function useGlobal<T>(
  variableId: string,
  defaultValueGetter?: () => T,
  setupCall?: ($: BehaviorSubject<T>) => void
):
  [T | undefined, (variable: T) => void]
{
  const elyGlobals = globalThis.elyGlobals;
  const subjectName = `${variableId}$`
  const [variable, setVariableState] = useState<T>();
  const this$ = elyGlobals[subjectName];
  const setVariable = useCallback((variable: T) => this$?.next(variable), [this$]);

  useEffect(() => {
    if (elyGlobals[subjectName] === undefined) {
      const $ = new BehaviorSubject<T>(defaultValueGetter?.() ?? undefined as T);
      elyGlobals[subjectName] = $;
      setupCall?.($);
    }

    const subscription = elyGlobals[subjectName].subscribe((variable) => setVariableState(variable));
    return () => {
      subscription.unsubscribe();
      if (!elyGlobals[subjectName].observed) {
        elyGlobals[subjectName].complete();
        delete elyGlobals[subjectName];
      }
    }
  }, [elyGlobals, subjectName, defaultValueGetter, setupCall]);

  return [variable, setVariable];
}

export default useGlobal;