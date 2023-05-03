// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React from 'react';
import { useClassNames, Tag, createComponent } from '@rmwc/base';
import { useCircularProgressFoundation } from './foundation';

const SIZE_MAP: { [key: string]: number } = {
  xsmall: 18,
  small: 20,
  medium: 24,
  large: 36,
  xlarge: 48
};

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;

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
  size?: Size;
}

export const CircularProgress = createComponent<CircularProgressProps>(
  function CircularProgress(props, ref) {
    const {
      closed,
      size = 'medium',
      max = 1,
      min = 0,
      progress,
      ...rest
    } = props;

    const { rootEl, determinateCircleEl } =
      useCircularProgressFoundation(props);

    const className = useClassNames(props, [
      'mdc-circular-progress',
      {
        'mdc-circular-progress--closed': closed
      }
    ]);

    const isDeterminate = progress !== undefined;

    const _size = SIZE_MAP[size] || Number(size);
    const style = {
      ...rest.style,
      fontSize: _size,
      width: `${_size}px`,
      height: `${_size}px`
    };

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

    return (
      <Tag
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
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
                  <circle
                    style={circularStyle(_size)}
                    cx={_size / 2}
                    cy={_size / 2}
                    r={_size / 2.4}
                    strokeDashoffset="56.549"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="mdc-circular-progress__gap-patch">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={`0 0 ${_size} ${_size}`}
                >
                  <circle
                    style={circularStyle(_size)}
                    cx={_size / 2}
                    cy={_size / 2}
                    r={_size / 2.4}
                    strokeDashoffset="56.549"
                    strokeWidth="3.2"
                  />
                </svg>
              </div>
              <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={`0 0 ${_size} ${_size}`}
                >
                  <circle
                    style={circularStyle(_size)}
                    cx={_size / 2}
                    cy={_size / 2}
                    r={_size / 2.4}
                    strokeDashoffset="56.549"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Tag>
    );
  }
);
