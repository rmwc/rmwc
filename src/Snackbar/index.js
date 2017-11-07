import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';
import { propMeta } from '../Base/prop-meta';
import { noop } from '../Base/noop';
import MDCComponentBase from '../Base/mdc-component-base';
import simpleComponentFactory from '../Base/simple-component-factory';
import Button from '../Button';

export const SnackbarRoot = simpleComponentFactory('SnackbarRoot', {
	classNames: props => [
		'mdc-snackbar',
		{
			'mdc-snackbar--align-start': props.alignStart
		}
	],
	propTypes: {
		alignStart: PropTypes.bool
	},
	defaultProps: {
		alignStart: false,
		'aria-live': 'assertive',
		'aria-atomic': true,
		'aria-hidden': true
	},
	propMeta: {
		alignStart: {
			type: 'Boolean',
			desc: 'Aligns the Snackbar to the start of the screen.'
		}
	},
	consumeProps: ['alignStart']
});

export const SnackbarText = simpleComponentFactory('SnackbarText', {
	classNames: 'mdc-snackbar__text'
});

export const SnackbarActionWrapper = simpleComponentFactory(
	'SnackbarActionWrapper',
	{
		classNames: 'mdc-snackbar__action-wrapper'
	}
);

export const SnackbarActionButton = simpleComponentFactory(
	'SnackbarActionButton',
	{
		tag: Button,
		classNames: 'mdc-snackbar__action-button'
	}
);

export class Snackbar extends MDCComponentBase {
	static MDCComponentClass = MDCSnackbar;

	static propTypes = {
		show: PropTypes.bool,
		onClose: PropTypes.func,
		message: PropTypes.any,
		timeout: PropTypes.number,
		actionHandler: PropTypes.func,
		actionText: PropTypes.any,
		multiline: PropTypes.bool,
		actionOnBottom: PropTypes.bool,
		dismissesOnAction: PropTypes.bool,
		...SnackbarRoot.propTypes,
		...MDCComponentBase.propTypes
	};

	static defaultProps = {
		show: false,
		onClose: noop,
		message: undefined,
		timeout: undefined,
		actionHandler: undefined,
		actionText: undefined,
		multiline: false,
		actionOnBottom: false,
		dismissesOnAction: true,
		...SnackbarRoot.defaultProps,
		...MDCComponentBase.defaultProps
	};

	static propMeta = propMeta({
		show: {
			type: 'Boolean',
			desc: 'Show the Snackbar.'
		},
		onClose: {
			type: 'Function',
			desc: 'A callback thats fired when the Snackbar closes.'
		},
		message: {
			type: ['String', 'Element'],
			desc: 'A string or other renderable JSX to be used as the message body.'
		},
		timeout: {
			type: 'Number',
			desc: 'Milliseconds to show the Snackbar for.'
		},
		actionHandler: {
			type: 'Function',
			desc:
				'Callback that fires when action is pressed. The actionText property must be set to use this.'
		},
		actionText: {
			type: 'String',
			desc: 'Label for the action button.'
		},
		multiline: {
			type: 'Boolean',
			desc: 'Lets the Snackbar text overflow onto multiple lines.'
		},
		actionOnBottom: {
			type: 'Boolean',
			desc: 'Places the action underneath the message text.'
		},
		dismissesOnAction: {
			type: 'Boolean',
			desc: 'Whether or not the Snackbar dismisses on the action press.'
		},
		...MDCComponentBase.propMeta,
		...SnackbarRoot.propMeta
	});

	MDCHandleProps(nextProps, isInitialMount) {
		const { show, dismissesOnAction } = nextProps;
		this.MDCApi.dismissesOnAction = dismissesOnAction;

		if ((show !== this.props.show || isInitialMount) && show) {
			this.show(nextProps);
		}
	}

	show(nextProps) {
		const {
			message,
			timeout,
			actionHandler,
			actionText,
			multiline,
			actionOnBottom,
			onClose
		} = nextProps;
		const timer = setTimeout(() => onClose(), timeout || 2750);
		const wrappedActionHandler =
			actionHandler && this.MDCApi.dismissesOnAction
				? () => {
						actionHandler();
						clearTimeout(timer);
						onClose();
					}
				: actionHandler;

		this.MDCApi.show({
			message,
			timeout,
			actionHandler: wrappedActionHandler,
			actionText,
			multiline,
			actionOnBottom
		});
	}

	render() {
		const {
			show,
			message,
			timeout,
			actionHandler,
			actionText,
			multiline,
			actionOnBottom,
			apiRef,
			dismissesOnAction,
			onClose,
			...rest
		} = this.props;

		const isJSX = typeof message === 'object';
		const snackbarTextStyle = {};
		if (isJSX) {
			snackbarTextStyle.display = 'none';
		}

		/**
		 * The double SnackbarText below is a hack to allow for rendering JSX
		 * The real message gets rendered in the hidden container, and the second one is
		 * ignored and shows th rendered content :)
		 */
		return (
			<SnackbarRoot elementRef={el => this.MDCSetRootElement(el)} {...rest}>
				<SnackbarText style={snackbarTextStyle} />
				{isJSX && <SnackbarText>{message}</SnackbarText>}
				<SnackbarActionWrapper>
					<SnackbarActionButton />
				</SnackbarActionWrapper>
			</SnackbarRoot>
		);
	}
}

export default Snackbar;
