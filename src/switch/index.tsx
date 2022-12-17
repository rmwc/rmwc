import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSwitchFoundation } from '@material/switch';
import {
  classNames,
  mergeRefs,
  Tag,
  useClassNames,
  createComponent
} from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { ToggleableProps, ToggleHTMLProps } from '@rmwc/toggleable';
import { useSwitchFoundation } from './foundation';

/*********************************************************************
 * Switch
 *********************************************************************/

/** A Switch component. */
export interface SwitchProps
  extends RMWC.WithRippleProps,
    ToggleableProps<MDCSwitchFoundation> {}

export type SwitchHTMLProps = ToggleHTMLProps;

/** A Switch component. */
export const Switch: RMWC.ComponentType<SwitchProps, SwitchHTMLProps, 'input'> =
  createComponent<SwitchProps, SwitchHTMLProps>(function Switch(props, ref) {
    const { renderToggle, id, toggleRootProps, rootEl } =
      useSwitchFoundation(props);

    const {
      checked,
      children,
      className,
      disabled,
      label,
      style,
      inputRef,
      foundationRef,
      ...rest
    } = props;

    const rootClassName = useClassNames(toggleRootProps, [
      'mdc-switch',
      {
        'mdc-switch--unselected': !checked,
        'mdc-switch--selected': checked
      }
    ]);

    const renderedSwitch = (
      <Tag
        {...rootEl.props({ ...toggleRootProps, className: rootClassName })}
        ref={mergeRefs(rootEl.setRef, ref)}
        disabled={disabled}
        tag="button"
        type="button"
        role="switch"
        aria-checked={checked ?? rest['aria-checked']}
        id={id}
        {...rest}
      >
        <SwitchTrack />
        <SwitchHandleTrack>
          <div className="mdc-switch__handle">
            <div className="mdc-switch__shadow">
              <div className="mdc-elevation-overlay"></div>
            </div>
            <div className="mdc-switch__ripple"></div>
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
          </div>
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
  return <div className="mdc-switch__handle-track">{children}</div>;
});

const SwitchKnob = React.memo(function SwitchKnob() {
  return <div className="mdc-switch__knob" />;
});

const SwitchThumb = React.memo(function SwitchThumb() {
  return <div className="mdc-switch__thumb" />;
});

const SwitchThumbUnderlay = withRipple({
  unbounded: true,
  surface: false
})(function SwitchThumbUnderlay({
  className,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(className, 'mdc-switch__thumb-underlay')}
      {...rest}
    />
  );
});
