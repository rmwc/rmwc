// @flow

/**
 * @module Card
 */
import * as React from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import { Ripple } from '../Ripple';
import { Icon } from '../Icon';
import { IconToggle } from '../IconToggle';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

/****************************************************************
 * Public
 ****************************************************************/
type CardPropsT = {
  /** Removes the shadow and displays a hairline stroke instead */
  stroked: boolean
} & SimpleTagPropsT;

/** A Card Component */
export class Card extends simpleTag({
  displayName: 'Card',
  classNames: props => [
    'mdc-card',
    {
      'mdc-card--stroked': props.stroked
    }
  ],
  consumeProps: ['stroked']
})<CardPropsT> {
  render() {
    return super.render();
  }
}

type CardMediaPropsT = {
  /** Automatically scales the media area’s height to equal its width */
  square: boolean,
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine: boolean
};

/** Media area that displays a custom background-image with background-size: cover */
export class CardMedia extends simpleTag({
  displayName: 'CardMedia',
  tag: 'section',
  classNames: props => [
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

/** The main clickable area fro the primary content of the card */
export const CardPrimaryAction = simpleTag({
  displayName: 'CardPrimaryAction',
  classNames: 'mdc-card__primary-action'
});

type CardActionsT = {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed: boolean
} & SimpleTagPropsT;

/** Row containing action buttons and/or icons */
export class CardActions extends simpleTag({
  displayName: 'CardActions',
  tag: 'section',
  classNames: props => [
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

type CardActionPropsT = {
  /** An action icon with no text. This is an instance of the Icon component. */
  icon: boolean,
  /** An toggleable action icon with no text. This is an instance of the IconToggle component. */
  iconToggle: boolean
};

/** A Card action Button. Will return a Button component by default. */
export const CardAction = ({
  button,
  icon,
  iconToggle,
  ...rest
}: CardActionPropsT) => {
  if (icon) {
    return (
      <Ripple unbounded {...rest}>
        <Icon
          className={classNames(
            rest.className,
            'mdc-card__action',
            'mdc-card__action--icon'
          )}
        />
      </Ripple>
    );
  }

  if (iconToggle) {
    return (
      <IconToggle
        {...rest}
        className={classNames(
          rest.className,
          'mdc-card__action',
          'mdc-card__action--icon'
        )}
      />
    );
  }

  return (
    <Button
      {...rest}
      className={classNames(
        rest.className,
        'mdc-card__action',
        'mdc-card__action--button'
      )}
    />
  );
};

CardAction.displayName = 'CardAction';
