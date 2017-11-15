// @flow

/**
 * @module Card
 */
import * as React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

/**
 * Primary card content
 */
export const CardPrimary: React.ComponentType<SimpleTagPropsT> = simpleTag({
  displayName: 'CardPrimary',
  tag: 'section',
  classNames: 'mdc-card__primary'
});

type CardTitlePropsT = {
  /** Make the title large. */
  large: boolean
} & SimpleTagPropsT;

/** Title for the Card */
export class CardTitle extends simpleTag({
  displayName: 'CardTitle',
  tag: 'h1',
  classNames: props => [
    'mdc-card__title',
    {
      'mdc-card__title--large': props.large
    }
  ],
  defaultProps: {
    large: false
  },
  consumeProps: ['large']
})<CardTitlePropsT> {
  render() {
    return super.render();
  }
}

/** Subtitle for the Card */
export const CardSubtitle = simpleTag({
  displayName: 'CardSubtitle',
  tag: 'h2',
  classNames: 'mdc-card__subtitle'
});

/** Supporting text for the Card. */
export const CardSupportingText: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  displayName: 'CardSupportingText',
  tag: 'section',
  classNames: 'mdc-card__supporting-text'
});

/** Action Button for the Card */
export const CardActions = simpleTag({
  displayName: 'CardActions',
  tag: 'section',
  classNames: 'mdc-card__actions'
});

/** Media for the Card */
export const CardMedia = simpleTag({
  displayName: 'CardMedia',
  tag: 'section',
  classNames: 'mdc-card__media'
});

/** Horizontal content for the Card */
export const CardHorizontalBlock: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  displayName: 'CardHorizontalBlock',
  classNames: 'mdc-card__media'
});

/** A Card action Button */
export const CardAction: React.ComponentType<Button> = props => {
  const { className, ...rest } = props;
  const classes = classNames('mdc-card__action', className);
  return <Button compact className={classes} {...rest} />;
};

type CardPropsT = {
  /** Use the cards dark theme. */
  themeDark: boolean
} & SimpleTagPropsT;

/** A Card Component */
export class Card extends simpleTag({
  displayName: 'Card',
  classNames: props => [
    'mdc-card',
    {
      'mdc-card--theme-dark': props.themeDark
    }
  ],
  defaultProps: {
    themeDark: false
  },
  consumeProps: ['themeDark']
})<CardPropsT> {
  render() {
    return super.render();
  }
}

export default Card;
