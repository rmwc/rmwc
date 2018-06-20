// @flow
import * as React from 'react';
import classNames from 'classnames';
import { randomId } from '../Base/utils/randomId';

const mdcShapeAngledCornerBackground = (
  rootId: string,
  backgroundColor: string
) => {
  return `
    #${rootId} .mdc-shape-container__corner:after {
      background-color: ${backgroundColor};
    }
  `;
};

const mdcShapeAngledCornerOutline = (
  rootId: string,
  outlineWidth: number | string,
  outlineColor: string,
  outlineStyle: string | null
) => {
  return `
    #${rootId} .mdc-shape-container__corner:before {
      top: ${outlineWidth}px;
      border-bottom: ${outlineWidth}px ${outlineStyle ||
    'solid'} ${outlineColor};
    }
  `;
};

const mdcShapeAngledCorner = (
  rootId,
  backgroundColor: string,
  topLeftSize: string | number,
  topRightSize: string | number,
  bottomRightSize: string | number,
  bottomLeftSize: string | number
) => {
  topRightSize = topRightSize !== undefined ? topRightSize : topLeftSize;
  bottomRightSize =
    bottomRightSize !== undefined ? bottomRightSize : topLeftSize;
  bottomLeftSize = bottomLeftSize !== undefined ? bottomLeftSize : topLeftSize;

  const corners = [
    ['top', 'left', topLeftSize],
    ['top', 'right', topRightSize],
    ['bottom', 'right', bottomRightSize],
    ['bottom', 'left', bottomLeftSize]
  ];

  const cornerStyles = corners
    .map(([y, x, size]) => {
      const diagonalLength = Number(size) * 1.4142135623730951;
      return `
      #${rootId} .mdc-shape-container__corner--${y}-${x} {
        ${y}: -${diagonalLength / 2}px;
        ${x}: -${diagonalLength / 2}px;
        width: ${diagonalLength}px;
        height: ${diagonalLength}px;
      }
    `;
    })
    .join('\n');

  const backgroundStyle = mdcShapeAngledCornerBackground(
    rootId,
    backgroundColor
  );

  return `
    ${cornerStyles}
    ${backgroundStyle}
  `;
};

type ShapeContainerPropsT = {
  /** The background fill color for the corner  */
  backgroundColor?: string,
  /** The corner length. Will be used for all sides that are left unset.  */
  corner?: number | string,
  /** The top left corner length.*/
  topLeftCorner?: number | string,
  /** The top right corner length.*/
  topRightCorner?: number | string,
  /** The bottom right corner length.*/
  bottomRightCorner?: number | string,
  /** The bottom left corner length.*/
  bottomLeftCorner?: number | string,
  /** Sets the width of an outlined corner.*/
  outlineWidth?: number | string,
  /** Sets the color outlined corner.*/
  outlineColor?: string,
  /** Sets the border style of an outlined corner.*/
  outlineStyle?: string,
  /** Custom className to add */
  className?: string,
  /** Children to render. */
  children?: React.Node
};

/** A container for shaping other components. */
export class ShapeContainer extends React.Component<ShapeContainerPropsT> {
  static displayName = 'ShapeContainer';

  static defaultProps = {
    backgroundColor: '#fff'
  };

  generatedId: string;

  constructor(props: ShapeContainerPropsT) {
    super(props);
    this.generatedId = randomId('shape');
  }

  render() {
    const {
      children,
      className,
      backgroundColor,
      corner,
      topLeftCorner,
      topRightCorner,
      bottomRightCorner,
      bottomLeftCorner,
      outlineWidth,
      outlineColor,
      outlineStyle,
      ...rest
    } = this.props;

    const rootId = `shape-${this.generatedId}`;

    return (
      <div
        {...rest}
        id={`shape-${this.generatedId}`}
        className={classNames(className, 'mdc-shape-container')}
      >
        <style>
          {mdcShapeAngledCorner(
            rootId,
            backgroundColor || '',
            topLeftCorner || corner || 0,
            topRightCorner || corner || 0,
            bottomRightCorner || corner || 0,
            bottomLeftCorner || corner || 0
          )}
          {!!outlineWidth &&
            !!outlineColor &&
            mdcShapeAngledCornerOutline(
              rootId,
              outlineWidth,
              outlineColor,
              outlineStyle || null
            )}
        </style>
        {children}
        <div className="mdc-shape-container__corner mdc-shape-container__corner--top-left" />
        <div className="mdc-shape-container__corner mdc-shape-container__corner--top-right" />
        <div className="mdc-shape-container__corner mdc-shape-container__corner--bottom-right" />
        <div className="mdc-shape-container__corner mdc-shape-container__corner--bottom-left" />
      </div>
    );
  }
}
