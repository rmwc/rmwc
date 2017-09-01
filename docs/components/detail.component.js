import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import buildJSXWithContext from 'docs/common/build-jsx-with-context';
import * as rmdc from 'rmdc';
import * as rmdcElements from 'rmdc/elements';

const {
	Grid,
	GridCell,
	Typography,
	Card,
	List,
	ListGroup,
	ListGroupSubheader,
	ListItem,
	ListItemText,
	ListItemTextSecondary,
	ListDivider
} = rmdc;

const cleanExampleCode = (codeString = '') => {
	const parts = codeString.split('\n').slice(1, -1) || [];
	const tabsCount = (parts[0] || '').search(/(?!\t)/);
	const regex = new RegExp('\t'.repeat(tabsCount < 0 ? 0 : tabsCount));
	return parts.map(val => val.replace(regex, '')).join('\n');
};

export class Detail extends React.Component {
	state = {}

	render() {
		const { section } = this.props;
		const componentClasses = !Array.isArray(section.class) ? [section.class] : section.class;
		const componentDefs = componentClasses.map(componentName => {
			const component = rmdc[componentName];

			return {
				name: componentName,
				component: component,
				propTypes: component.propTypes,
				defaultProps: component.defaultProps,
				propMeta: Object.entries(component.propMeta || {}).reduce((acc, [key, val]) => {

					acc[key] = {
						...val,
						type: !Array.isArray(val.type) ? [val.type] : val.type
					};
					return acc;
				}, {})
			};
		});

		const example = buildJSXWithContext(section.example, this, {...rmdc, ...rmdcElements});
		const exampleCodePreview = cleanExampleCode(section.example);

		return (
			<Grid id={'detail-section-' + section.name.toLowerCase().replace(' ', '-')}>
				<GridCell span="12">
					<Typography kind="display1" tag="h2">{section.name}</Typography>
					<Typography kind="subheading2" tag="h3" wrap>
						<a href={section.url}>{section.url}</a>
					</Typography>
				</GridCell>

				<GridCell span="12">
					<div className="demo-example">
						<div className="demo-example-inner">
							{ example }
						</div>

						<SyntaxHighlighter
							language='xml'
							style={codeStyle}
						>
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
											{def.propTypes && Object.keys(def.propTypes).map((propName, i) => (
												<tr key={i}>
													<td>{ propName }</td>
													<td>{ !!def.propMeta[propName] && def.propMeta[propName].type.join(' | ') }</td>
													<td>{ def.defaultProps[propName] + '' }</td>
													<td>{ !!def.propMeta[propName] && def.propMeta[propName].desc }</td>
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