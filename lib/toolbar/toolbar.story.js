import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Toolbar, ToolbarRow, ToolbarTitle, ToolbarSection, ToolbarFixedAdjust } from './toolbar';

storiesOf('Toolbars', module)
	.add('Toolbar', () => {
		const isFixed = boolean('fixed', false)
		return (
			<div style={{margin: '-24px'}}>
				<Toolbar
					fixed={isFixed}
					waterfall={boolean('waterfall', false)}
					flexible={boolean('flexible', false)}
					fixedLastRowOnly={boolean('fixedLastRowOnly', false)}
				>
					<ToolbarRow>
						<ToolbarTitle>Toolbar</ToolbarTitle>
					</ToolbarRow>
				</Toolbar>
				{isFixed &&
					<ToolbarFixedAdjust />
				}
				<div style={{height: '100vh', padding: '24px'}}>
					Scrollbable Content
				</div>
			</div>
		)}
	)
	.add('Toolbar - Multirow', () => {
		const isFixed = boolean('fixed', false)
		return (
			<div style={{margin: '-24px'}}>
				<Toolbar
					fixed={isFixed}
					waterfall={boolean('waterfall', false)}
					flexible={boolean('flexible', false)}
					fixedLastRowOnly={boolean('fixedLastRowOnly', false)}
				>
					<ToolbarRow>
						<ToolbarTitle>Toolbar</ToolbarTitle>
					</ToolbarRow>
					<ToolbarRow>
						<ToolbarTitle>Row 2</ToolbarTitle>
					</ToolbarRow>
					<ToolbarRow>
						<ToolbarTitle>Row 3</ToolbarTitle>
					</ToolbarRow>
				</Toolbar>
				{isFixed &&
					<div>
						<div><ToolbarFixedAdjust /></div>
						<div><ToolbarFixedAdjust /></div>
						<div><ToolbarFixedAdjust /></div>
					</div>
				}
				<div style={{height: '100vh', padding: '24px'}}>
					Scrollbable Content
				</div>
			</div>
		)}
	)
