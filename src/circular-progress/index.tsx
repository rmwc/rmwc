import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory } from '@rmwc/base';

const SIZE_MAP: { [key: string]: number } = {
  xsmall: 18,
  small: 20,
  medium: 24,
  large: 36,
  xlarge: 48
};

/** A Circular Progress indicator. */
export interface CircularProgressProps {
  /** Max value for determinate progress bars. */
  max?: number;
  /** Min value for determinate progress bars. */
  min?: number;
  /** Value for determinate progress bars. */
  progress?: number;
  /** The size of the loader you would like to render. */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;
}

/** A Circular Progress indicator. */
export const CircularProgress = componentFactory<CircularProgressProps>({
  displayName: 'CircularProgress',
  classNames: props => [
    'rmwc-circular-progress',
    {
      [`rmwc-circular-progress--size-${props.size}`]:
        typeof props.size === 'string',
      'rmwc-circular-progress--indeterminate': props.progress === undefined,
      'rmwc-circular-progress--thickerstroke':
        !!props.size && (SIZE_MAP[props.size] || Number(props.size)) > 36
    }
  ],
  useRender: (
    { size = 'medium', max = 1, min = 0, progress, ...rest },
    ref,
    Tag
  ) => {
    const style = !SIZE_MAP[size]
      ? { ...rest.style, fontSize: Number(size) }
      : rest.style;
    const _size = SIZE_MAP[size] || Number(size);

    const calculateRatio = (value: number) => {
      if (value < min) return 0;
      if (value > max) return 1;
      return (value - min) / (max - min);
    };

    const circularStyle = (size: number) => {
      return progress !== undefined
        ? {
            strokeDasharray: `${2 *
              Math.PI *
              (size / 2.4) *
              calculateRatio(progress)}, 666.66%`
          }
        : undefined;
    };

    return (
      <Tag
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
        ref={ref}
        {...rest}
        style={style}
      >
        <svg
          className="rmwc-circular-progress__circle"
          viewBox={`0 0 ${_size} ${_size}`}
        >
          <circle
            className="rmwc-circular-progress__path"
            style={circularStyle(_size)}
            cx={_size / 2}
            cy={_size / 2}
            r={_size / 2.4}
          />
        </svg>
      </Tag>
    );
  }
});
