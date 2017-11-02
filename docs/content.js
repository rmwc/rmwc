export default [
	{
		name: 'Buttons',
		section: 'buttons',
		class: 'Button',
		url: 'https://material.io/components/web/catalog/buttons/',
		example: `
			<Button>Default</Button>
			<Button raised>Raised</Button>
			<Button dense>Dense</Button>
			<Button compact>Compact</Button>
			<Button unelevated>Unelevated</Button>
			<Button stroked>Stroked</Button>
			<Button raised theme={['secondary-bg', 'text-primary-on-secondary']}>With Theme</Button>
			`
	},
	{
		name: 'Fabs',
		section: 'fabs',
		class: 'Fab',
		url:
			'https://material.io/components/web/catalog/buttons/floating-action-buttons/',
		example: `
			<Fab>favorite</Fab>
			<Fab mini>favorite</Fab>
		`
	},
	{
		name: 'Icon Toggles',
		section: 'icon-toggles',
		class: 'IconToggle',
		url:
			'https://material.io/components/web/catalog/buttons/icon-toggle-buttons/',
		example: `
			<IconToggle
				on={{label: 'Remove from favorites', content: 'favorite'}}
				off={{label: 'Add to favorites', content: 'favorite_border'}}
			/>
		`
	},
	{
		name: 'Cards',
		section: 'cards',
		class: 'Card',
		url: 'https://material.io/components/web/catalog/cards/',
		example: `
			<Card style={{width: '320px'}}>
				<CardMedia style={{
					backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
					height: '12.313rem'
				}}>
				</CardMedia>
				<CardPrimary>
					<CardTitle large>Card Title</CardTitle>
					<CardSubtitle>Subtitle here</CardSubtitle>
				</CardPrimary>
				<CardSupportingText>
				</CardSupportingText>
				<CardActions>
					<CardAction>Action 1</CardAction>
					<CardAction>Action 2</CardAction>
				</CardActions>
			</Card>
		`
	},
	{
		name: 'PermanentDrawer',
		section: 'permanent-drawer',
		class: ['PermanentDrawer', 'PermanentDrawerContent'],
		url:
			'https://material.io/components/web/catalog/drawers/#permanent-drawer-usage',
		example: `
			<PermanentDrawer>
				<PermanentDrawerContent>
					<List>
						<ListItem>
							<ListItemText>Cookies</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>Pizza</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>Icecream</ListItemText>
						</ListItem>
					</List>
				</PermanentDrawerContent>
			</PermanentDrawer>
		`
	},
	{
		name: 'PersistentDrawer',
		section: 'persistent-drawer',
		class: [
			'PersistentDrawer',
			'PersistentDrawerHeader',
			'PersistentDrawerContent'
		],
		url:
			'https://material.io/components/web/catalog/drawers/#persistent-drawer-usage',
		example: `
			<Button 
				onClick={() => this.setState({open: !this.state.open})}
				raised
			>
				Toggle Drawer
			</Button>

			<PersistentDrawer
				open={this.state.open}
				onClose={() => this.setState({open: false})}
			>
				<PersistentDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
					PersistentDrawerHeader
				</PersistentDrawerHeader>
				<PersistentDrawerContent>
					<ListItem>
						<ListItemText>Cookies</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>Pizza</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>Icecream</ListItemText>
					</ListItem>
				</PersistentDrawerContent>
			</PersistentDrawer>
		`
	},
	{
		name: 'TemporaryDrawer',
		section: 'temporary-drawer',
		class: [
			'TemporaryDrawer',
			'TemporaryDrawerHeader',
			'TemporaryDrawerContent'
		],
		url:
			'https://material.io/components/web/catalog/drawers/#temporary-drawer-usage',
		example: `
			<Button 
				onClick={() => this.setState({open: !this.state.open})}
				raised
			>
				Toggle Drawer
			</Button>

			<TemporaryDrawer
				open={this.state.open}
				onClose={() => this.setState({open: false})}
			>
				<TemporaryDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
					TemporaryDrawerHeader
				</TemporaryDrawerHeader>
				<TemporaryDrawerContent>
					<ListItem>
						<ListItemText>Cookies</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>Pizza</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>Icecream</ListItemText>
					</ListItem>
				</TemporaryDrawerContent>
			</TemporaryDrawer>
		`
	},
	{
		name: 'Dialogs',
		section: 'dialogs',
		class: ['Dialog'],
		url: 'https://material.io/components/web/catalog/dialogs/',
		example: `
			{/** Simple Dialogs for basic usage **/}
			<Dialog
				title="This is a simple dialog"
				body="You can pass the body prop, or anything you want as children."
				open={this.state.simpleDialogIsOpen}
				onClose={evt => this.setState({simpleDialogIsOpen: false})}
				onAccept={evt => console.log('Accepted')}
				onCancel={evt => console.log('Cancelled')}
			/>


			{/** Compose your own **/}
			<Dialog
				open={this.state.customDialogIsOpen}
				onClose={evt => this.setState({customDialogIsOpen: false})}
			>
				<DialogRoot>
					<DialogSurface>
							<DialogHeader>
								<DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
							</DialogHeader>
							<DialogBody>This is a custom dialog.</DialogBody>
							<DialogFooter>
									<DialogFooterButton cancel>Cancel</DialogFooterButton>
									<DialogFooterButton accept>Sweet!</DialogFooterButton>
							</DialogFooter>
					</DialogSurface>
					<DialogBackdrop />
				</DialogRoot>
			</Dialog>


			<Button
				raised
				onClick={evt => this.setState({simpleDialogIsOpen: true})}
			>
				Open Simple Dialog
			</Button>

			<Button
				onClick={evt => this.setState({customDialogIsOpen: true})}
			>
				Open Custom Dialog
			</Button>
		`
	},
	{
		name: 'Elevation',
		section: 'elevation',
		class: 'Elevation',
		url: 'https://material.io/components/web/catalog/elevation/',
		example: `
			{Array(25).fill().map((val, i) => (
				<Elevation
					z={i}
					key={i}
				>
					{i}dp
				</Elevation>
			))}

			<Elevation
				z={this.state.elevation || 0}
				transition
				onMouseOver={() => this.setState({elevation: 24})}
				onMouseOut={() => this.setState({elevation: 0})}
			>
				Hover Me {this.state.elevation || 0}dp
			</Elevation>
		`
	},
	{
		name: 'Grid Lists',
		section: 'grid-lists',
		class: [
			'GridList',
			'GridTile',
			'GridTilePrimary',
			'GridTilePrimaryContent',
			'GridTileSecondary',
			'GridTileTitle',
			'GridTileTitleSupportText'
		],
		url: 'https://material.io/components/web/catalog/grid-lists/',
		example: `
			<GridList
				tileGutter1={this.state.tileGutter1}
				headerCaption={this.state.headerCaption}
				twolineCaption={this.state.twolineCaption}
				withIconAlignStart={this.state.withIconAlignStart}
				tileAspect={this.state.tileAspect}
			>
					{Array(4).fill().map((val, i) => (
						<GridTile key={i}>
							<GridTilePrimary>
								<GridTilePrimaryContent wrap>
									<img src="https://material-components-web.appspot.com/images/1-1.jpg"/>
								</GridTilePrimaryContent>
							</GridTilePrimary>
							<GridTileSecondary>
								<GridTileTitle>Tile {i + 1}</GridTileTitle>
							</GridTileSecondary>
						</GridTile>
					))}
			</GridList>

			<Checkbox label="tileGutter1" onClick={() => this.setState({tileGutter1: !this.state.tileGutter1})}/>
			<Checkbox label="headerCaption" onClick={() => this.setState({headerCaption: !this.state.headerCaption})}/>
			<Checkbox label="twolineCaption" onClick={() => this.setState({twolineCaption: !this.state.twolineCaption})}/>
			<Checkbox label="withIconAlignStart" onClick={() => this.setState({withIconAlignStart: !this.state.withIconAlignStart})}/>
			
				<Select
					value={this.state.tileAspect || '1x1'}
					onChange={evt => this.setState({tileAspect: evt.target.value})}
					label="tileAspect"
					options={['1x1', '16x9', '2x3', '3x2', '4x3', '3x4']}
				/>
			
		`
	},
	{
		name: 'Checkboxes',
		section: 'checkboxes',
		class: 'Checkbox',
		url:
			'https://material.io/components/web/catalog/input-controls/checkboxes/',
		example: `
			<Checkbox>Cookies</Checkbox>
			<Checkbox>Pizza</Checkbox>
			<Checkbox>Icecream</Checkbox>
			<Checkbox indeterminate={true}>Broccoli</Checkbox>
		`
	},
	{
		name: 'Form Fields',
		section: 'form-fields',
		class: 'FormField',
		url:
			'https://material.io/components/web/catalog/input-controls/form-fields/',
		example: `
			<FormField>
				<Textfield placeholder="Wrapped Textfield"/>
			</FormField>
		`
	},
	{
		name: 'Radio Buttons',
		section: 'radio-buttons',
		class: 'Radio',
		url:
			'https://material.io/components/web/catalog/input-controls/radio-buttons/',
		example: `
			<Radio name="radio">Cookies</Radio>
			<Radio name="radio">Pizza</Radio>
			<Radio name="radio">Icecream</Radio>
		`
	},
	{
		name: 'Select Menus',
		section: 'select-menus',
		class: 'Select',
		url:
			'https://material.io/components/web/catalog/input-controls/select-menus/',
		example: `
			<Select
				placeholder="Select a food"
				options={{1: 'Cookies', 2: 'Pizza', 3: 'Icecream'}}
			/>
		`
	},
	{
		name: 'Sliders',
		section: 'sliders',
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
		section: 'switches',
		class: 'Switch',
		url: 'https://material.io/components/web/catalog/input-controls/switches/',
		example: `
			<Switch>Cookies</Switch>
			<Switch>Pizza</Switch>
			<Switch>Icecream</Switch>
		`
	},
	{
		name: 'Textfields',
		section: 'textfields',
		class: 'Textfield',
		url:
			'https://material.io/components/web/catalog/input-controls/text-fields/',
		example: `
				<Textfield label="Write something..." /> <br/>
				<Textfield textarea label="Multiline..." rows="8" />
		`
	},
	{
		name: 'Layout Grids',
		section: 'layout-grids',
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
		name: 'Linear Progress',
		section: 'linear-progress',
		class: 'LinearProgress',
		url: 'https://material.io/components/web/catalog/linear-progress/',
		example: `
			<LinearProgress progress={0.5}></LinearProgress>
			<LinearProgress progress={0.3} accent></LinearProgress>
			<LinearProgress progress={0.6} buffer={0.8}></LinearProgress>
			<LinearProgress determinate={false}></LinearProgress>
			<LinearProgress progress={0.2} reversed></LinearProgress>
		`
	},
	{
		name: 'Lists',
		section: 'lists',
		class: [
			'List',
			'ListItem',
			'ListItemText',
			'ListItemTextSecondary',
			'ListItemStartDetail',
			'ListItemEndDetail',
			'ListDivider',
			'ListGroup',
			'ListGroupSubheader'
		],
		url: 'https://material.io/components/web/catalog/layout-grids/',
		example: `
				<List>
					<ListItem ripple>
						<ListItemStartDetail>
							<Icon>star_border</Icon>
						</ListItemStartDetail>
						<ListItemText>Cookies</ListItemText>
						<ListItemEndDetail>
							<Icon>info</Icon>
						</ListItemEndDetail>
					</ListItem>

					<ListItem ripple>
						<ListItemStartDetail>
							<Icon>favorite_border</Icon>
						</ListItemStartDetail>
						<ListItemText>Pizza</ListItemText>
						<ListItemEndDetail>
							<Icon>info</Icon>
						</ListItemEndDetail>
					</ListItem>

					<ListItem ripple>
						<ListItemStartDetail>
							<Icon>mood</Icon>
						</ListItemStartDetail>
						<ListItemText>Icecream</ListItemText>
						<ListItemEndDetail>
							<Icon>info</Icon>
						</ListItemEndDetail>
					</ListItem>
				</List>
		`
	},
	{
		name: 'Menus',
		section: 'menus',
		class: ['Menu', 'MenuItem'],
		url: 'https://material.io/components/web/catalog/lists/',
		example: `
			<MenuAnchor>
				<Button
					raised
					onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
				>
					Open Menu
				</Button>

				<Menu
					open={this.state.menuIsOpen}
					onClose={evt => this.setState({menuIsOpen: false})}
				>
					<MenuItem>Cookies</MenuItem>
					<MenuItem>Pizza</MenuItem>
					<MenuItem>Icecream</MenuItem>
				</Menu>
			</MenuAnchor>
		`
	},
	{
		name: 'Ripples',
		section: 'ripples',
		class: ['Ripple'],
		url: 'https://material.io/components/web/catalog/ripples/',
		example: `
			<Ripple>
				<p>Standard Ripple</p>
			</Ripple>

			<Ripple primary>
				<p>Primary</p>
			</Ripple>

			<Ripple accent>
				<p>Accent</p>
			</Ripple>

			<Ripple unbounded>
				<p>Unbounded</p>
			</Ripple>
		`
	},
	{
		name: 'Snackbars',
		section: 'snackbars',
		class: ['Snackbar'],
		url: 'https://material.io/components/web/catalog/snackbars/',
		example: `
				<Button
					raised
					onClick={evt => this.setState({snackbarIsOpen: !this.state.snackbarIsOpen})}
				>
					Show snackbar
				</Button>

				<Snackbar
					show={this.state.snackbarIsOpen}
					onClose={evt => this.setState({snackbarIsOpen: false})}
					message="This is a new message"
					actionText="Action"
					actionHandler={() => alert('Action clicked')}
				/>

				<Button
					onClick={evt => this.setState({snackbarStartIsOpen: !this.state.snackbarStartIsOpen})}
				>
					Show start-aligned
				</Button>

				<Snackbar
					show={this.state.snackbarStartIsOpen}
					onClose={evt => this.setState({snackbarStartIsOpen: false})}
					message="Start aligned"
					actionText="Dismiss"
					actionHandler={() => {}}
					alignStart
				/>
		`
	},
	{
		name: 'Tabs',
		section: 'tabs',
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
		name: 'Theme',
		section: 'theme',
		class: ['Theme'],
		url: 'https://material.io/components/web/catalog/theme/',
		example: `
			<div>
				<div style={{ backgroundColor: '#ddd' }}>
					{[
						'primary',
						'primary-light',
						'primary-dark',
						'secondary',
						'secondary-light',
						'secondary-dark',
						'background',
						'dark',
						'primary-bg',
						'primary-light-bg',
						'primary-dark-bg',
						'secondary-bg',
						'secondary-light-bg',
						'secondary-dark-bg',
						'text-primary-on-background',
						'text-secondary-on-background',
						'text-hint-on-background',
						'text-disabled-on-background',
						'text-icon-on-background',
						'text-primary-on-light',
						'text-secondary-on-light',
						'text-hint-on-light',
						'text-disabled-on-light',
						'text-icon-on-light'
					].map((theme, i) => (
						<Theme use={theme} key={i}>
							{theme}
						</Theme>
					))}
				</div>
				<div style={{ backgroundColor: '#333' }}>
					{[
						'text-primary-on-primary',
						'text-secondary-on-primary',
						'text-hint-on-primary',
						'text-disabled-on-primary',
						'text-icon-on-primary',
						'text-primary-on-secondary',
						'text-secondary-on-secondary',
						'text-hint-on-secondary',
						'text-disabled-on-secondary',
						'text-icon-on-secondary',
						'text-primary-on-dark',
						'text-secondary-on-dark',
						'text-hint-on-dark',
						'text-disabled-on-dark',
						'text-icon-on-dark'
					].map((theme, i) => (
						<Theme use={theme} key={i}>
							{theme}
						</Theme>
					))}
				</div>
			</div>
		`
	},
	{
		name: 'Toolbars',
		section: 'toolbars',
		class: [
			'Toolbar',
			'ToolbarRow',
			'ToolbarSection',
			'ToolbarTitle',
			'ToolbarFixedAdjust'
		],
		url: 'https://material.io/components/web/catalog/toolbar/',
		example: `
			<Toolbar>
				<ToolbarRow>
					<ToolbarTitle>Toolbar</ToolbarTitle>
				</ToolbarRow>
			</Toolbar>
		`
	},
	{
		name: 'Typography',
		section: 'typography',
		class: ['Typography'],
		url: 'https://material.io/components/web/catalog/typography/',
		example: `
			<Typography use="display4">display4</Typography>
			<Typography use="display3">display3</Typography>
			<Typography use="display2">display2</Typography>
			<Typography use="display1">display1</Typography>
			<Typography use="headline">headline</Typography>
			<Typography use="title">title</Typography>
			<Typography use="subheading2">subheading2</Typography>
			<Typography use="subheading1">subheading1</Typography>
			<Typography use="body2">body2</Typography>
			<Typography use="body1">body1</Typography>
			<Typography use="caption">caption</Typography>
			<Typography use="button">button</Typography>
		`
	}
];
