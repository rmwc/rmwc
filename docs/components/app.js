import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import {
	Toolbar,
	ToolbarRow,
	ToolbarSection,
	ToolbarTitle,
	ToolbarFixedAdjust,
	PersistentDrawer,
	PersistentDrawerContent,
	ListItem,
	ListItemText,
	IconButton,
	Icon
} from '../../src';

import Detail from './detail';
import Submenu from './submenu';
import Home from './home';
import content from '../content';

const MenuItem = ({ url, label }) => {
	return (
		<ListItem>
			<Link to={url}>
				<ListItemText>{label}</ListItemText>
			</Link>
		</ListItem>
	);
};

const MenuItemForSection = ({ sectionKey }) => {
	const section = content.find(v => v.section === sectionKey);
	return (
		<MenuItem
			label={section.name}
			url={`${process.env.PUBLIC_URL}/${section.section}`}
		/>
	);
};

const SubmenuWithMenuItems = ({ label, sectionKeys }) => (
	<Submenu label={label}>
		{sectionKeys.map(v => <MenuItemForSection key={v} sectionKey={v} />)}
	</Submenu>
);

export class App extends React.Component {
	state = {
		menuIsOpen: true
	};

	render() {
		return (
			<Router>
				<div>
					<Toolbar fixed waterfall>
						<ToolbarRow>
							<ToolbarSection alignStart>
								<IconButton
									style={{ color: 'inherit', alignSelf: 'center' }}
									onClick={evt =>
										this.setState({ menuIsOpen: !this.state.menuIsOpen })}
								>
									menu
								</IconButton>
								<ToolbarTitle>ReactMWC</ToolbarTitle>
							</ToolbarSection>
							<ToolbarSection alignEnd>
								<IconButton
									tag="a"
									href="https://github.com/jamesmfriedman/rmwc"
									use={
										<svg
											style={{ width: '24px', height: '24px' }}
											viewBox="0 0 24 24"
										>
											<path
												fill="#ffffff"
												d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
											/>
										</svg>
									}
								/>
							</ToolbarSection>
						</ToolbarRow>
					</Toolbar>
					<ToolbarFixedAdjust />
					<div className="demo-content">
						<PersistentDrawer
							id="main-nav"
							open={this.state.menuIsOpen}
							onClose={() => this.setState({ menuIsOpen: false })}
						>
							<PersistentDrawerContent>
								<MenuItem
									label="Get Started"
									url={`${process.env.PUBLIC_URL}`}
								/>
								<SubmenuWithMenuItems
									label="Buttons"
									sectionKeys={['buttons', 'fabs', 'icon-toggles']}
								/>

								{['cards', 'dialogs'].map(v => (
									<MenuItemForSection key={v} sectionKey={v} />
								))}

								<SubmenuWithMenuItems
									label="Drawers"
									sectionKeys={[
										'permanent-drawer',
										'persistent-drawer',
										'temporary-drawer'
									]}
								/>

								{['elevation', 'grid-lists'].map(v => (
									<MenuItemForSection key={v} sectionKey={v} />
								))}

								<SubmenuWithMenuItems
									label="Inputs and Controls"
									sectionKeys={[
										'checkboxes',
										'form-fields',
										'radio-buttons',
										'select-menus',
										'sliders',
										'switches',
										'textfields'
									]}
								/>

								{[
									'layout-grids',
									'linear-progress',
									'lists',
									'menus',
									'ripples',
									'snackbars',
									'tabs',
									'theme',
									'toolbars',
									'typography'
								].map(v => <MenuItemForSection key={v} sectionKey={v} />)}
							</PersistentDrawerContent>
						</PersistentDrawer>
						<main>
							<Switch>
								<Route
									path={`${process.env.PUBLIC_URL || '/'}`}
									exact
									component={Home}
								/>
								<Route
									path={`${process.env.PUBLIC_URL}/:section`}
									component={Detail}
								/>
							</Switch>
						</main>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
