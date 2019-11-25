import { LinearProgressProps } from '.';
import { useFoundation } from '@rmwc/base';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { useEffect, useState } from 'react';

export const useLinearProgressFoundation = (props: LinearProgressProps) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl }) => {
      return new MDCLinearProgressFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        getPrimaryBar: () => {
          return (
            rootEl.ref?.querySelector(
              MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR
            ) || null
          );
        },
        forceLayout: () => rootEl.ref?.offsetWidth,
        getBuffer: () =>
          rootEl.ref?.querySelector(
            MDCLinearProgressFoundation.strings.BUFFER_SELECTOR
          ) || null,
        hasClass: (className: string) => rootEl.hasClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        setStyle: (
          el: HTMLElement,
          styleProperty: string,
          value: string | null
        ) => {
          (el.style as any)[styleProperty] = value;
        }
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
