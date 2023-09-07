import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSwitchFoundation } from '@material/switch';
import { mergeRefs, Tag, useClassNames, createComponent } from '@rmwc/base';
import { ToggleableProps, ToggleHTMLProps } from '@rmwc/toggleable';
import { useSwitchFoundation } from './foundation';

/*********************************************************************
 * Switch
 *********************************************************************/

/** A Switch component. */
export interface SwitchProps
  extends RMWC.WithRippleProps,
    ToggleableProps<MDCSwitchFoundation> {
  processing?: boolean;
}

export type SwitchHTMLProps = ToggleHTMLProps;

/** A Switch component. */
export const Switch: RMWC.ComponentType<SwitchProps, SwitchHTMLProps, 'input'> =
  createComponent<SwitchProps, SwitchHTMLProps>(function Switch(props, ref) {
    const { renderToggle, id, toggleRootProps, rootEl, selected } =
      useSwitchFoundation(props);

    const { children, className, disabled, ...rest } = props;

    const rootClassName = useClassNames(toggleRootProps, [
      'mdc-switch',
      {
        'mdc-switch--unselected': !selected,
        'mdc-switch--selected': selected
      }
    ]);

    const renderedSwitch = (
      <Tag
        {...rootEl.props({
          ...toggleRootProps,
          className: rootClassName
        })}
        ref={mergeRefs(rootEl.reactRef, ref)}
        disabled={disabled}
        tag="button"
        type="button"
        role="switch"
        aria-checked={selected ?? rest['aria-checked']}
        id={id}
        {...rest}
      >
        <SwitchTrack />
        <SwitchHandleTrack>
          <div className="mdc-switch__shadow">
            <div className="mdc-elevation-overlay"></div>
          </div>
          <SwitchRipple />
          <SwitchIcons />
        </SwitchHandleTrack>
        <span className="mdc-switch__focus-ring-wrapper">
          <div className="mdc-switch__focus-ring"></div>
        </span>
      </Tag>
    );

    return renderToggle(renderedSwitch);
  });

/*********************************************************************
 * Bits
 *********************************************************************/

const SwitchTrack = React.memo(function SwitchTrack() {
  return <div className="mdc-switch__track" />;
});

const SwitchHandleTrack = React.memo(function SwitchHandleTrack({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mdc-switch__handle-track">
      <div className="mdc-switch__handle">{children}</div>
    </div>
  );
});

const SwitchIcons = React.memo(function SwitchIcons() {
  return (
    <div className="mdc-switch__icons">
      <svg
        className="mdc-switch__icon mdc-switch__icon--on"
        viewBox="0 0 24 24"
      >
        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
      </svg>
      <svg
        className="mdc-switch__icon mdc-switch__icon--off"
        viewBox="0 0 24 24"
      >
        <path d="M20 13H4v-2h16v2z" />
      </svg>
    </div>
  );
});

const SwitchRipple = React.memo(function SwitchRipple() {
  return <div className="mdc-switch__ripple"></div>;
});
