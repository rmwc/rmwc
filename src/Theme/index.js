import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import themeOptions from './theme-options';

import simpleComponentFactory from '../Base/simple-component-factory';

export const Theme = simpleComponentFactory('Theme', {
  tag: 'span',
  classNames: props => {
    const use = Array.isArray(props.use) ? props.use : [props.use];
    return use.map(v => `mdc-theme--${v}`);
  },
  propTypes: {
    use: PropTypes.oneOfType([
      PropTypes.oneOf(themeOptions),
      PropTypes.arrayOf(PropTypes.oneOf(themeOptions))
    ]).isRequired
  },
  defaultProps: {
    use: undefined
  },
  propMeta: {
    use: {
      type: 'String | Array',
      desc: 'Alias for the "theme" prop'
    }
  },
  consumeProps: ['use']
});

export default Theme;
