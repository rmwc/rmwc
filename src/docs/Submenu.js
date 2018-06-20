import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListItem, ListItemMeta, ListItemText } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

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
          <ListItemText>{label}</ListItemText>
          <ListItemMeta>
            <Icon
              className={classNames('submenu__icon', {
                'submenu__icon--open': this.state.isOpen
              })}
            >
              chevron_right
            </Icon>
          </ListItemMeta>
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
