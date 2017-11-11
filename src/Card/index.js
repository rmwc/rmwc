import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const CardPrimary = simpleTag({
  name: 'CardPrimary',
  tag: 'section',
  classNames: 'mdc-card__primary'
});

type CardTitlePropsT = {
  large: boolean
} & SimpleTagPropsT;

export const CardTitle: React.ComponentType<CardTitlePropsT> = simpleTag({
  name: 'CardTitle',
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
});

export const CardSubtitle = simpleTag({
  name: 'CardSubtitle',
  tag: 'h2',
  classNames: 'mdc-card__subtitle'
});

export const CardSupportingText: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  name: 'CardSupportingText',
  tag: 'section',
  classNames: 'mdc-card__supporting-text'
});

export const CardActions = simpleTag({
  name: 'CardActions',
  tag: 'section',
  classNames: 'mdc-card__actions'
});

export const CardMedia = simpleTag({
  name: 'CardMedia',
  tag: 'section',
  classNames: 'mdc-card__media'
});

export const CardHorizontalBlock: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  name: 'CardHorizontalBlock',
  classNames: 'mdc-card__media'
});

type CardPropsT = {
  /* Use the cards dark theme. */
  themeDark: boolean
} & SimpleTagPropsT;

export const Card: React.ComponentType<CardPropsT> = simpleTag({
  name: 'Card',
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
});

export const CardAction: React.ComponentType<Button> = props => {
  const { className, ...rest } = props;
  const classes = classNames('mdc-card__action', className);
  return <Button compact className={classes} {...rest} />;
};

export default Card;
