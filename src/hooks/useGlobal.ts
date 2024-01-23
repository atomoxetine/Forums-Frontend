'use client';
import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

declare global {
  interface Window {
    elyHooks: {[key: string]: BehaviorSubject<any>};
  }
}

function useGlobal<T>(
  variableId: string,
  defaultValueGetter: () => T,
  runOnceGlobally?: ($: BehaviorSubject<T>) => void
):
  [T | undefined, (variable: T) => void]
{
  const subjectName = `${variableId}Updated$`
  let elyHooks: {[key: string]: BehaviorSubject<T>} | undefined = undefined;
  if (typeof window !== "undefined")
    elyHooks = window.elyHooks ??= {};

  const [onVariableUpdated$, setOnVariableUpdated$] = useState<BehaviorSubject<T>>();
  useEffect(() => {
    if (elyHooks![subjectName] === undefined) {
      const $ = new BehaviorSubject<T>(defaultValueGetter());
      elyHooks![subjectName] = $;
      runOnceGlobally?.($);
    }

    setOnVariableUpdated$(elyHooks![subjectName]);
  }, []);

  const [variable, setVariableState] = useState<T>();
  useEffect(() => {
    if (!onVariableUpdated$) return;

    const subscription = onVariableUpdated$.subscribe((variable) => setVariableState(variable));
    return () => {
      subscription.unsubscribe();
      if (!onVariableUpdated$.observed) {
        onVariableUpdated$.complete();
        delete elyHooks![subjectName];
      }
    }
  }, [onVariableUpdated$]);

  const setVariable = (variable: T) => onVariableUpdated$?.next(variable);
  return [variable, setVariable];
}

export default useGlobal;