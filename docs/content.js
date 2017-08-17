export default [
	{
		name: 'Button',
		class: 'Button',
		url: 'https://material.io/components/web/catalog/buttons/',
		example: `
			<Button>Default</Button>
			<Button primary>Primary</Button>
			<Button accent>Accent</Button>
			<Button raised>Raised</Button>
			<Button dense>Dense</Button>
			<Button compact>Compact</Button>
		`
	},
	{
		name: 'Fabs',
		class: 'Fab',
		url: 'https://material.io/components/web/catalog/buttons/floating-action-buttons/',
		example: `
			<Fab>favorite</Fab>
			<Fab mini>favorite</Fab>
			<Fab plain>favorite</Fab>
			<Fab mini plain>favorite</Fab>
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
			<Select
				placeholder="Select a food"
				options={{1: 'Cookies', 2: 'Pizza', 3: 'Icecream'}}
			/>
		`
	},
	{
		name: 'Sliders',
		class: 'Slider',
		url: 'https://material.io/components/web/catalog/input-controls/sliders/',
		example: `
			<Slider
				value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
				onChange={evt => this.setState({sliderValue: evt.target.value})}
			/>

			<Slider
				value={this.state.sliderValue2 === undefined ? 50 : this.state.sliderValue2}
				onChange={evt => this.setState({sliderValue2: evt.target.value})}
				discrete
				step={5}
			/>

			<Slider
				value={this.state.sliderValue3 === undefined ? 50 : this.state.sliderValue3}
				onChange={evt => this.setState({sliderValue3: evt.target.value})}
				discrete
				displayMarkers
				step={5}
			/>

			<Textfield
				value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
				onChange={evt => this.setState({sliderValue: evt.target.value})}
			/>
		`
	},
	{
		name: 'Switches',
		class: 'Switch',
		url: 'https://material.io/components/web/catalog/input-controls/switches/',
		example: `
			<Switch>Cookies</Switch> <br/><br/>
			<Switch>Pizza</Switch> <br/><br/>
			<Switch>Icecream</Switch> <br/><br/>
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
				<Button
					raised
					primary
					onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
				>
					Open Menu
				</Button>

				<Menu
					open={this.state.menuIsOpen}
					onChange={evt => this.setState({'menuIsOpen': evt.target.value})}
				>
					<MenuItem>Cookies</MenuItem>
					<MenuItem>Pizza</MenuItem>
					<MenuItem>Icecream</MenuItem>
				</Menu>
			</MenuAnchor>
		`
	},
	{
		name: 'Tabs',
		class: ['TabBar', 'Tab'],
		url: 'https://material.io/components/web/catalog/tabs/',
		example: `
			<TabBar
				activeTabIndex={this.state.activeTabIndex || 0}
				onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
			>
				<Tab>Cookies</Tab>
				<Tab>Pizza</Tab>
				<Tab>Icecream</Tab>
			</TabBar>
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