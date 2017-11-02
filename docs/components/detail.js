import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import buildJSXWithContext from '../common/build-jsx-with-context';
import Header from './header';
import * as rmwc from '../../';
import {
	DialogRoot,
	DialogSurface,
	DialogHeader,
	DialogHeaderTitle,
	DialogBody,
	DialogFooter,
	DialogFooterButton,
	DialogBackdrop
} from '../../Dialog';
import content from '../content';

const {
	Grid,
	GridCell,
	Typography,
	Card,
	List,
	ListGroup,
	ListGroupSubheader
} = rmwc;

const cleanExampleCode = (codeString = '') => {
	const parts = codeString.split('\n').slice(1, -1) || [];
	const tabsCount = (parts[0] || '').search(/(?!\t)/);
	const regex = new RegExp('\t'.repeat(tabsCount < 0 ? 0 : tabsCount));
	return parts.map(val => val.replace(regex, '')).join('\n');
};

export class Detail extends React.Component {
	state = {};

	render() {
		const section = content.find(
			c => c.section === this.props.match.params.section
		);

		const componentClasses = !Array.isArray(section.class)
			? [section.class]
			: section.class;
		const componentDefs = componentClasses.map(componentName => {
			const component = rmwc[componentName];

			return {
				name: componentName,
				component: component,
				propTypes: component.propTypes,
				defaultProps: component.defaultProps,
				propMeta: Object.entries(
					component.propMeta || {}
				).reduce((acc, [key, val]) => {
					acc[key] = {
						...val,
						type: !Array.isArray(val.type) ? [val.type] : val.type
					};
					return acc;
				}, {})
			};
		});

		const example = buildJSXWithContext(section.example, this, {
			DialogRoot,
			DialogSurface,
			DialogHeader,
			DialogHeaderTitle,
			DialogBody,
			DialogFooter,
			DialogFooterButton,
			DialogBackdrop,
			...rmwc
		});
		const exampleCodePreview = cleanExampleCode(section.example);

		return (
			<Grid
				id={'detail-section-' + section.name.toLowerCase().replace(' ', '-')}
			>
				<Header title={section.name} link={section.url} />

				<GridCell span="12">
					<div className="demo-example">
						<div className="demo-example-inner">{example}</div>

						<SyntaxHighlighter language="xml" style={codeStyle}>
							{exampleCodePreview}
						</SyntaxHighlighter>
					</div>
				</GridCell>

				<GridCell span="12">
					<Card>
						<List>
							{componentDefs.map((def, i) => (
								<ListGroup key={i}>
									<ListGroupSubheader>{def.name} Props</ListGroupSubheader>
									<table>
										<thead>
											<tr>
												<th>Prop</th>
												<th>Type</th>
												<th>Default</th>
												<th>Description</th>
											</tr>
										</thead>
										<tbody>
											{def.propTypes &&
												Object.keys(def.propTypes).map((propName, i) => (
													<tr key={i}>
														<td>{propName}</td>
														<td>
															{!!def.propMeta[propName] &&
																def.propMeta[propName].type.join(' | ')}
														</td>
														<td>{def.defaultProps[propName] + ''}</td>
														<td>
															{!!def.propMeta[propName] &&
																def.propMeta[propName].desc}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</ListGroup>
							))}
						</List>
					</Card>
				</GridCell>
			</Grid>
		);
	}
}

export default Detail;
