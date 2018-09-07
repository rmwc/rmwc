import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListItem, ListItemMeta } from '@rmwc/list';

export class Submenu extends React.Component {
  static propTypes = {
    label: PropTypes.node
  };

  state = {
    isOpen: false
  };

  render() {
    const { children, label } = this.props;
    return (
      <div className="submenu">
        <ListItem onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          <span>{label}</span>
          <ListItemMeta
            icon="chevron_right"
            className={classNames('submenu__icon', {
              'submenu__icon--open': this.state.isOpen
            })}
          />
        </ListItem>
        <div
          className={classNames('submenu__children', {
            'submenu__children--open': this.state.isOpen
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Submenu;
