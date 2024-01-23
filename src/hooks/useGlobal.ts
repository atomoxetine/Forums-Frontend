'use client';
import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

function useGlobal<T>(
  variableName: string,
  defaultValueGetter: () => T,
  runOnceGlobally?: ($: BehaviorSubject<T>) => void
):
  [T | undefined, (variable: T) => void]
{
  const windowVarName = `${variableName}Updated$`
  let windowExports: {[key: string]: any} | undefined = undefined;
  if (typeof window !== "undefined")
    windowExports = ((window['exports'] ??= {})['elyHooks'] ??= {});

  const [onVariableUpdated$, setOnVariableUpdated$] = useState<BehaviorSubject<T>>();
  useEffect(() => {
    if (windowExports![windowVarName] === undefined) {
      const $ = new BehaviorSubject<T>(defaultValueGetter());
      windowExports![windowVarName] = $;
      runOnceGlobally?.($);
    }

    setOnVariableUpdated$(windowExports![windowVarName]);
  }, []);

  const [variable, setVariableState] = useState<T>();
  useEffect(() => {
    if (!onVariableUpdated$) return;

    const subscription = onVariableUpdated$.subscribe((variable) => setVariableState(variable));
    return () => {
      subscription.unsubscribe();
      if (!onVariableUpdated$.observed) {
        onVariableUpdated$.complete();
        windowExports![windowVarName] = undefined;
      }
    }
  }, [onVariableUpdated$]);

  const setVariable = (variable: T) => onVariableUpdated$?.next(variable);
  return [variable, setVariable];
}

export default useGlobal;