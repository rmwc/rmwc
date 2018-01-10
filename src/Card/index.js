// @flow

/**
 * @module Card
 */
import * as React from 'react';
import Button from '../Button';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

/****************************************************************
 * Public
 ****************************************************************/
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

type CardActionsT = {
  /** Allows for vertical alignment of actions. */
  vertical: boolean
};

/** Action Button for the Card */
export class CardActions extends simpleTag({
  displayName: 'CardActions',
  tag: 'section',
  classNames: props => [
    'mdc-card__actions',
    { 'mdc-card__actions--vertical': props.vertical }
  ],
  defaultProps: {
    vertical: undefined
  }
})<CardActionsT> {
  render() {
    return super.render();
  }
}

/** Media for the Card */
export const CardMedia = simpleTag({
  displayName: 'CardMedia',
  tag: 'section',
  classNames: 'mdc-card__media'
});

type CardMediaItemT = {
  /** Sets the media item height to 120px. */
  oneDotFiveX: boolean,
  /** Sets the media item height to 160px. */
  twoX: boolean,
  /** Sets the media item height to 240px. */
  threeX: boolean
};

/** Inidividual Media Item for the Card */
export class CardMediaItem extends simpleTag({
  displayName: 'CardMediaItem',
  tag: 'img',
  classNames: props => [
    'mdc-card__media-item',
    {
      'mdc-card__media-item--1dot5x	': props.oneDotFiveX,
      'mdc-card__media-item--2x': props.twoX,
      'mdc-card__media-item--3x': props.threeX
    }
  ]
})<CardMediaItemT> {
  render() {
    return super.render();
  }
}

/** Horizontal content for the Card */
export const CardHorizontalBlock: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  displayName: 'CardHorizontalBlock',
  classNames: 'mdc-card__horizontal-block'
});

/** A Card action Button. This is an instance of Button and can take all of the same props. */
export const CardAction = simpleTag({
  displayName: 'CardAction',
  tag: Button,
  classNames: 'mdc-card__action',
  defaultProps: {
    compact: true
  }
});

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
