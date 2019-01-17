import { IconButtonProps } from '@rmwc/icon-button';
import { WithRippleProps } from '@rmwc/ripple';

import * as React from 'react';
import { Button, ButtonProps } from '@rmwc/button';
import { componentFactory } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { IconButton } from '@rmwc/icon-button';

/****************************************************************
 * Card
 ****************************************************************/
export type CardPropsT = {
  /** Removes the shadow and displays a hairline outline instead */
  outlined?: boolean;
};

/** A Card Component */
export const Card = componentFactory<CardPropsT>({
  displayName: 'Card',
  classNames: (props: CardPropsT) => [
    'mdc-card',
    {
      'mdc-card--outlined': props.outlined
    }
  ],
  consumeProps: ['outlined']
});

/****************************************************************
 * Card Media
 ****************************************************************/
export type CardMediaPropsT = {
  /** Automatically scales the media area’s height to equal its width */
  square?: boolean;
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine?: boolean;
};

/** Media area that displays a custom background-image with background-size: cover */
export const CardMedia = componentFactory<CardMediaPropsT>({
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
});

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export const CardMediaContent = componentFactory({
  displayName: 'CardMediaContent',
  classNames: ['mdc-card__media-content']
});

const CardPrimaryActionRoot = withRipple({
  surface: false
})(
  componentFactory({
    displayName: 'CardPrimaryActionRoot',
    classNames: ['mdc-card__primary-action']
  })
);

/** The main clickable area for the primary content of the card */
export const CardPrimaryAction: React.ComponentType<WithRippleProps> = ({
  ...rest
}) => <CardPrimaryActionRoot {...rest} />;
CardPrimaryAction.displayName = 'CardPrimaryAction';

/****************************************************************
 * Card Actions
 ****************************************************************/
export type CardActionsT = {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed?: boolean;
};

/** Row containing action buttons and/or icons */
export const CardActions = componentFactory<CardActionsT>({
  displayName: 'CardActions',
  tag: 'section',
  classNames: (props: CardActionsT) => [
    'mdc-card__actions',
    { 'mdc-card__actions--full-bleed': props.fullBleed }
  ],
  consumeProps: ['fullBleed']
});

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export const CardActionButtons = componentFactory({
  displayName: 'CardActionButtons',
  classNames: ['mdc-card__action-buttons']
});

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export const CardActionIcons = componentFactory({
  displayName: 'CardActionIcons',
  classNames: ['mdc-card__action-icons']
});

export type CardActionPropsT = IconButtonProps & ButtonProps;

const CardActionIcon = componentFactory<IconButtonProps>({
  displayName: 'CardActionIcon',
  tag: IconButton,
  classNames: ['mdc-card__action', 'mdc-card__action--icon']
});

const CardActionButton = componentFactory<ButtonProps>({
  displayName: 'CardActionButton',
  tag: Button,
  classNames: ['mdc-card__action', 'mdc-card__action--button']
});

/** A Card action Button. Depending on the props that are passed, this will either render an instance of the Button component, or the IconButton component. */
export const CardAction = (props: CardActionPropsT) =>
  props.icon ? <CardActionIcon {...props} /> : <CardActionButton {...props} />;

CardAction.displayName = 'CardAction';
