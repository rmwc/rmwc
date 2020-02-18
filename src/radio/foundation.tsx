import * as RMWC from '@rmwc/types';
import { RadioProps } from '.';
import { useToggleFoundation } from '@rmwc/toggleable';
import { useFoundation } from '@rmwc/base';
import { MDCRadioFoundation } from '@material/radio';

export const useRadioFoundation = (
  props: RadioProps & RMWC.HTMLProps<HTMLInputElement>
) => {
  const { renderToggle, toggleRootProps, id } = useToggleFoundation(props);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    foundation: ({ rootEl }) => {
      return new MDCRadioFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className)
      });
    }
  });

  return { foundation, renderToggle, toggleRootProps, id, ...elements };
};
