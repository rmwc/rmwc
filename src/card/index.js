// @flow
import type { IconButtonPropsT } from '@rmwc/icon-button';
import type { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import { Button } from '@rmwc/button';
import { Component } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { IconButton } from '@rmwc/icon-button';

/****************************************************************
 * Card
 ****************************************************************/
export type CardPropsT = {
  /** Removes the shadow and displays a hairline outline instead */
  outlined?: boolean
};

/** @extends React.Component */
/** A Card Component */
export class Card extends Component<CardPropsT> {
  static displayName = 'Card';
  classNames = (props: CardPropsT) => [
    'mdc-card',
    {
      'mdc-card--outlined': props.outlined
    }
  ];
  consumeProps = ['outlined'];
}

/****************************************************************
 * Card Media
 ****************************************************************/
export type CardMediaPropsT = {
  /** Automatically scales the media area’s height to equal its width */
  square?: boolean,
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine?: boolean
};

/** @extends React.Component */
/** Media area that displays a custom background-image with background-size: cover */
export class CardMedia extends Component<CardMediaPropsT> {
  static displayName = 'CardMedia';
  tag = 'section';
  classNames = (props: CardMediaPropsT) => [
    'mdc-card__media',
    {
      'mdc-card__media--square': props.square,
      'mdc-card__media--16-9': props.sixteenByNine
    }
  ];
  consumeProps = ['square', 'sixteenByNine'];
}

/** @extends React.Component */
/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export class CardMediaContent extends Component<{}> {
  static displayName = 'CardMediaContent';
  classNames = ['mdc-card__media-content'];
}

const CardPrimaryActionRoot: React.ComponentType<WithRipplePropsT> = withRipple(
  { surface: false }
)(
  class extends Component<{}> {
    static displayName = 'CardPrimaryActionRoot';
    classNames = ['mdc-card__primary-action'];
  }
);

/** The main clickable area for the primary content of the card */
export const CardPrimaryAction: React.ComponentType<WithRipplePropsT> = ({
  ...rest
}) => <CardPrimaryActionRoot {...rest} />;
CardPrimaryAction.displayName = 'CardPrimaryAction';

/****************************************************************
 * Card Actions
 ****************************************************************/
export type CardActionsT = {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed?: boolean
};

/** @extends React.Component */
/** Row containing action buttons and/or icons */
export class CardActions extends Component<CardActionsT> {
  static displayName = 'CardActions';
  tag = 'section';
  classNames = (props: CardActionsT) => [
    'mdc-card__actions',
    { 'mdc-card__actions--full-bleed': props.fullBleed }
  ];
  consumeProps = ['fullBleed'];
}

/** @extends React.Component */
/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export class CardActionButtons extends Component<{}> {
  static displayName = 'CardActionButtons';
  classNames = ['mdc-card__action-buttons'];
}

/** @extends React.Component */
/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export class CardActionIcons extends Component<{}> {
  static displayName = 'CardActionIcons';
  classNames = ['mdc-card__action-icons'];
}

export type CardActionPropsT = IconButtonPropsT;

class CardActionIcon extends Component<{}> {
  tag = IconButton;
  classNames = ['mdc-card__action', 'mdc-card__action--icon'];
}

class CardActionButton extends Component<{}> {
  tag = Button;
  classNames = ['mdc-card__action', 'mdc-card__action--button'];
}

/** A Card action Button. Depending on the props that are passed, this will either render an instance of the Button component, or the IconButton component. */
export class CardAction extends React.Component<CardActionPropsT> {
  static displayName = 'CardAction';

  render() {
    return this.props.icon ? (
      <CardActionIcon {...this.props} />
    ) : (
      <CardActionButton {...this.props} />
    );
  }
}
