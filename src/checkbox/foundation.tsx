import { CheckboxProps } from '.';
import { useToggleFoundation } from '@rmwc/toggleable';
import { useFoundation } from '@rmwc/base';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { useEffect, useCallback } from 'react';

export const useCheckboxFoundation = (
  props: CheckboxProps & React.HTMLProps<any>
) => {
  const { renderToggle, toggleRootProps, id } = useToggleFoundation(props);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      checkboxEl: true
    },
    foundation: ({ rootEl, checkboxEl, getProps }) => {
      return new MDCCheckboxFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        setNativeControlAttr: (attr: string, value: any) =>
          checkboxEl.setProp(attr as any, value),
        removeNativeControlAttr: (attr: string) =>
          checkboxEl.removeProp(attr as any),
        isIndeterminate: () => !!getProps().indeterminate,
        isChecked: () =>
          getProps().checked !== undefined
            ? !!getProps().checked
            : !!(checkboxEl.ref as HTMLInputElement)?.checked,
        hasNativeControl: () => !!checkboxEl.ref,
        setNativeControlDisabled: (disabled: boolean) =>
          checkboxEl.setProp('disabled', disabled),
        forceLayout: () => rootEl.ref?.offsetWidth,
        isAttachedToDOM: () => true
      });
    }
  });

  const { rootEl, checkboxEl } = elements;

  // Handles syncing of indeterminate state
  const doSync = useCallback(() => {
    if (checkboxEl.ref) {
      (checkboxEl.ref as HTMLInputElement).indeterminate = !!props.indeterminate;
    }
    window.requestAnimationFrame(() => {
      foundation.handleChange();
    });
  }, [props.indeterminate, foundation, checkboxEl.ref]);

  useEffect(() => {
    doSync();
  }, [doSync]);

  // Callback handling
  const handleAnimationEnd = (evt: React.AnimationEvent) => {
    props.onAnimationEnd?.(evt);
    foundation.handleAnimationEnd();
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(evt);
    doSync();
  };

  rootEl.setProp('onAnimationEnd', handleAnimationEnd, true);
  checkboxEl.setProp('onChange', handleOnChange, true);

  return { foundation, renderToggle, toggleRootProps, id, ...elements };
};
