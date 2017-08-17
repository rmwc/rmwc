import React from 'react';
import content from '../content';
import {
	Toolbar,
	ToolbarRow,
	ToolbarTitle,
	Drawer,
	List,
	ListItem,
	ListItemText
} from 'rmdc';

import Detail from './detail.component';

export class App extends React.Component {
	state = {
		section: content[0]
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
				<Toolbar>
					<ToolbarRow>
						<ToolbarTitle>RMDC</ToolbarTitle>
					</ToolbarRow>
				</Toolbar>
				<div className="demo-content">
					<Drawer>
						{ nav }
					</Drawer>
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