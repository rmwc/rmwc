import * as RMWC from '@rmwc/types';
import * as React from 'react';
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
export const Switch: RMWC.ComponentType<
  SwitchProps,
  SwitchHTMLProps,
  'input'
> = createComponent<SwitchProps, SwitchHTMLProps>(function Switch(props, ref) {
  const {
    renderToggle,
    id,
    toggleRootProps,
    rootEl,
    checkboxEl
  } = useSwitchFoundation(props);

  const rootClassName = useClassNames(toggleRootProps, ['mdc-switch']);
  const {
    children,
    className,
    label,
    style,
    inputRef,
    foundationRef,
    ...rest
  } = props;

  const renderedSwitch = (
    <Tag
      {...rootEl.props({ ...toggleRootProps, className: rootClassName })}
      ref={ref}
    >
      <SwitchTrack />
      <SwitchThumbUnderlay>
        <SwitchThumb />
        <input
          {...checkboxEl.props({
            ...rest,
            className: 'mdc-switch__native-control'
          })}
          type="checkbox"
          id={id}
          ref={mergeRefs(checkboxEl.setRef, inputRef)}
          role="switch"
          aria-checked={rest.checked ?? rest['aria-checked']}
        />
      </SwitchThumbUnderlay>
      <SwitchKnob />
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
