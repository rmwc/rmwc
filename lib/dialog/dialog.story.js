import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Dialog, DialogRoot, DialogSurface, DialogHeader, DialogHeaderTitle, DialogBody, DialogFooter, DialogFooterButton, DialogBackdrop } from './dialog';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Dialogs', module)
	.add('Dialog', () => (
		<Dialog
			title="This is a simple dialog"
			body="You can pass the body prop, or anything you want as children."
			open={boolean('open', true)}
			onClose={action('onClose')}
			onAccept={action('onAccept')}
			onCancel={action('onCancel')}
		/>
		)
	)
	.add('Custom Dialog', () => (
		<Dialog
			open={boolean('open', true)}
			onClose={action('onClose')}
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
	))
