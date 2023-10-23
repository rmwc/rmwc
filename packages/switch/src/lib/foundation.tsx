// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useFoundation } from '@rmwc/base';
import { useToggleFoundation } from '@rmwc/toggleable';
import * as RMWC from '@rmwc/types';
import React, { useEffect } from 'react';
import { SwitchHTMLProps, SwitchProps } from './switch';

import { MDCSwitchAdapter, MDCSwitchFoundation } from '@material/switch';

export const useSwitchFoundation = (props: SwitchProps & SwitchHTMLProps) => {
  const { renderToggle, toggleRootProps, id } =
    useToggleFoundation<MDCSwitchFoundation>(props);

  const [disabled, setDisabled] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
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
          disabled: disabled,
          processing: processing,
          selected: selected
        }
      } as MDCSwitchAdapter);
    }
  });

  const { rootEl } = elements;

  // sync checked
  useEffect(() => {
    if (props.checked !== undefined) {
      setSelected(props.checked);
    }
  }, [props.checked]);

  // sync defaultChecked
  useEffect(() => {
    if (props.defaultChecked !== undefined) {
      setSelected(props.defaultChecked);
    }
  }, [props.defaultChecked]);

  // sync disabled
  useEffect(() => {
    if (props.disabled !== undefined) {
      setDisabled(props.disabled);
    }
  }, [props.disabled]);

  // sync processing
  useEffect(() => {
    if (props.processing !== undefined) {
      setProcessing(props.processing);
    }
  }, [props.processing]);

  const handleOnClick = (
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setSelected((c) => !c);
    props.onClick?.(evt);
    rootEl.setProp('checked', selected);
    foundation.handleClick();
  };

  rootEl.setProp('onClick', handleOnClick, true);

  return {
    foundation,
    renderToggle,
    toggleRootProps,
    id,
    disabled,
    selected,
    processing,
    ...elements
  };
};
