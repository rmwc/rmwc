import React, { useEffect, useLayoutEffect, useState } from 'react';

// this file is heavily inspired by reach-ui auto-id at https://github.com/reach/reach-ui/blob/dev/packages/auto-id/src/reach-auto-id.ts

function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;

let serverHandoffComplete = false;
let id = 0;
function genId() {
  return ++id;
}

const maybeReactUseId: undefined | (() => string) = (React as any)[
  'useId'.toString()
];

export const useId = (
  prefix: string,
  props: { [key: string]: any }
): string => {
  const internalId = useInternalId(props.label);
  if (props.id) {
    return props.id;
  }
  return `${prefix}-${internalId}`;
};

const useInternalId = (providedId?: number | string | undefined | null) => {
  if (maybeReactUseId !== undefined) {
    let generatedId = maybeReactUseId();
    return providedId ?? generatedId;
  }

  let initialId = providedId ?? (serverHandoffComplete ? genId() : null);
  let [id, setId] = useState(initialId);

  useIsomorphicLayoutEffect(() => {
    if (id === null) {
      setId(genId());
    }
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);

  return providedId ?? id ?? undefined;
};
