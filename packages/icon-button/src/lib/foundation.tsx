import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import { useFoundation } from '@rmwc/base';
import React, { useEffect } from 'react';
import { IconButtonProps } from './icon-button';

export const useIconButtonFoundation = (
  props: IconButtonProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCIconButtonToggleFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        hasClass: (className: string) => rootEl.hasClass(className),
        setAttr: (attrName: string, attrValue: string | number | null) =>
          rootEl.setProp(attrName as any, attrValue),
        notifyChange: (evtData: { isOn: boolean }) => emit('onChange', evtData)
      });
    }
  });

  const { rootEl } = elements;
  const isOn = props.checked !== undefined ? props.checked : foundation.isOn();

  useEffect(() => {
    if (isOn !== foundation.isOn()) {
      foundation.toggle(isOn);
    }
  }, [foundation, isOn]);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(evt);
    foundation.handleClick();
  };

  rootEl.setProp('onClick', handleClick, true);

  return { isOn, foundation, ...elements };
};
