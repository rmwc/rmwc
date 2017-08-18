import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

const ToolbarSectionBase = simpleComponentFactory('ToolbarSectionBase', 'section');

export class ToolbarSection extends React.Component {
	static propTypes = {
		...ToolbarSectionBase.propTypes,
		alignStart: PropTypes.bool,
		alignEnd: PropTypes.bool,
		shrinkToFit: PropTypes.bool
	}

	static defaultProps = {
		...ToolbarSectionBase.defaultProps,
		alignStart: false,
		alignEnd: false,
		shrinkToFit: false
	}

	render() {
		const { className, children, alignStart, alignEnd, shrinkToFit, ...rest } = this.props;
		const classes = classNames(
			'mdc-toolbar__section',
			className,
			{
				'mdc-toolbar__section--align-start': alignStart,
				'mdc-toolbar__section--align-end': alignEnd,
				'mdc-toolbar__section--shrink-to-fit': shrinkToFit
			}
		);
		return (
			<ToolbarSectionBase className={classes} {...rest}>
				{children}
			</ToolbarSectionBase>
		);
	}
}

export default ToolbarSection;