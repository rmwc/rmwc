import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MDCSnackbar } from '@material/snackbar';
import MDCComponentBase from '../_base/mdc-component-base';
import simpleComponentFactory from '../_base/simple-component-factory';
import Button from '../button/button';

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
		alignStart: undefined,
		'aria-live': 'assertive',
		'aria-atomic': true,
		'aria-hidden': true
	},
	consumeProps: [
		'alignStart'
	]
});

export const SnackbarText = simpleComponentFactory('SnackbarText', {
	classNames: 'mdc-snackbar__text'
});

export const SnackbarActionWrapper = simpleComponentFactory('SnackbarActionWrapper', {
	classNames: 'mdc-snackbar__action-wrapper'
});

export const SnackbarActionButton = simpleComponentFactory('SnackbarActionButton', {
	tag: Button,
	classNames: 'mdc-snackbar__action-button'
});

export class Snackbar extends MDCComponentBase {
	static MDCComponentClass = MDCSnackbar;

	static propTypes = {
		...MDCComponentBase.propTypes,
		...SnackbarRoot.propTypes,
		show: PropTypes.bool,
		onClose: PropTypes.func,
		message: PropTypes.any,
		timeout: PropTypes.number,
		actionHandler: PropTypes.func,
		actionText: PropTypes.any,
		multiline: PropTypes.bool,
		actionOnBottom: PropTypes.bool,
		dismissesOnAction: PropTypes.bool
	}

	static defaultProps = {
		...MDCComponentBase.defaultProps,
		...SnackbarRoot.defaultProps,
		show: false,
		onClose: () => {},
		message: undefined,
		timeout: undefined,
		actionHandler: undefined,
		actionText: undefined,
		multiline: false,
		actionOnBottom: false,
		dismissesOnAction: true
	}

	MDCComponentDidMount() {
		// this.MDCRegisterListener('MDCTabBar:change', evt => {
		// 	evt.target.value = this.MDCApi.activeTabIndex;
		// 	this.props.onChange(evt);
		// });
	}

	MDCHandleProps(nextProps) {
		const { message, timeout, actionHandler, actionText, multiline, actionOnBottom, onClose, dismissesOnAction } = this.props;

		this.MDCApi.dismissesOnAction = dismissesOnAction;

		if (nextProps.show !== this.props.show && nextProps.show) {
			const timer = setTimeout(() => onClose(), timeout || 2750);
			const wrappedActionHandler = actionHandler && this.MDCApi.dismissesOnAction
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
	}

	render() {
		const { show,
			message,
			timeout,
			actionHandler,
			actionText,
			multiline,
			actionOnBottom,
			apiRef,
			dismissesOnAction,
			onClose,
			...rest } = this.props;

		/**
		 * The double SnackbarText below is a hack to allow for rendering JSX
		 * The real message gets rendered in the hidden container, and the second one is
		 * ignored and shows th rendered content :)
		 */
		return (
			<SnackbarRoot elementRef={el => this.MDCSetRootElement(el)} { ...rest }>
				<SnackbarText style={{display: 'none'}}/>
				<SnackbarText>{ message }</SnackbarText>
				<SnackbarActionWrapper>
					<SnackbarActionButton />
				</SnackbarActionWrapper>
			</SnackbarRoot>
		);
	}
}

export default Snackbar;