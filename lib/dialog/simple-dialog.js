import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dialog from './dialog';
import DialogSurface from './dialog-surface';
import DialogHeader from './dialog-header';
import DialogHeaderTitle from './dialog-header-title';
import DialogBody from './dialog-body';
import DialogFooter from './dialog-footer';
import DialogFooterButton from './dialog-footer-button';
import DialogBackdrop from './dialog-backdrop';

export const SimpleDialog = props => {
	const { title, body, acceptLabel, cancelLabel, children, ...rest } = props;

	return (
		<Dialog {...rest}>
			<DialogSurface>
				{!!title &&
					<DialogHeader>
						<DialogHeaderTitle>{ title }</DialogHeaderTitle>
					</DialogHeader>
				}
				{(!!body || children) &&
					<DialogBody>{ body }{ children }</DialogBody>
				}

				{(!!cancelLabel || !!acceptLabel) &&
					<DialogFooter>
						{!!cancelLabel &&
							<DialogFooterButton cancel>Decline</DialogFooterButton>
						}
						{!!acceptLabel &&
							<DialogFooterButton accept>{acceptLabel}</DialogFooterButton>
						}
					</DialogFooter>
				}
			</DialogSurface>
			<DialogBackdrop />
		</Dialog>
	);
};

SimpleDialog.propTypes = {
	...Dialog.propTypes,
	title: PropTypes.any,
	body: PropTypes.any,
	acceptLabel: PropTypes.any,
	cancelLabel: PropTypes.any
};

SimpleDialog.defaultProps = {
	...Dialog.defaultProps,
	title: undefined,
	body: undefined,
	acceptLabel: 'Accept',
	cancelLabel: 'Cancel'
};

export default SimpleDialog;