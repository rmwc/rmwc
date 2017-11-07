import React from 'react';
import { GridCell, Typography } from '../../src';

export const Header = ({ title, description, link }) => (
	<GridCell span="12" className="header">
		<Typography use="display1" tag="h2">
			{title}
		</Typography>
		{description && (
			<Typography use="subheading2" tag="div">
				{description}
			</Typography>
		)}
		{link && (
			<Typography use="body1">
				<a href={link}>{link}</a>
			</Typography>
		)}
	</GridCell>
);

export default Header;
