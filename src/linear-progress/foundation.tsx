import { useEffect, useState } from 'react';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { useFoundation } from '@rmwc/base';
import { LinearProgressProps } from '.';

export const useLinearProgressFoundation = (props: LinearProgressProps) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl }) => {
      return new MDCLinearProgressFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        forceLayout: () => rootEl.ref?.offsetWidth,
        hasClass: (className: string) => rootEl.hasClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        setBufferBarStyle: (styleProperty: string, value: string | null) => {
          let el =
            rootEl.ref?.querySelector(
              MDCLinearProgressFoundation.strings.BUFFER_BAR_SELECTOR
            ) ?? null;
          el && ((el as any).style[styleProperty] = value);
        },
        setPrimaryBarStyle: (styleProperty: string, value: string | null) => {
          let el =
            rootEl.ref?.querySelector(
              MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR
            ) ?? null;
          el && ((el as any).style[styleProperty] = value);
        },
        setAttribute: (name: string, value: string) => {
          rootEl.setProp(name as any, value);
        },
        removeAttribute: (name: string) => rootEl.removeProp(name as any)
      });
    }
  });

  const [determinate, setDeterminate] = useState<boolean | undefined>(
    undefined
  );

  // progress and determinate
  useEffect(() => {
    foundation.setProgress(props.progress || 0);

    const isDeterminate = props.progress !== undefined;
    if (isDeterminate !== determinate) {
      foundation.setDeterminate(isDeterminate);
      setDeterminate(isDeterminate);
    }
  }, [props.progress, determinate, foundation]);

  // buffer
  useEffect(() => {
    foundation.setBuffer(props.buffer || 0);
  }, [props.buffer, foundation]);

  // reversed
  useEffect(() => {
    foundation.setReverse(!!props.reversed);
  }, [props.reversed, foundation]);

  // closed
  useEffect(() => {
    props.closed ? foundation.close() : foundation.open();
  }, [props.closed, foundation]);

  return { foundation, ...elements };
};
