import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco as codeStyle } from 'react-syntax-highlighter/dist/styles';
import * as rmwc from '../../src';
import Header from './header';

const { Grid, GridCell, Typography } = rmwc;

export const Home = props => (
	<Grid>
		<Header
			title="RMWC"
			description="A thin React wrapper for Material Design (Web) Components"
		/>
		<GridCell span="12">
			<Typography use="headline">Installation</Typography>
			<ul>
				<li>npm install rmwc --save</li>
				<li>
					material-web-components should be installed automatically as a peer
					dependency. Include
					node_modules/material-components-web/dist/material-components-web.css
					in your webpage via your method of choice.
				</li>
			</ul>
		</GridCell>
		<GridCell span="12">
			<Typography use="headline">Quick Start</Typography>
			<SyntaxHighlighter style={codeStyle}>
				{`import React from 'react';
import { Button } from 'rmwc';

const HelloWorld = props => <Button>Easy</Button>`}
			</SyntaxHighlighter>
		</GridCell>
		<GridCell span="12">
			<Typography use="headline">Project Methodology</Typography>
			<ul>
				<li>
					To create the thinnest, lightest, and spec compliant wrapper around{' '}
					<a href="https://material.io/components/web/">
						Google Material Design Components for the Web
					</a>
				</li>
				<li>
					To utilize the Foundation javascript classes and expose their api for
					consumption
				</li>
				<li>To be as unobtrusive and sensible as possible.</li>
			</ul>
		</GridCell>
	</Grid>
);
export default Home;
