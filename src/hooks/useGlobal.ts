'use client';
import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

declare namespace globalThis {
  let elyGlobals: {[key: string]: BehaviorSubject<any>};
}
globalThis.elyGlobals ??= {};

function useGlobal<T>(
  variableId: string,
  defaultValueGetter: () => T,
  runOnceGlobally?: ($: BehaviorSubject<T>) => void
):
  [T | undefined, (variable: T) => void]
{
  const elyGlobals = globalThis.elyGlobals;

  const subjectName = `${variableId}Updated$`
  const [variable, setVariableState] = useState<T>();
  const setVariable = (variable: T) => elyGlobals[subjectName].next(variable);

  useEffect(() => {
    if (elyGlobals[subjectName] === undefined) {
      const $ = new BehaviorSubject<T>(defaultValueGetter());
      elyGlobals[subjectName] = $;
      runOnceGlobally?.($);
    }

    const subscription = elyGlobals[subjectName].subscribe((variable) => setVariableState(variable));
    return () => {
      subscription.unsubscribe();
      if (!elyGlobals[subjectName].observed) {
        elyGlobals[subjectName].complete();
        delete elyGlobals[subjectName];
      }
    }
  }, [elyGlobals, subjectName]);

  return [variable, setVariable];
}

export default useGlobal;