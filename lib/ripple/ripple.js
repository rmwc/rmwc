import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ripple as mdcRipple } from 'material-components-web';
import { propMeta } from '../_base/prop-meta';

const { MDCRipple } = mdcRipple;

export class Ripple extends React.Component {
  static propTypes = {
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    unbounded: PropTypes.bool
  };

  static defaultProps = {
    primary: false,
    accent: false,
    unbounded: false
  };

  static propMeta = propMeta({
    primary: {
      type: 'Boolean',
      desc: 'Uses the primary palette.'
    },
    accent: {
      type: 'Boolean',
      desc: 'Uses the accent palette.'
    },
    unbounded: {
      type: 'Boolean',
      desc: 'Make the Ripple unbounded, like the ones used in Checkboxes.'
    }
  });

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    this.initRipple();
  }

  componentWillReceiveProps(nextProps) {
    this.checkProps(nextProps);
  }

  checkProps(nextProps) {
    if (this.api.unbounded !== nextProps.unbounded) {
      this.api.unbounded = nextProps.unbounded;
    }
  }

  componentDidUpdate(prevProps) {
    const didChange = ['primary', 'accent', 'unbounded'].some(
      key => this.props[key] !== prevProps[key]
    );
    if (didChange) {
      this.destroyRipple();
      this.initRipple();
      this.forceUpdate();
    }
  }

  initRipple() {
    // a stupid hack for the test environment where this ends up undefined
    if (process.env.NODE_ENV === 'test') {
      this.el.dataset = {};
    }

    this.api = new MDCRipple(this.el);
    this.checkProps(this.props);
  }

  destroyRipple() {
    this.api.destroy();
  }

  render() {
    const child = React.Children.only(this.props.children);
    const { accent, primary } = this.props;

    /**
		 * Collect the ripple classes so we make sure React doesnt
		 * destroy them when we re-render.
		 */
    const rippleClasses = (this.el
      ? this.el.getAttribute('class').split(' ')
      : []).filter(cls => {
      if (
        ~[
          'mdc-ripple-surface--primary',
          'mdc-ripple-surface--accent',
          'mdc-ripple-surface'
        ].indexOf(cls)
      ) {
        return false;
      }

      return cls.startsWith('mdc-ripple');
    });

    const classes = classNames(
      'mdc-ripple-surface',
      child.props.className,
      ...rippleClasses,
      {
        'mdc-ripple-surface--primary': primary,
        'mdc-ripple-surface--accent': accent
      }
    );

    const dedupedClasses = Array.from(new Set(classes.split(' '))).join(' ');

    return React.cloneElement(child, {
      ...child.props,
      className: dedupedClasses
    });
  }
}

export default Ripple;
