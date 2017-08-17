import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class ToolbarSection extends React.Component {
	static propTypes = {
		alignStart: PropTypes.bool,
		alignEnd: PropTypes.bool,
		shrinkToFit: PropTypes.bool
	}

	static defaultProps = {
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
			<section className={classes} {...rest}>
				{children}
			</section>
		);
	}
}

export default ToolbarSection;