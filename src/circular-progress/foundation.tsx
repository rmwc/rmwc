import { useEffect, useState } from 'react';
import { MDCCircularProgressFoundation } from '@material/circular-progress';
import { useFoundation } from '@rmwc/base';
import { CircularProgressProps } from '.';

export const useCircularProgressFoundation = (props: CircularProgressProps) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true, determinateCircleEl: true },
    foundation: ({ rootEl, determinateCircleEl }) => {
      return new MDCCircularProgressFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        getDeterminateCircleAttribute: (attributeName: string) =>
          determinateCircleEl.ref?.getAttribute(attributeName) as string | null,
        hasClass: (className: string) => rootEl.hasClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        removeAttribute: (name: string) => rootEl.removeProp(name as any),
        setAttribute: (name: string, value: string) => {
          rootEl.setProp(name as any, value);
        },
        setDeterminateCircleAttribute: (
          attributeName: string,
          value: string
        ) => {
          determinateCircleEl.ref?.setAttribute(attributeName, value);
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

  // closed
  useEffect(() => {
    props.closed ? foundation.close() : foundation.open();
  }, [props.closed, foundation]);

  return { foundation, ...elements };
};
