export default [
  {
    name: 'Buttons',
    section: 'buttons',
    module: 'rmwc/Button',
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
    module: 'rmwc/Fab',
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
    module: 'rmwc/IconToggle',
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
    module: 'rmwc/Card',
    class: [
      'Card',
      'CardMedia',
      'CardMediaItem',
      'CardPrimary',
      'CardTitle',
      'CardSubtitle',
      'CardSupportingText',
      'CardActions',
      'CardAction'
    ],
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
    module: 'rmwc/Drawer',
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
    module: 'rmwc/Drawer',
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
    module: 'rmwc/Drawer',
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
    module: 'rmwc/Dialog',
    class: [
      'Dialog',
      'DefaultDialogTemplate',
      'DialogRoot',
      'DialogSurface',
      'DialogHeader',
      'DialogHeaderTitle',
      'DialogBody',
      'DialogFooter',
      'DialogFooterButton',
      'DialogBackdrop'
    ],
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
    module: 'rmwc/Elevation',
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
    module: 'rmwc/GridList',
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
								<GridTilePrimaryContent>
									<img src="https://material-components-web.appspot.com/images/1-1.jpg" alt="test" />
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
    module: 'rmwc/Checkbox',
    class: ['Checkbox'],
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
    module: 'rmwc/FormField',
    section: 'form-fields',
    class: 'FormField',
    url:
      'https://material.io/components/web/catalog/input-controls/form-fields/',
    example: `
			<FormField>
				<TextField label="Write Something..." id="test" />
			</FormField>

			<FormField>
				<input type="checkbox" id="input"/>
				<label htmlFor="input">Input Label</label>
			</FormField>
		`
  },
  {
    name: 'Radio Buttons',
    section: 'radio-buttons',
    module: 'rmwc/RadioButton',
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
    module: 'rmwc/Select',
    class: 'Select',
    url:
      'https://material.io/components/web/catalog/input-controls/select-menus/',
    example: `
			{/*  
				Select Menus
				RMWC implements a data driven method for passing options to a select.
				There are multiple ways you can pass data in, use the one that best fulfills your requirements.
			*/}
			
			{/* a formatted array of options */}
			<Select
				value={this.state.value}
				onChange={evt => this.setState({value: evt.target.value})}
				label="Array"
				options={[
					{
						label: 'Cookies',
						value: '1'
					},
					{
						label: 'Pizza',
						value: '2',
						
						/** Any additional items will be past to the
						 child list item as props */

						'aria-disabled': true,
						'tab-index': -1
					},
					{
						label: 'Icecream',
						value: '3'
					}
				]}
			/>
			<br/>

			{/*  A simple value => label map */}
			<Select
				label="Object map"
				options={{'1': 'Cookies', '2': 'Pizza', '3': 'Icecream'}}
			/>
			<br/>

			{/* a simple array of options, value will be the same as label */}
			<Select
				label="Simple Array"
				placeholder="-- Select One --"
				options={['Cookies', 'Pizza', 'Icecream']}
			/>
			<br/>

			{/* manually build the child list yourself */}
			<Select
				label="Manually Built"
				value={'Pizza'}
			>
				<ListItem role="option" id="Cookies" tabIndex="0">
					Cookies
				</ListItem>
				<ListItem role="option" id="Pizza" tabIndex="0">
					Pizza
				</ListItem>
				<ListItem role="option" id="Icecream" tabIndex="0">
					Icecream
				</ListItem>
			</Select>
			<br/>

			{/* 
				cssOnly Selects
				MDC doesnt have a label prop for css only selects, but RMWC has a placeholder prop you can use.
			*/}
			<Select
				cssOnly
				placeholder="-- cssOnly --"
				options={['Cookies', 'Pizza', 'Icecream']}
			/>
			<br/>

			{/* 
				cssOnly Selects with option groups
				MDC only supports option groups on css only selects.
			*/}
			<Select
				cssOnly
				placeholder="-- cssOnly w/ optGroups --"
				options={[
					{
						label: 'Foods',
						/* Options can be any value Select input: simply arrays, value => label objects, or formatted arrays. */
						options: ['Cookies', 'Pizza', 'Icecream']
					},
					{ 
						label: 'Animals',
						options: ['Dogs', 'Cats', 'Birds']
					}
				]}
			/>
			<br/>

			{/* 
				cssOnly Multi-select
				MDC only supports multiple on css only selects.
				Does not support labels or placeholders
			*/}
			<Select
				cssOnly
				multiple
        size="8"
				value={this.state.multi || []}
				onChange={evt =>  this.setState({
					multi: [...evt.target.selectedOptions].map(o => o.value)
				})}
				options={[
					{
						label: 'Foods',
						/* Options can be any value Select input: simply arrays, value => label objects, or formatted arrays. */
						options: ['Cookies', 'Pizza', 'Icecream']
					},
					{ 
						label: 'Animals',
						options: ['Dogs', 'Cats', 'Birds']
					}
				]}
			/>

		`
  },
  {
    name: 'Sliders',
    section: 'sliders',
    module: 'rmwc/Slider',
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

			<TextField
				value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
				onChange={evt => this.setState({sliderValue: evt.target.value})}
			/>
		`
  },
  {
    name: 'Switches',
    section: 'switches',
    module: 'rmwc/Switch',
    class: 'Switch',
    url: 'https://material.io/components/web/catalog/input-controls/switches/',
    example: `
			<Switch>Cookies</Switch>
			<Switch>Pizza</Switch>
			<Switch>Icecream</Switch>
		`
  },
  {
    name: 'TextFields',
    section: 'textfields',
    module: 'rmwc/TextField',
    class: ['TextField', 'TextFieldHelpText', 'TextFieldIcon'],
    url:
      'https://material.io/components/web/catalog/input-controls/text-fields/',
    example: `
				<TextField label="Write something..." />
				<TextFieldHelperText>Optional help text.</TextFieldHelperText>

				<TextField withLeadingIcon={<TextFieldIcon use="search"/>} label="Write something..." /><br/>

				<TextField box withTrailingIcon={<TextFieldIcon use="close"/>} label="Write something..." /><br/>
				
				<TextField textarea fullwidth label="Multiline..." rows="8" />
				<TextFieldHelperText persistent validationMsg>The field is required.</TextFieldHelperText>
		`
  },
  {
    name: 'Layout Grid',
    section: 'layout-grid',
    module: 'rmwc/Grid',
    class: ['Grid', 'GridCell'],
    url: 'https://material.io/components/web/catalog/layout-grid/',
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
    module: 'rmwc/LinearProgress',
    class: 'LinearProgress',
    url: 'https://material.io/components/web/catalog/linear-progress/',
    example: `
			<LinearProgress progress={0.5}></LinearProgress>
			<LinearProgress progress={0.6} buffer={0.8}></LinearProgress>
			<LinearProgress determinate={false}></LinearProgress>
			<LinearProgress progress={0.2} reversed></LinearProgress>
		`
  },
  {
    name: 'Lists',
    section: 'lists',
    module: 'rmwc/List',
    class: [
      'List',
      'ListItem',
      'ListItemText',
      'ListItemSecondaryText',
      'ListItemStartDetail',
      'ListItemEndDetail',
      'ListDivider',
      'ListGroup',
      'ListGroupSubheader'
    ],
    url: 'https://material.io/components/web/catalog/lists/',
    example: `
				<List>
					<ListItem ripple>
						<ListItemStartDetail>star_border</ListItemStartDetail>
						<ListItemText>Cookies</ListItemText>
						<ListItemEndDetail>info</ListItemEndDetail>
					</ListItem>

					<ListItem ripple>
						<ListItemStartDetail>favorite_border</ListItemStartDetail>
						<ListItemText>Pizza</ListItemText>
						<ListItemEndDetail>info</ListItemEndDetail>
					</ListItem>

					<ListItem ripple>
						<ListItemStartDetail>mood</ListItemStartDetail>
						<ListItemText>Icecream</ListItemText>
						<ListItemEndDetail>info</ListItemEndDetail>
					</ListItem>
				</List>
		`
  },
  {
    name: 'Menus',
    section: 'menus',
    module: 'rmwc/Menu',
    class: ['Menu', 'MenuItem'],
    url: 'https://material.io/components/web/catalog/menus/',
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
    module: 'rmwc/Ripple',
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
    module: 'rmwc/Snackbar',
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
    module: 'rmwc/Tabs',
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
    module: 'rmwc/Theme',
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
    module: 'rmwc/Toolbar',
    section: 'toolbars',
    class: [
      'Toolbar',
      'ToolbarRow',
      'ToolbarSection',
      'ToolbarMenuIcon',
      'ToolbarTitle',
      'ToolbarIcon',
      'ToolbarFixedAdjust'
    ],
    url: 'https://material.io/components/web/catalog/toolbar/',
    example: `
			{/* Minimum usage */}
			<Toolbar>
				<ToolbarRow>
					<ToolbarTitle>Toolbar</ToolbarTitle>
				</ToolbarRow>
			</Toolbar>

			{/* With multiple sections */}
			<Toolbar>
				<ToolbarRow>
					<ToolbarSection alignStart>
						<ToolbarMenuIcon use="menu"/>
						<ToolbarTitle>Toolbar</ToolbarTitle>
					</ToolbarSection>
					<ToolbarSection alignEnd>
						<ToolbarIcon use="save"/>
						<ToolbarIcon use="print"/>
					</ToolbarSection>
				</ToolbarRow>
			</Toolbar>

			{/* Multiple rows */}
			<Toolbar>
				<ToolbarRow>
					<ToolbarTitle>Toolbar</ToolbarTitle>
				</ToolbarRow>
				<ToolbarRow>
					<ToolbarTitle>Second Row</ToolbarTitle>
				</ToolbarRow>
			</Toolbar>
		`
  },
  {
    name: 'Typography',
    module: 'rmwc/Typography',
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
  },
  {
    name: 'Icons',
    module: 'rmwc/Icon',
    section: 'icons',
    class: 'Icon',
    url: 'https://material.io/components/web/catalog/',
    example: `
			{/* 
				Even though MDC does not explicitly define an icon component, 
				icons are used throughout the api in many different forms. MDC assumes
				that you're using a font icon with ligatures,
				but RMWC allows you use any number of various icon strategies and libraries. 

				You must include your own icon library of choice, and use the appropriate
				method to embed them.
*/}

{/* 
			Simple embedding as a child, or with the "use" prop.
			The icon component will attempt to auto detect how to embed the icon and will
			default to ligatures (like material-icons).
*/}
		<Icon>favorite</Icon>
    <Icon use="favorite" />

{/* 
			You can use urls to load images for icons
*/}
    <Icon use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    <Icon>
      https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon
    </Icon>

{/* 
			You can render JSX, useful for something like inline SVGS or custom cases
*/}
    <Icon
      use={<div style={{ background: 'red', width: '24px', height: '24px', borderRadius: '100px' }} />}
    />
    <Icon>
      <div style={{ background: 'purple', width: '24px', height: '24px' }} />
    </Icon>

{/* 
		Or specify your own options
*/}
    <Icon use="ionic" prefix="ion-" strategy="className" basename="icon" />
		`
  }
];
