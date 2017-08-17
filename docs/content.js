export default [
	{
		name: 'Button',
		class: 'Button',
		url: 'https://material.io/components/web/catalog/buttons/',
		example: `
			<Button>Button</Button>
			<Button primary>Button</Button>
			<Button accent primary>Button</Button>
			<Button raised>Button</Button>
		`
	},
	{
		name: 'Icon Toggle Buttons',
		class: 'IconToggle',
		url: 'https://material.io/components/web/catalog/buttons/icon-toggle-buttons/',
		example: `
			<IconToggle
				toggleOn={{label: 'Remove from favorites', content: 'favorite'}}
				toggleOff={{label: 'Add to favorites', content: 'favorite_border'}}
			/>
		`
	},
	{
		name: 'Cards',
		class: 'Card',
		url: 'https://material.io/components/web/catalog/cards/'
	},
	{
		name: 'Checkboxes',
		class: 'Checkbox',
		url: 'https://material.io/components/web/catalog/cards/',
		example: `
			<Checkbox>Cookies</Checkbox>
			<Checkbox>Pizza</Checkbox>
			<Checkbox>Icecream</Checkbox>
		`
	},
	{
		name: 'Form Fields',
		class: 'FormField',
		url: 'https://material.io/components/web/catalog/input-controls/form-fields/',
		example: `
			<FormField>
				<Textfield placeholder="Wrapped Textfield"/>
			</FormField>
		`
	},
	{
		name: 'Radio Buttons',
		class: 'Radio',
		url: 'https://material.io/components/web/catalog/input-controls/radio-buttons/',
		example: `
			<Radio name="radio">Cookies</Radio>
			<Radio name="radio">Pizza</Radio>
			<Radio name="radio">Icecream</Radio>
		`
	},
	{
		name: 'Select Menus',
		class: 'Select',
		url: 'https://material.io/components/web/catalog/input-controls/select-menus/',
		example: `
			<Select placeholder="Select a food" options={{1: 'Cookies', 2: 'Pizza', 3: 'Icecream'}}></Select>
		`
	},
	{
		name: 'Switches',
		class: 'Switch',
		url: 'https://material.io/components/web/catalog/input-controls/switches/',
		example: `
			<div><Switch>Cookies</Switch></div><br/>
			<div><Switch>Pizza</Switch></div><br/>
			<div><Switch>Icecream</Switch></div><br/>
		`
	},
	{
		name: 'Text Fields',
		class: 'Textfield',
		url: 'https://material.io/components/web/catalog/input-controls/text-fields/',
		example: `
				<Textfield label="Write something..." /> <br/>
				<Textfield label="Multiline..." rows="8" />
		`
	},
	{
		name: 'Layout Grids',
		class: ['Grid', 'GridCell'],
		url: 'https://material.io/components/web/catalog/layout-grids/',
		example: `
				<Grid>
					<GridCell span="4">1</GridCell>
					<GridCell span="4">2</GridCell>
					<GridCell span="4">3</GridCell>
				</Grid>
		`
	},
	{
		name: 'Lists',
		class: ['List', 'ListItem', 'ListItemText', 'ListItemDetail', 'ListDivider', 'ListGroup', 'ListGroupSubheader'],
		url: 'https://material.io/components/web/catalog/layout-grids/',
		example: `
				<List>
					<ListItem ripple>
						<ListItemDetail>
							<Icon>star_border</Icon>
						</ListItemDetail>
						<ListItemText>Cookies</ListItemText>
						<ListItemDetail end>
							<Icon>info</Icon>
						</ListItemDetail>
					</ListItem>
					<ListItem ripple>
						<ListItemDetail>
							<Icon>favorite_border</Icon>
						</ListItemDetail>
						<ListItemText>Pizza</ListItemText>
						<ListItemDetail end>
							<Icon>info</Icon>
						</ListItemDetail>
					</ListItem>
					<ListItem ripple>
						<ListItemDetail>
							<Icon>mood</Icon>
						</ListItemDetail>
						<ListItemText>Icecream</ListItemText>
						<ListItemDetail end>
							<Icon>info</Icon>
						</ListItemDetail>
					</ListItem>
				</List>
		`
	},
	{
		name: 'Menus',
		class: ['Menu', 'MenuItem'],
		url: 'https://material.io/components/web/catalog/menus/',
		example: `
			<MenuAnchor>
				<Button raised primary onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}>Open Menu</Button>
				<Menu open={this.state.menuIsOpen} onChange={evt => this.setState({'menuIsOpen': evt.target.value})}>
					<MenuItem>Cookies</MenuItem>
					<MenuItem>Pizza</MenuItem>
					<MenuItem>Icecream</MenuItem>
				</Menu>
			</MenuAnchor>
		`
	},
	{
		name: 'Toolbars',
		class: ['Toolbar', 'ToolbarRow', 'ToolbarSection', 'ToolbarTitle', 'ToolbarFixedAdjust'],
		url: 'https://material.io/components/web/catalog/toolbar/',
		example: `
			<Toolbar>
				<ToolbarRow>
					<ToolbarTitle>Toolbar</ToolbarTitle>
				</ToolbarRow>
			</Toolbar>
		`
	}
];