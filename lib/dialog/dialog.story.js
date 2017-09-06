import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Dialog, DialogRoot, DialogSurface, DialogHeader, DialogHeaderTitle, DialogBody, DialogFooter, DialogFooterButton, DialogBackdrop } from './dialog';
import { storyWithState } from '../_base/story-with-state';

const DialogStory = storyWithState(
	state => ({
		open: boolean('open', state.open !== undefined ? state.open : true),
		title: text('title', state.title || 'This is a simple dialog'),
		body: text('body', state.body || 'You can pass the body prop, or anything you want as children.')
	}),
	function(){
		return (
			<Dialog
			title={this.state.title}
			body={this.state.body}
			open={this.state.open}
			onClose={evt => {
				this.setState({open: false})
				action('onClose')()
			}}
			onAccept={action('onAccept')}
			onCancel={action('onCancel')}
		/>
		)
	}
)


const CustomDialogStory = storyWithState(
	state => ({
		open: boolean('open', state.open !== undefined ? state.open : true),
	}),
	function(){
		return (
			<Dialog
			open={this.state.open}
			onClose={evt => {
				this.setState({open: false})
				action('onClose')()
			}}
		>
			<DialogRoot>
				<DialogSurface>
						<DialogHeader>
							<DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
						</DialogHeader>
						<DialogBody>This is a custom dialog.</DialogBody>
						<DialogFooter>
								<DialogFooterButton cancel>Cancel</DialogFooterButton>
								<DialogFooterButton accept>Sweet!</DialogFooterButton>
						</DialogFooter>
				</DialogSurface>
				<DialogBackdrop />
			</DialogRoot>
		</Dialog>
		)
	}
)


storiesOf('Dialogs', module)
	.add('Dialog', () => <DialogStory />)
	.add('Custom Dialog', () => <CustomDialogStory />)
