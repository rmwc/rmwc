import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { classNames, mergeRefs, useTag, useClassNames } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { ToggleableFoundationProps } from '@rmwc/toggleable';
import { useSwitchFoundation } from './foundation';

/*********************************************************************
 * Switch
 *********************************************************************/

/** A Switch component. */
export interface SwitchProps
  extends RMWC.WithRippleProps,
    ToggleableFoundationProps {}

/** A Switch component. */
export function Switch(props: SwitchProps & RMWC.ComponentProps) {
  const Tag = useTag(props);

  const {
    renderToggle,
    id,
    toggleRootProps,
    rootEl,
    checkboxEl
  } = useSwitchFoundation(props);

  const rootClassName = useClassNames(toggleRootProps, ['mdc-switch']);
  const { children, className, label, style, inputRef, ...rest } = props;

  const renderedSwitch = (
    <Tag {...rootEl.props({ ...toggleRootProps, className: rootClassName })}>
      <SwitchTrack />
      <SwitchThumbUnderlay>
        <div className="mdc-switch__thumb">
          <input
            {...checkboxEl.props({
              ...rest,
              className: 'mdc-switch__native-control'
            })}
            type="checkbox"
            id={id}
            ref={mergeRefs(checkboxEl.setRef, inputRef)}
          />
        </div>
      </SwitchThumbUnderlay>
      <SwitchKnob />
    </Tag>
  );

  return renderToggle(renderedSwitch);
}
Switch.displayName = 'Switch';

/*********************************************************************
 * Bits
 *********************************************************************/

const SwitchTrack = React.memo(function SwitchTrack() {
  return <div className="mdc-switch__track" />;
});

const SwitchKnob = React.memo(function SwitchKnob() {
  return <div className="mdc-switch__knob" />;
});

const SwitchThumbUnderlay = withRipple({
  unbounded: true,
  surface: false
})(function SwitchThumbUnderlay({
  className,
  ...rest
}: {
  className?: string;
}) {
  return (
    <div
      className={classNames(className, 'mdc-switch__thumb-underlay')}
      {...rest}
    />
  );
});
