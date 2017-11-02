import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListItem, ListItemEndDetail, ListItemText, Icon } from '../../';

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
					<ListItemEndDetail>
						<Icon
							className={classNames('submenu__icon', {
								'submenu__icon--open': this.state.isOpen
							})}
						>
							chevron_right
						</Icon>
					</ListItemEndDetail>
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
