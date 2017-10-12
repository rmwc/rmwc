import React from 'react';
import content from '../content';
import {
	Toolbar,
	ToolbarRow,
	ToolbarTitle,
	ToolbarFixedAdjust,
	PersistentDrawer,
	PersistentDrawerContent,
	ListItem,
	ListItemText,
	IconButton
} from '../../src/';

import Detail from './detail.component';

export class App extends React.Component {
	state = {
		section: content[0],
		menuIsOpen: true
	};

	render() {
		return (
			<div>
				<Toolbar fixed waterfall>
					<ToolbarRow>
						<IconButton
							style={{ color: 'inherit' }}
							onClick={evt =>
								this.setState({ menuIsOpen: !this.state.menuIsOpen })}
						>
							menu
						</IconButton>
						<ToolbarTitle>ReactMDC</ToolbarTitle>
					</ToolbarRow>
				</Toolbar>
				<ToolbarFixedAdjust />
				<div className="demo-content">
					<PersistentDrawer
						open={this.state.menuIsOpen}
						onClose={() => this.setState({ menuIsOpen: false })}
					>
						<PersistentDrawerContent>
							{content.map((section, i) => (
								<ListItem
									key={i}
									onClick={evt => this.setState({ section: section })}
								>
									<ListItemText>{section.name}</ListItemText>
								</ListItem>
							))}
						</PersistentDrawerContent>
					</PersistentDrawer>
					<main>
						{this.state.section && <Detail section={this.state.section} />}
					</main>
				</div>
			</div>
		);
	}
}

export default App;
