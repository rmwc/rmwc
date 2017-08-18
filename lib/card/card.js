import React from 'react';
import simpleComponentFactory from '../_base/simple-component-factory';

export const CardEl = simpleComponentFactory('CardEl', 'div', {className: 'mdc-card'});

export const Card = props => <CardEl {...props} />;
export default Card;