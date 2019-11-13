import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { useTag, useClassNames, mergeRefs } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { ToggleableFoundationProps } from '@rmwc/toggleable';
import { useRadioFoundation } from './foundation';

/*********************************************************************
 * Radio
 *********************************************************************/

/** A Radio button component. */
export interface RadioProps
  extends RMWC.WithRippleProps,
    ToggleableFoundationProps {}

/** A Radio button component. */
export const Radio = React.forwardRef<any, RadioProps & RMWC.ComponentProps>(
  function Radio(props, ref) {
    const { renderToggle, id, toggleRootProps, rootEl } = useRadioFoundation(
      props
    );

    const { children, className, label, style, inputRef, ...rest } = props;

    const radio = (
      <RadioRoot
        {...rootEl.props(toggleRootProps)}
        ref={mergeRefs(rootEl.setRef, ref)}
      >
        <input
          {...rest}
          className="mdc-radio__native-control"
          type="radio"
          id={id}
          ref={inputRef}
        />
        <RadioBackground />
      </RadioRoot>
    );

    return renderToggle(radio);
  }
);
Radio.displayName = 'Radio';

/*********************************************************************
 * Bits
 *********************************************************************/

const RadioRoot = withRipple({
  surface: false,
  unbounded: true
})(
  React.forwardRef<any, RadioProps & RMWC.ComponentProps>(function RadioRoot(
    props,
    ref
  ) {
    const Tag = useTag(props);
    const { disabled, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-radio',
      {
        'mdc-radio--disabled': disabled
      }
    ]);
    return <Tag {...rest} className={className} />;
  })
);
RadioRoot.displayName = 'RadioRoot';

const RadioBackground = React.memo(function RadioBackground() {
  return (
    <div className="mdc-radio__background">
      <div className="mdc-radio__outer-circle" />
      <div className="mdc-radio__inner-circle" />
    </div>
  );
});
