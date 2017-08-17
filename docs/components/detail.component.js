import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import buildJSXWithContext from 'docs/common/build-jsx-with-context';
import * as rmdc from 'rmdc';

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
	ListDivider
} = rmdc;

const cleanExampleCode = (codeString = '') => {
	const parts = codeString.split('\n').slice(1, -1) || [];
	const tabsCount = (parts[0] || '').search(/(?!\t)/);
	let processVal;

	if (tabsCount > 0) {
		const regex = new RegExp((new Array(tabsCount)).fill('\t').join(''));
		processVal = val => val.replace(regex, '');
	} else {
		processVal = val => val;
	}

	return parts.map(processVal).join('\n');
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
				props: component.propTypes
			};
		});

		const example = buildJSXWithContext(section.example, this, {...rmdc});
		const exampleCodePreview = cleanExampleCode(section.example);

		return (
			<Grid>
				<GridCell span="12">
					<Typography display1>{section.name}</Typography>
					<Typography subheading2>
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
									{def.props && Object.keys(def.props).map((propName, i) => (
										<ListItem key={i}>
											<ListItemText>
												{ propName }
											</ListItemText>
										</ListItem>
									))}
									{i !== componentDefs.length - 1 && <ListDivider />}
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