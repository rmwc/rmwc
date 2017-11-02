import React from 'react';
import { mount } from 'enzyme';
import { Snackbar } from './';

// <Snackbar
// show={this.state.snackbarIsOpen}
// onClose={evt => this.setState({snackbarIsOpen: false})}
// message="This is a new message"
// actionText="Action"
// actionHandler={() => alert('Action clicked')}
// />

// <Button
// primary
// onClick={evt => this.setState({snackbarStartIsOpen: !this.state.snackbarStartIsOpen})}
// >
// Show start-aligned
// </Button>

// <Snackbar
// show={this.state.snackbarStartIsOpen}
// onClose={evt => this.setState({snackbarStartIsOpen: false})}
// message="Start aligned"
// actionText="Dismiss"
// actionHandler={() => {}}
// alignStart
// />

describe('Snackbar', () => {
	it('renders', () => {
		const el = mount(
			<Snackbar
				show={true}
				onClose={evt => {}}
				message="This is a new message"
				actionText="Action"
				actionHandler={() => alert('Action clicked')}
			/>
		);
		expect(!!~el.html().search('mdc-snackbar')).toBe(true);
	});

	it('can be alignStart', () => {
		const el = mount(
			<Snackbar
				show={true}
				onClose={evt => {}}
				message="This is a new message"
				actionText="Action"
				actionHandler={() => alert('Action clicked')}
				alignStart
			/>
		);
		expect(!!~el.html().search('mdc-snackbar--align-start')).toBe(true);
	});
});
