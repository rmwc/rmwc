import { Tag, createComponent, useClassNames } from '@rmwc/base';
import {
  CX_CY_MAP,
  R_MAP,
  SIZE_MAP,
  STROKE_DASHARRAY_MAP,
  STROKE_DASHOFFSET_MAP,
  STROKE_WIDTH_GAP_MAP,
  STROKE_WIDTH_MAP
} from './constants';
import { useCircularProgressFoundation } from './foundation';

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

/** A Circular Progress indicator. */
export interface CircularProgressProps {
  /** Hides the progress bar. Adding / removing this prop will trigger an animation in or out.  */
  closed?: boolean;
  /** Max value for determinate progress bars. */
  max?: number;
  /** Min value for determinate progress bars. */
  min?: number;
  /** Value for determinate progress bars. */
  progress?: number;
  /** The size of the loader you would like to render. */
  size?: Size | number;
  /** The label which will set an aria-label. */
  label?: string;
}

export const CircularProgress = createComponent<CircularProgressProps>(
  function CircularProgress(props, ref) {
    const {
      closed,
      size = 'small' as Size,
      max = 1,
      min = 0,
      progress,
      label,
      ...rest
    } = props;

    const { rootEl, determinateCircleEl } =
      useCircularProgressFoundation(props);

    const className = useClassNames(props, [
      'mdc-circular-progress',
      `rmwc-circular-progress--${size}`,
      {
        'mdc-circular-progress--closed': closed
      }
    ]);

    const isDeterminate = progress !== undefined;

    const isSizeNumber = typeof size === 'number';

    const _size = SIZE_MAP[isSizeNumber ? 'medium' : size];

    const style = isSizeNumber
      ? {
          ...rest.style,
          fontSize: `${size}px`,
          width: `${size}px`,
          height: `${size}px`
        }
      : { ...rest.style };

    const calculateRatio = (value: number) => {
      if (value < min) return 0;
      if (value > max) return 1;
      return (value - min) / (max - min);
    };

    const circularStyle = (size: number) => {
      return progress !== undefined
        ? {
            strokeDasharray: `${
              2 * Math.PI * (size / 2.4) * calculateRatio(progress)
            }, 666.66%`,
            width: `${size}px`,
            height: `${size}px`
          }
        : undefined;
    };

    const circleProps = (size: number) => {
      return {
        cx: CX_CY_MAP[size],
        cy: CX_CY_MAP[size],
        r: R_MAP[size],
        strokeDasharray: STROKE_DASHARRAY_MAP[size],
        strokeDashoffset: STROKE_DASHOFFSET_MAP[size],
        strokeWidth: STROKE_WIDTH_MAP[size]
      };
    };

    return (
      <Tag
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        {...rest}
        style={style}
        className={className}
        element={rootEl}
        ref={ref}
        role="progressbar"
      >
        {isDeterminate ? (
          <div className="mdc-circular-progress__determinate-container">
            <svg
              className="mdc-circular-progress__determinate-circle-graphic"
              viewBox={`0 0 ${_size} ${_size}`}
            >
              <circle
                className="mdc-circular-progress__determinate-track"
                cx={_size / 2}
                cy={_size / 2}
                r={_size / 2.4}
                strokeWidth="4"
              />
              <Tag
                tag="circle"
                className="mdc-circular-progress__determinate-circle"
                style={circularStyle(_size)}
                cx={_size / 2}
                cy={_size / 2}
                r={_size / 2.4}
                element={determinateCircleEl}
                strokeDashoffset="113.097"
                strokeWidth="4"
              />
            </svg>
          </div>
        ) : (
          <div className="mdc-circular-progress__indeterminate-container">
            <div className="mdc-circular-progress__spinner-layer">
              <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={`0 0 ${_size} ${_size}`}
                >
                  <circle {...circleProps(_size)} />
                </svg>
              </div>
              <div className="mdc-circular-progress__gap-patch">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={`0 0 ${_size} ${_size}`}
                >
                  <circle
                    {...circleProps(_size)}
                    strokeWidth={STROKE_WIDTH_GAP_MAP[_size]}
                  />
                </svg>
              </div>
              <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={`0 0 ${_size} ${_size}`}
                >
                  <circle {...circleProps(_size)} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Tag>
    );
  }
);
