// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React, { useEffect } from 'react';
import { SwitchProps, SwitchHTMLProps } from '.';
import { useToggleFoundation } from '@rmwc/toggleable';
import { useFoundation } from '@rmwc/base';

import { MDCSwitchFoundation, MDCSwitchAdapter } from '@material/switch';

export const useSwitchFoundation = (props: SwitchProps & SwitchHTMLProps) => {
  const { renderToggle, toggleRootProps, id } =
    useToggleFoundation<MDCSwitchFoundation>(props);

  const [selected, setSelected] = React.useState(false);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      checkboxEl: true
    },
    foundation: ({ rootEl }) => {
      return new MDCSwitchFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        hasClass: (className: string) => rootEl.hasClass(className),
        isDisabled: () => props.disabled,
        removeClass: (className: string) => rootEl.removeClass(className),
        setAriaChecked: (ariaChecked: string) =>
          rootEl.ref?.setAttribute('aria-checked', ariaChecked),
        setDisabled: (disabled: boolean) => {
          rootEl.setProp('disabled', disabled);
        },
        state: {
          disabled: false,
          processing: false,
          selected: false
        }
      } as MDCSwitchAdapter);
    }
  });

  const { rootEl } = elements;

  const handleOnClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    foundation.handleClick();
    setSelected((c) => !c);
    rootEl.setProp('checked', selected);
    props.onClick?.(evt);
  };

  rootEl.setProp('onClick', handleOnClick, true);

  return { foundation, renderToggle, toggleRootProps, id, ...elements };
};
