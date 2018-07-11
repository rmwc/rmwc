// @flow
import type { SimpleTagPropsT } from '../Base';
import type { IconButtonPropsT } from '../IconButton';

import * as React from 'react';
import { Button } from '../Button';
import { simpleTag, withRipple } from '../Base';
import { IconButton } from '../IconButton';

/****************************************************************
 * Public
 ****************************************************************/
export type CardPropsT = {
  /** Removes the shadow and displays a hairline outline instead */
  outlined: boolean
} & SimpleTagPropsT;

/** A Card Component */
export class Card extends simpleTag({
  displayName: 'Card',
  classNames: (props: CardPropsT) => [
    'mdc-card',
    {
      'mdc-card--outlined': props.outlined
    }
  ],
  consumeProps: ['outlined']
})<CardPropsT> {
  render() {
    return super.render();
  }
}

export type CardMediaPropsT = {
  /** Automatically scales the media area’s height to equal its width */
  square: boolean,
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine: boolean
};

/** Media area that displays a custom background-image with background-size: cover */
export class CardMedia extends simpleTag({
  displayName: 'CardMedia',
  tag: 'section',
  classNames: (props: CardMediaPropsT) => [
    'mdc-card__media',
    {
      'mdc-card__media--square': props.square,
      'mdc-card__media--16-9': props.sixteenByNine
    }
  ],
  consumeProps: ['square', 'sixteenByNine']
})<CardMediaPropsT> {
  render() {
    return super.render();
  }
}

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export const CardMediaContent = simpleTag({
  displayName: 'CardMediaContent',
  classNames: 'mdc-card__media-content'
});

/** The main clickable area for the primary content of the card */
export const CardPrimaryAction = withRipple({ surface: false })(
  simpleTag({
    displayName: 'CardPrimaryAction',
    classNames: 'mdc-card__primary-action'
  })
);

export type CardActionsT = {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed: boolean
} & SimpleTagPropsT;

/** Row containing action buttons and/or icons */
export class CardActions extends simpleTag({
  displayName: 'CardActions',
  tag: 'section',
  classNames: (props: CardActionsT) => [
    'mdc-card__actions',
    { 'mdc-card__actions--full-bleed': props.fullBleed }
  ],
  consumeProps: ['fullBleed']
})<CardActionsT> {
  render() {
    return super.render();
  }
}

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export const CardActionButtons = simpleTag({
  displayName: 'CardActionButtons',
  classNames: 'mdc-card__action-buttons'
});

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export const CardActionIcons = simpleTag({
  displayName: 'CardActionIcons',
  classNames: 'mdc-card__action-icons'
});

export type CardActionPropsT = {
  /** Forces the action to be an icon. In most cases, this will be determined for you. */
  isIcon?: boolean
} & IconButtonPropsT;

const CardActionIcon = simpleTag({
  tag: IconButton,
  classNames: ['mdc-card__action', 'mdc-card__action--icon']
});

const CardActionButton = simpleTag({
  tag: Button,
  classNames: ['mdc-card__action', 'mdc-card__action--button']
});

/** A Card action Button. Depending on the props that are passed, this will either render an instance of the Button component, or the IconButton component. */
export class CardAction extends React.Component<CardActionPropsT> {
  static displayName = 'CardAction';

  render() {
    const { isIcon, ...rest } = this.props;
    const { onContent, offContent, use } = this.props;
    return isIcon || onContent || offContent || use ? (
      <CardActionIcon {...rest} />
    ) : (
      <CardActionButton {...rest} />
    );
  }
}

CardAction.displayName = 'CardAction';
