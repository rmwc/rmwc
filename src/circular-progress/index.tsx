import { componentFactory, ComponentProps } from '@rmwc/base';
import * as React from 'react';

const SIZE_MAP: { [key: string]: number } = {
  xsmall: 18,
  small: 20,
  medium: 24,
  large: 36,
  xlarge: 48
};

export interface CircularProgressProps extends ComponentProps {
  /** Max value for determinate progress bars. */
  max?: number;
  /** Min value for determinate progress bars. */
  min?: number;
  /** Value for determinate progress bars. */
  progress?: number;
  /** The size of the loader you would like to render. */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number | any;
}

interface CircularProgressRootProps {
  _size: string | number;
  _progress?: number;
}

const CircularProgressRoot = componentFactory<CircularProgressRootProps>({
  displayName: 'CircularProgressRoot',
  classNames: (props: CircularProgressRootProps) => [
    'rmwc-circular-progress',
    {
      [`rmwc-circular-progress--size-${props._size}`]:
        typeof props._size === 'string',
      'rmwc-circular-progress--indeterminate': props._progress === undefined,
      'rmwc-circular-progress--thickerstroke':
        !!props._size && (SIZE_MAP[props._size] || Number(props._size)) > 36
    }
  ],
  consumeProps: ['size', 'progress']
});

/** A Circular Progress indicator. */
export class CircularProgress extends React.Component<CircularProgressProps> {
  static defaultProps = {
    progress: undefined,
    size: 'medium'
  };

  calculateRatio(value: number) {
    const { min = 0, max = 1 } = this.props;

    if (value < min) return 0;
    if (value > max) return 1;
    return (value - min) / (max - min);
  }

  circularStyle(size: number) {
    return this.props.progress !== undefined
      ? {
          strokeDasharray: `${2 *
            Math.PI *
            (size / 2.4) *
            this.calculateRatio(this.props.progress)}, 666.66%`
        }
      : undefined;
  }

  render() {
    const { max, min, size = 'medium', progress, ...rest } = this.props;
    let style = rest.style;
    const _size = SIZE_MAP[size] || Number(size);

    if (!SIZE_MAP[size]) {
      style = {
        ...rest.style,
        fontSize: Number(size)
      };
    }
    return (
      <CircularProgressRoot
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
        _size={size}
        _progress={progress}
        {...rest}
        style={style}
      >
        <svg
          className="rmwc-circular-progress__circle"
          viewBox={`0 0 ${_size} ${_size}`}
        >
          <circle
            className="rmwc-circular-progress__path"
            style={this.circularStyle(_size)}
            cx={_size / 2}
            cy={_size / 2}
            r={_size / 2.4}
          />
        </svg>
      </CircularProgressRoot>
    );
  }
}
