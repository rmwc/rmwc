import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory, deprecationWarning } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Button, ButtonProps } from '@rmwc/button';
import { IconButton, IconButtonProps } from '@rmwc/icon-button';

/** A Card Component */
export interface CardProps {
  /** Removes the shadow and displays a hairline outline instead */
  outlined?: boolean;
}

/** A Card Component */
export const Card = componentFactory<CardProps>({
  displayName: 'Card',
  classNames: (props: CardProps) => [
    'mdc-card',
    {
      'mdc-card--outlined': props.outlined
    }
  ],
  consumeProps: ['outlined']
});

/** Media area that displays a custom background-image with background-size: cover */
export interface CardMediaProps {
  /** Automatically scales the media area’s height to equal its width */
  square?: boolean;
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine?: boolean;
}

/** Media area that displays a custom background-image with background-size: cover */
export const CardMedia = componentFactory<CardMediaProps>({
  displayName: 'CardMedia',
  tag: 'section',
  classNames: (props: CardMediaProps) => [
    'mdc-card__media',
    {
      'mdc-card__media--square': props.square,
      'mdc-card__media--16-9': props.sixteenByNine
    }
  ],
  consumeProps: ['square', 'sixteenByNine']
});

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export interface CardMediaContentProps {}

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export const CardMediaContent = componentFactory<CardMediaContentProps>({
  displayName: 'CardMediaContent',
  classNames: ['mdc-card__media-content']
});

/** The main clickable area for the primary content of the card */
export interface CardPrimaryActionProps {}

/** The main clickable area for the primary content of the card */
export const CardPrimaryAction = withRipple({
  surface: false
})(
  componentFactory<CardPrimaryActionProps>({
    displayName: 'CardPrimaryAction',
    classNames: ['mdc-card__primary-action']
  })
);

/** Row containing action buttons and/or icons */
export interface CardActionsProps {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed?: boolean;
}

/** Row containing action buttons and/or icons */
export const CardActions = componentFactory<CardActionsProps>({
  displayName: 'CardActions',
  tag: 'section',
  classNames: (props: CardActionsProps) => [
    'mdc-card__actions',
    { 'mdc-card__actions--full-bleed': props.fullBleed }
  ],
  consumeProps: ['fullBleed']
});

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export interface CardActionButtonsProps {}

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export const CardActionButtons = componentFactory<CardActionButtonsProps>({
  displayName: 'CardActionButtons',
  classNames: ['mdc-card__action-buttons']
});

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export interface CardActionIconsProps {}

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export const CardActionIcons = componentFactory<CardActionIconsProps>({
  displayName: 'CardActionIcons',
  classNames: ['mdc-card__action-icons']
});

/** A card action Icon */
export interface CardActionIconProps extends IconButtonProps {}

/** A card action Icon */
export const CardActionIcon = componentFactory<CardActionIconProps>({
  displayName: 'CardActionIcon',
  tag: IconButton,
  classNames: ['mdc-card__action', 'mdc-card__action--icon']
});

/** A card action Button */
export interface CardActionButtonProps extends ButtonProps {}

/** A card action Button */
export const CardActionButton = componentFactory<CardActionButtonProps>({
  displayName: 'CardActionButton',
  tag: Button,
  classNames: ['mdc-card__action', 'mdc-card__action--button']
});

export type CardActionPropsT = IconButtonProps & ButtonProps;

/** DEPRECATED: A Card action Button. Depending on the props that are passed, this will either render an instance of the Button component, or the IconButton component. */
export const CardAction = (props: CardActionPropsT) => {
  /* istanbul ignore next */
  deprecationWarning(
    'The CardAction component has been removed in favor of CardActionIcon and CardActionButton due to impossible type intersections of IconButtonProps and ButtonProps'
  );

  return props.icon ? (
    // @ts-ignore
    <CardActionIcon {...props} />
  ) : (
    <CardActionButton {...props} />
  );
};

CardAction.displayName = 'CardAction';
