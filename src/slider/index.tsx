import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSliderFoundation } from '@material/slider';
import { useClassNames, Tag, createComponent } from '@rmwc/base';
import { useSliderFoundation } from './foundation';

export type SliderOnChangeEventT = RMWC.CustomEventT<{
  value: number;
}>;

export type SliderOnInputEventT = RMWC.CustomEventT<{
  value: number;
}>;

/** A Slider component. */
export interface SliderProps {
  /** A callback that fires when the Slider stops sliding which takes an event with event.detail.value set to the Slider's value. evt.detail = { value: number;} */
  onChange?: (evt: SliderOnChangeEventT) => void;
  /** A callback that fires continuously while the Slider is sliding that takes an event with event.detail.value set to the Slider's value. evt.detail = { value: number;} */
  onInput?: (evt: SliderOnInputEventT) => void;
  /** The value of the Slider. When Slider is of type range, value becomes the end value. */
  value?: number | string;
  /** The minimum value of the Slider. */
  min?: number | string;
  /** The maximum value of the Slider. */
  max?: number | string;
  /** A step to quantize values by. */
  step?: number | string;
  /** Displays the exact value of the Slider on the knob. */
  discrete?: boolean;
  /** Displays the individual step markers on the Slider track. */
  displayMarkers?: boolean;
  /** Disables the control. */
  disabled?: boolean;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCSliderFoundation>;
  /** Makes the slider a range slider. */
  range?: boolean;
  /** The minimum gap between two thumbs for range sliders. */
  minRange?: number | string;
  /** The start value of the Slider range.  */
  valueStart?: number;
  // onChangeValueStart?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeValueStart?: (evt: SliderOnChangeEventT) => void;
}

export type SliderHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput'>
>;

// TODO: Consider export components such that slider is composable. And not a prop hell.

const SliderTrack = React.memo(function SliderTrack(props: any) {
  const { children, ...rest } = props;
  return (
    <div className="mdc-slider__track">
      <div className="mdc-slider__track--inactive"></div>
      <div className="mdc-slider__track--active">
        <div {...rest} className="mdc-slider__track--active_fill" />
      </div>
      {children}
    </div>
  );
});

const SliderTickMarks = React.memo(function SliderTickMarks({
  tickMarks
}: {
  tickMarks: Array<any>;
}) {
  return (
    <div className="mdc-slider__tick-marks">
      {tickMarks.map((tick, index) => (
        <div className={tick.className} key={index} />
      ))}
    </div>
  );
});

const SliderThumb = React.memo(
  React.forwardRef(function SliderThumb(props: any, ref: React.Ref<any>) {
    return (
      <div className="mdc-slider__thumb" ref={ref}>
        {props.children}
        <div className="mdc-slider__thumb-knob"></div>
      </div>
    );
  })
);

export interface SliderInputProps {
  disabled: boolean;
  max: number | undefined;
  min: number | undefined;
  setInputsRef: (index: number, element: HTMLInputElement | null) => void;
  step: string | number | undefined;
}

// export const SliderInput = createComponent<SliderInputProps>(
//   function SliderInput({disabled, max, min, setInputsRef, ...rest}) {
//     return (
//       <input
//         className="mdc-slider__input"
//         disabled={disabled}
//         max={safeNum(max)}
//         min={safeNum(min)}
//         name="rangeStart"
//         {...rest}
//         ref={(el) => setInputsRef(0, el)} // should index be switched around?
//         step={step}
//         type="range"
//         {...props}
//         ref={ref}
//         value={valueStart}
//       />
//     );
//     // return <ListItem role="menuitem" tabIndex={0} {...props} ref={ref} />;
//   }
// );

const safeNum = (num: string | number | undefined) => {
  const parsed = Number(num);
  return typeof parsed === 'number' && !isNaN(parsed) ? parsed : undefined;
};

export const Slider: RMWC.ComponentType<SliderProps, SliderHTMLProps, 'input'> =
  createComponent<SliderProps, SliderHTMLProps>(function Slider(props, ref) {
    const { rootEl, setInputsRef, setThumbRef, tickMarks, trackActiveEl } =
      useSliderFoundation(props);

    const {
      children,
      disabled,
      discrete,
      displayMarkers,
      max = 100,
      min = 0,
      minRange,
      onChange,
      onChangeValueStart,
      onInput,
      range,
      step,
      value,
      valueStart,
      ...rest
    } = props;

    const className = useClassNames(props, [
      'mdc-slider',
      {
        'mdc-slider--discrete': discrete,
        'mdc-slider--tick-marks': displayMarkers && discrete,
        'mdc-slider--disabled': disabled,
        'mdc-slider--range': range
      }
    ]);

    if (displayMarkers && !discrete) {
      console.warn(
        `The 'displayMarkers' prop on rmwc Slider will
        only work in conjunction with the 'discrete' prop`
      );
    }

    return (
      <Tag
        className={className}
        tabIndex={0}
        tag="div"
        element={rootEl}
        data-min-range={minRange}
      >
        {range && (
          <input
            className="mdc-slider__input"
            disabled={disabled}
            max={safeNum(max)}
            min={safeNum(min)}
            name="rangeStart"
            // @ts-ignore
            // onChange={onChangeValueStart}
            {...rest}
            ref={(el) => setInputsRef(0, el)} // should index be switched around?
            step={step}
            type="range"
            value={valueStart}
          />
        )}
        <input
          className="mdc-slider__input"
          disabled={disabled}
          max={safeNum(max)}
          min={safeNum(min)}
          name="rangeEnd"
          {...rest}
          ref={(el) => setInputsRef(1, el)}
          step={step}
          type="range"
          value={value}
        />
        <SliderTrack {...trackActiveEl.props({})}>
          {displayMarkers && <SliderTickMarks tickMarks={tickMarks} />}
        </SliderTrack>
        {range && (
          <SliderThumb ref={(el) => setThumbRef(0, el)}>
            {discrete && (
              <div
                className="mdc-slider__value-indicator-container"
                aria-hidden="true"
              >
                <div className="mdc-slider__value-indicator">
                  <span className="mdc-slider__value-indicator-text">
                    {valueStart}
                  </span>
                </div>
              </div>
            )}
          </SliderThumb>
        )}
        <SliderThumb ref={(el) => setThumbRef(1, el)}>
          {discrete && (
            <div
              className="mdc-slider__value-indicator-container"
              aria-hidden="true"
            >
              <div className="mdc-slider__value-indicator">
                <span className="mdc-slider__value-indicator-text">
                  {value}
                </span>
              </div>
            </div>
          )}
        </SliderThumb>
        {children}
      </Tag>
    );
  });
