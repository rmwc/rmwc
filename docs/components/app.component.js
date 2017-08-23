import React from 'react';
import content from '../content';
import {
	Toolbar,
	ToolbarRow,
	ToolbarTitle,
	ToolbarSection,
	ToolbarFixedAdjust,
	PermanentDrawer,
	PermanentDrawerContent,
	PersistentDrawer,
	PersistentDrawerHeaderContent,
	PersistentDrawerHeader,
	PersistentDrawerContent,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Icon
} from 'rmdc';

import Detail from './detail.component';

export class App extends React.Component {
	state = {
		section: content[0],
		menuIsOpen: false
	}

	render() {
		const nav = (
			<List>
				{content.map((section, i) => (
					<ListItem ripple key={i} onClick={evt => this.setState({section: section})}>
						<ListItemText>{ section.name }</ListItemText>
					</ListItem>
				))}
			</List>
		);

		return (
			<div>
				<Toolbar fixed waterfall>
					<ToolbarRow>
						<IconButton onClick={evt => this.setState({menuIsOpen: !this.state.menuIsOpen})}><Icon>menu</Icon></IconButton>
						<ToolbarTitle>ReactMDC</ToolbarTitle>
					</ToolbarRow>
				</Toolbar>
				<ToolbarFixedAdjust/>
				<div className="demo-content">
					<PersistentDrawer open={this.state.menuIsOpen}>
						<PersistentDrawerContent>
							{ nav }
						</PersistentDrawerContent>
					</PersistentDrawer>
					<main>
						{this.state.section &&
							<Detail section={this.state.section}></Detail>
						}
					</main>
				</div>
			</div>
		);
	}
};

export default App;