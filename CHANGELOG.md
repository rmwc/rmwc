#### 8.0.3 (2022-10-12)

##### Chores

* **readme:**  update readme and package.json (12b4c443)

##### Bug Fixes

* **type:**  Extends {} to fix error in declarations (d5936d7b)

#### 8.0.2 (2022-10-12)

##### Chores

* **readme:**  update readme (c47f003e)

##### Bug Fixes

* **textfield:**  Add back styling for date picker (f9a609d8)

#### 8.0.1 (2022-08-05)

##### Breaking Changes

* **Select:**  MDC removed fullwidth variant (32c4b87b)
* **Textfield:**  Removing fullwidth variant (4f3b4e77)

##### Build System / Dependencies

* **deps:**
  *  CRA-v5, webpack-v5, router-v6, react-live-v3 (f3b32fe7)
  *  bump trim-off-newlines from 1.0.1 to 1.0.3 (8dfd5c8f)
  *  bump nanoid from 3.1.23 to 3.3.1 (1df51758)
  *  bump node-fetch from 2.6.1 to 2.6.7 (d17712e5)

##### Chores

*  storybook update 6.5.10 (9ca79cdd)
* **core:**  Updated all doc dependencies (50507f2f)

##### Bug Fixes

*  use right variable (ed4155fd)
* **Select:**  Fix data driven Select initial value (84eaf25e)
* **Dialog:**  #781 Corrects an issue that would cause Esc to still dismiss for preventOusideDismiss (119478ab)
* **Portal:**
  *  fixes issue with portal and SSR #708 (4a7e45c0)
  *  Prevent children from being mounted twice (beb9d433)
* **TextField:**  Corrects issue with Character Counter #777 (b37c1822)
* **select:**
  *  New adapter methods & changed dom (ffacae5f)
  *  New adapter methods & changed dom (cda0c061)
  *  change ssr test to run on node (e1e912f5)
  *  fix issue with placeholder (3aa9d2f1)
  *  Restructure to work with material 7 (59e04002)
  *  rename adapter (bd9571fc)
  *  Fix tests for select (238b10da)
  *  Remove active classes onBlur (496cd540)
  *  Fix placeholder/float issue (24008b52)
* **textfield:**
  *  Updated prop list in readme (961f80f4)
  *  Change helpertext to div (82fc5efe)
  *  Updated prop list in readme (c76b64af)
  *  Change helpertext to div (b428490a)
  *  fix textfield to support v7 (7c4e4d7e)
  *  Fix bug with outlined (c9e78d16)
* **menu:**
  *  Support new api methods for select (442db8d3)
  *  Support new api methods for select (07019143)
* **chip:**  fix error of chip not being removable (e3f3433a)
* **menu-surface:**  fix error with autoPosition (d2c1970a)
* **tab-bar:**  remove _ from adapter (6a7dd2d0)
* **list:**
  *  add ripple to list item (4044f7df)
  *  rename adapter (35741063)
* **data-table:**
  *  reverse sorting arrows (10925e09)
  *  add container wrapper (d794eb57)
* **tabs:**  rename adapter (e11b3b72)
* **top-app-bar:**  rename adapter (142f3217)
* **readme:**  Fix styling for readme (ac884a34)

##### Other Changes

* //github.com/jamesmfriedman/rmwc into fix-select-on-safari (47398eda)
* jamesmfriedman/rmwc into mcw/v8 (e7bdd0fb)
* //github.com/jamesmfriedman/rmwc into mcw/v7 (1b6dc7af)
* //github.com/Nykredit/rmwc into bump-material-version-7 (aabddfd7)
* master' into master (fc6dbdf9)
* //github.com/Nykredit/rmwc into bump-material-version-7 (f65b9777)
* jamesmfriedman/rmwc (402fcefd)
* jamesmfriedman/rmwc (511db98a)
* jamesmfriedman/rmwc (a4d20027)
* jamesmfriedman/rmwc (c76d3502)
* //github.com/Nykredit/rmwc into bump-to-version-6 (2a165edb)
* master' into master (e4cf416c)
* jamesmfriedman/rmwc (bea038b7)
* jamesmfriedman/rmwc (210bca62)
* //github.com/Nykredit/rmwc into bump-material-version-7 (d2f7a134)
* //github.com/Nykredit/rmwc into bump-to-version-6 (7e64fcba)
* master' into master (f6d751a5)
* **todo:**
  *  Updated todo list (12ca023a)
  *  Updated todo list (70c311a5)
* **floating-label:**  setRequired adapter (eeb8cc84)
* **chip:**
  *  trailing action business logic (89c82178)
  *  trailing action business logic (6c4c9922)
* **all:**  material version 7 (a59c499a)
* **textfield:**  added new feature props to list (6daf315f)
* **grid-list:**  Add note on deprecation (ccd7493c)

##### Refactors

* **linear-progress:**  Extracted setStyle (fa886d7b)

##### Reverts

* **select:**  revert line of code (9fde841d)

##### Tests

* **textfield:**  added test for prefix/suffix (7e3b4b01)
* **slider:**  Removed skip from tests (af32c678)
* **select:**  Added missing " for consistency (06ca13bf)

#### 8.0.0 (2022-06-01)

##### Breaking Changes

* **Select:**  MDC removed fullwidth variant (32c4b87b)
* **Textfield:**  Removing fullwidth variant (4f3b4e77)

##### Build System / Dependencies

* **deps:**
  *  CRA-v5, webpack-v5, router-v6, react-live-v3 (f3b32fe7)
  *  bump trim-off-newlines from 1.0.1 to 1.0.3 (8dfd5c8f)
  *  bump nanoid from 3.1.23 to 3.3.1 (1df51758)
  *  bump node-fetch from 2.6.1 to 2.6.7 (d17712e5)

##### Chores

* **core:**  Updated all doc dependencies (50507f2f)

##### Bug Fixes

* **Dialog:**  #781 Corrects an issue that would cause Esc to still dismiss for preventOusideDismiss (119478ab)
* **Portal:**
  *  fixes issue with portal and SSR #708 (4a7e45c0)
  *  Prevent children from being mounted twice (beb9d433)
* **TextField:**  Corrects issue with Character Counter #777 (b37c1822)
* **select:**
  *  New adapter methods & changed dom (ffacae5f)
  *  New adapter methods & changed dom (cda0c061)
  *  change ssr test to run on node (e1e912f5)
  *  fix issue with placeholder (3aa9d2f1)
  *  Restructure to work with material 7 (59e04002)
  *  rename adapter (bd9571fc)
  *  Fix tests for select (238b10da)
  *  Remove active classes onBlur (496cd540)
  *  Fix placeholder/float issue (24008b52)
* **textfield:**
  *  Updated prop list in readme (961f80f4)
  *  Change helpertext to div (82fc5efe)
  *  Updated prop list in readme (c76b64af)
  *  Change helpertext to div (b428490a)
  *  fix textfield to support v7 (7c4e4d7e)
  *  Fix bug with outlined (c9e78d16)
* **menu:**
  *  Support new api methods for select (442db8d3)
  *  Support new api methods for select (07019143)
* **chip:**  fix error of chip not being removable (e3f3433a)
* **menu-surface:**  fix error with autoPosition (d2c1970a)
* **tab-bar:**  remove _ from adapter (6a7dd2d0)
* **list:**
  *  add ripple to list item (4044f7df)
  *  rename adapter (35741063)
* **data-table:**
  *  reverse sorting arrows (10925e09)
  *  add container wrapper (d794eb57)
* **tabs:**  rename adapter (e11b3b72)
* **top-app-bar:**  rename adapter (142f3217)
* **readme:**  Fix styling for readme (ac884a34)

##### Other Changes

* //github.com/jamesmfriedman/rmwc into fix-select-on-safari (47398eda)
* jamesmfriedman/rmwc into mcw/v8 (e7bdd0fb)
* //github.com/jamesmfriedman/rmwc into mcw/v7 (1b6dc7af)
* //github.com/Nykredit/rmwc into bump-material-version-7 (aabddfd7)
* master' into master (fc6dbdf9)
* //github.com/Nykredit/rmwc into bump-material-version-7 (f65b9777)
* jamesmfriedman/rmwc (402fcefd)
* jamesmfriedman/rmwc (511db98a)
* jamesmfriedman/rmwc (a4d20027)
* jamesmfriedman/rmwc (c76d3502)
* //github.com/Nykredit/rmwc into bump-to-version-6 (2a165edb)
* master' into master (e4cf416c)
* jamesmfriedman/rmwc (bea038b7)
* jamesmfriedman/rmwc (210bca62)
* //github.com/Nykredit/rmwc into bump-material-version-7 (d2f7a134)
* //github.com/Nykredit/rmwc into bump-to-version-6 (7e64fcba)
* master' into master (f6d751a5)
* **todo:**
  *  Updated todo list (12ca023a)
  *  Updated todo list (70c311a5)
* **floating-label:**  setRequired adapter (eeb8cc84)
* **chip:**
  *  trailing action business logic (89c82178)
  *  trailing action business logic (6c4c9922)
* **all:**  material version 7 (a59c499a)
* **textfield:**  added new feature props to list (6daf315f)
* **grid-list:**  Add note on deprecation (ccd7493c)

##### Refactors

* **linear-progress:**  Extracted setStyle (fa886d7b)

##### Reverts

* **select:**  revert line of code (9fde841d)

##### Tests

* **textfield:**  added test for prefix/suffix (7e3b4b01)
* **slider:**  Removed skip from tests (af32c678)
* **select:**  Added missing " for consistency (06ca13bf)

#### 7.0.3 (2022-03-06)

##### Other Changes

* jamesmfriedman/rmwc (a4d20027)
* jamesmfriedman/rmwc (c76d3502)
* jamesmfriedman/rmwc (bea038b7)
* jamesmfriedman/rmwc (210bca62)

#### 7.0.2 (2022-03-06)

##### Other Changes

* jamesmfriedman/rmwc (bea038b7)
* jamesmfriedman/rmwc (210bca62)

#### 7.0.1 (2022-03-06)

##### Other Changes

* jamesmfriedman/rmwc (210bca62)

#### 7.0.0 (2022-02-17)

##### Chores

* **Dependencies:**  Update to React 17, update all dep versions (7e22a0e2)
* **Icon:**
  *  Add unit test to cover crash when custom render returns a string (9350f1e5)
  *  Improve typings of icon render method (25aa225e)

##### Bug Fixes

* **Github Actions:**  Fixed Github Actions for running test and uploading code coverage to Codecov (5e022170)
* **docs:**  Display proper markdown for code (3ee72fce)
* **test:**  Fixed failing tests (bd59dba6)
* **snackbar:**  support SVGs as dismiss icon (261a7311)
* **list:**  Do not pass wrapFocus to Tag (d963fc42)

##### Other Changes

*  remove unneeded markdown (dd22bdd9)

#### 6.1.4 (2020-09-11)

##### Build System / Dependencies

* **deps:**  bump elliptic from 6.5.2 to 6.5.3 (0e5d097b)

##### New Features

* **Tab:**  Add ability to set focusOnActivate (ab155a96)

##### Bug Fixes

* **Select:**
  *  added the "sudden removal" story (616ee47f)
  *  fixed unhandled error on "sudden" item removal (b34c0b47)
* **base:**
  *  Properly pass foundation in useFoundation effect (cd556bc3)
  *  Use local foundation reference in useFoundation effect (b9fdc94c)
  *  Re-set apiRef in useFoundation after nulling it (748bdf35)
* **Tab:**  activeTabIndex always updating automatically (ed0f0091)

##### Other Changes

*  remove not use deps from externals (e03ed26a)

##### Tests

* **Select:**  Story for enhanced Select with Portal (e882c13a)
* **Menu:**  Show index in hoistToBody story (b0600e28)

#### 6.1.3 (2020-06-15)

#### 6.1.2 (2020-06-11)

#### 6.1.1 (2020-06-11)

##### Bug Fixes

* **Select:**  fixed menu props not frowarding for enhanced select (4a3e57d9)
* **TopAppBar:**
  *  Fix TopAppBarFixedAdjust to pass broken tests (905f9c8e)
  *  Add classname tests for TopAppBarFixedAdjust component (fd6a73b6)
* **top-app-bar:**  Fix wrong className for TopAppBarAdjust (c4ff7664)

##### Other Changes

*  should fix (a54056d4)

#### 6.1.0 (2020-04-22)

##### New Features

* **TextField:**  Add ability to manually float label (457a7c79)

##### Bug Fixes

* **Select:**  Don't render ListGroupSubheader when passing empty string or null as label (73fc81c5)

##### Other Changes

* //github.com/jamesmfriedman/rmwc (29f2c26a)
* //github.com/jamesmfriedman/rmwc (2e7592a0)
* //github.com/jamesmfriedman/rmwc (c8b83f53)
* //github.com/jamesmfriedman/rmwc (61946e8f)

#### 6.0.14 (2020-04-06)

##### Bug Fixes

* **Typescript:**  Correcting cryptic issue where storybook is causing incorrect type declarations to be emitted. (cf1ca2da)

#### 6.0.13 (2020-04-06)

##### Bug Fixes

* **Typescript:**
  *  moving classnames from devDependency to dependency (3a40031f)
  *  Corrects typescript bug randomly pulling in unused type reference. (87e8ee7b)

#### 6.0.12 (2020-04-06)

##### Bug Fixes

* **Typescript:**  Cleaning up flattened delclarations for Dialog and base (4d7a4a1e)

#### 6.0.11 (2020-04-05)

##### Bug Fixes

* **Base:**  Adding missing dependency dependency on @material/dom to package.json (80bb6b0f)

#### 6.0.10 (2020-04-05)

##### Chores

* **Base:**  Updating test polyfill deps relates to #596 (bebd9530)

##### New Features

* **Select:**  Add ability to pass JSX as label options for enhanced selects (a9ef9803)

##### Bug Fixes

* **Theme:**
  *  Corrects MDC issue with text-align and linear progress #590 (f4be0eb7)
  *  Corrects theme ripple issue on fab and button (2dc5a7bb)
* **Select:**  Corrects issue with native selects requiring multiple tab focus #595 (fb699aff)

#### 6.0.9 (2020-04-03)

##### Bug Fixes

* **Select:**  Corrects issue with setting controlled value outside of select, adds supporting tests #594 (37971c7d)

#### 6.0.8 (2020-04-01)

##### Bug Fixes

* **Base:**  Updating main material-components-web dep (24ae55d3)

#### 6.0.7 (2020-04-01)

##### Bug Fixes

* **Select:**  corrects a regression with defaultValue (8bf2f52f)

#### 6.0.6 (2020-04-01)

##### Bug Fixes

* **Select:**  Corrects a regression in select behavior preventing label from being properly set (313d56da)

#### 6.0.5 (2020-03-30)

##### Bug Fixes

* **Typescript:**  Fixes declaration flattening for certain components that Omit attributes from base props (889fd298)

#### 6.0.4 (2020-03-30)

##### Chores

* **Base:**  Improving component typings #587 (b65507ab)

##### Bug Fixes

* **#588:**  Adds css var support for top-app-bar color (bb023697)

#### 6.0.3 (2020-03-29)

##### Bug Fixes

* **Icon:**  Resolves build-time `TypeError: Cannot read property "name" of undefined` (fcf51f3e)

##### Other Changes

* //github.com/jamesmfriedman/rmwc (0a434810)

#### 6.0.2 (2020-03-28)

##### Bug Fixes

* **Icon:**  Corrects issue with rendering of nested icons (9c7f1810)

#### 6.0.1 (2020-03-28)

##### Bug Fixes

* **Menu:**  Correcting issue requiring double click to open (70004375)

#### 6.0.0 (2020-03-28)


##### Bug Fixes
* **TopAppBar:**
  *  Correcting double ripple on action buttons (680b1b5c)
  *  Corrects issue with persisted events around Navigation and Action icons #536 (3f473180)
  *  Implements broken onNav prop (1f17d0d0)
* **Grid:**  Fix incorrect className for grid align property #526 (302ea95d)
* **FormField:**  Correct broken link in doc #529 (41409aa7)
* **Select:**  Fix placeholder disappearing when value or defaultValue prop is set #533 (991885ec)
* **Slider:**  Sync min/max props before value to avoid warnings. (34d36798)
* **Menu:**  fixed "isMenuItems" check to not break on Symbol and string element types. (d707c3d1)
* **SnackbarQueue:**  Correcting type signature of component #494 (1b3ed2d0)
* **List:**  Adding missing className to collapsible list #543 (3d63f571)
* **IconButton:**  Remove aria-hidden attribute #549 (e19795ae)
* **DataTable:**  Correct sort icon direction based on Material Spec #551 (028da5b1)
* **list:**  use semantic tags (cc1592af)
* **Icon:**  Adds proper disabled styles for images and components #556 (5a95a47b)
* **Base:**  Declaring CSS as sideEffect across all components #545 (9dcd6197)
* **TopAppBar:**  Implementing broken `onNav` prop (dab4cce3)
* **list:**  use new  useEffect() per prop (79b17062)
* **menu:**  focusOnOpen defaults to true (54ed96af)
* **Ripple:**  Corrects issue with disabled ripple selection #515 (4463d1a3)
* **Slider:**  Fixes issue with slider interactivity in dialog on open #538 (be5347e1)
* **Drawer:**  Fixing issue where Drawer was uncontrolled (25d469b0)
* **List:**  Allow up to 5 levels of indentation for collapsible lists. (821c4bfc)
* **ThemeProvider:**  Allow setting theme prop directly on ThemeProvider #567 (ca797461)
* **Snackbar:**  Corrects layout issue with ripple #560 (da2952de)

##### Chores

* **Switch:**  DOM Restructure (90521305)
* **Base:**
  *  Refactor focus trap to use mdc internal lib (77135f41)
  *  Upgrade all deps (b85b3618)
* **Chip:**  Correct focus styles (4073e17b)
* **TextField:**  Moving ripple to separate element (48cbe64f)
* **Textfield:**
  *  Changing root element to label (a3ae935d)
  *  Add separate classes for leading / trailing icons (ecb0bd8b)
* **Dialog:**  Adding aria attributes to dialog surface (9ea0df0c)
* **Base:**
  *  Audit all todos (67a3b3b4)
  *  Fixing all linting issues (e8964499)
* **Select:**  Upgrade to MDC 4.x.x (b7aaeca9)
* **Base:**  Upgrading unchanged packages to MDC 4.x.x (ff77a31b)
* **Menu:**  Upgrading to MDC 4.x.x (2b41310c)
* **Slider:**  Refactor track markers (d39b28b2)
* **Chip:**  Upgrade to MDC 4.x.x (7aac4498)
* **Textfield:**  Update to mdc 4.x.x (368f8bf4)
* **List:**  Update to mdc 4.x.x (f23254c1)
* **Switch:**  update to mdc 4.x.x (134f5cf8)
* **Dialog:**  Update to mdc 4.x.x (7ae83a27)
* **IconButton:**  Update to mdc 4.x.x (2d4e0305)
* **Radio:**  Update to mdc 4.x.x (c77eb7b1)
* **Ripple:**  Updating ripple to mdc 4.x.x (90f348c7)
* **LinearProgress:**  Update to mdc 4.x.x (18664e29)


##### Documentation Changes

* **Icon:**  Improving documentation on setting up icons. (d2e5927a)
* **Base:**  Improving style import documentation for all components (a484d61c)


##### New Features

* **Snackbar:**  Adding api features to clearAll pending notifications, and invidually remove Snackbars. (a6e14635)
* **Snackbar:**  Adding indefinite timeout. Pass a timeout of -1 (341eec2d)
* **Badge:**
  *  Adding exited prop option (500d5516)
  *  New badge component #411 (46888630)
* **DataTables:**   Refactoring to use the official material table styles (5699f236)
* **Base:**  Simplified syntax for importing styles when using CSS loaders (71ab1c58)
* **Base:**  Adding foundationRef to all components (4027a3c5)
* **TextField:**  Adding align option (786305f8)
* **Switch:**  Adding aria attributes (45517837)
* **LinearProgress:**  Adding aria attributes (fab4cacb)
* **list:**  list Icons should be aria-hidden (1b165c87)
* **dialog:**  add onClosed and onOpened (b4c69477)
* **Chip:**  Allow modifying trailing icon behavior #500 (68b54b87)
* **Dialog:**  Add escape key handling to preventOutsideDismiss #499 (41427b81)
* **Tabs:**  Adding minWidth option #532 (2178b1fb)
* **Dialog:**  Adding renderToPortal functionality (31532dd7)
* **list:**
  *  adds vertical property (7e3d6252)
  *  add wrapFocus prop which proxies  the foundation's setWrapFocus() method. (b29cc52d)
  *  implement isRootFocused (33502010)
* **dialog:**  update to include onOpened and onClosed (f9462c02)

##### Breaking Changes

* **List:**  changing event detail to {index: number} instead of raw number #432 (3807a9b3)
* **Grid:**  The GridInner has been renamed to GridRow (28c6c263)
* **Menu:**  Replacing `hoistToBody` with `renderToPortal` functionality (05129ad5)
* **Dialog:**  removal of onStateChange (34d129e1)


#### 5.7.1 (2019-09-13)

##### New Features

* **Select:**  Expose MenuProps interface via the enhanced prop. (07302bde)

##### Bug Fixes

* **Docs:**  Add back missing Typography props (b25f4e7b)
* **Typography:**  Corrects regression where Refs could no longer be passed (13e41236)
* **Menu:**
  *  Corrects broken logic check (c6497d48)
  *  Improves MenuItems wrapper detection when passing your own MenuItems wrapper. (1d0e45c7)
  *  Corrects issue with MenuSurface causing menus to close immediately on devices that don't support fast click for touch. (035d31b6)

##### Other Changes

* //github.com/jamesmfriedman/rmwc (0f27c9fa)

#### 5.7.0 (2019-09-11)

##### Chores

* **Provider:**  Fix missing doc props (a3e688cc)
* **Slider:**  Improve test cov (ffff8437)
* **Docs:**
  *  generating content (d2bed10e)
  *  Generating updated docs (ecf01d64)
  *  Update contrib guidelines (785125f3)
  *  Fix issue with new react router not re-rendering on url change (6ef8fea2)
* **Select:**  Removing console.log (76027171)
* **Avatar:**  Improve test cov (94ea0c52)
* **DataTable:**
  *  Update type signature to allow a number instead of a union. (6575c7d8)
  *  Update documentation about comparison to official spec. (047eb5ef)
* **Base:**  Updating all deps (b0925bc2)

##### New Features

* **Typography:**  Added ability to provide a mapping for type classes to HTML tags. (73e870dc)
* **Tooltip:**  Added new tooltip component  #346 (c08e5be5)
* **Tabs:**  Adding tab transitions and icon indicators #478 (56970b63)

##### Bug Fixes

* **Select:**  Corrects issues with enhanced select not floating label when using manual rendering. #486 (870f4eaf)
* **Slider:**  Corrects issue where Slider would crash when value was out of bounds #358 (1520ce70)
* **List:**  Corrects issue with collapsible list items that have margin #485 (abe9edf0)
* **Chip:**  Correct outdated dependency when using the main rmwc install. Fixes #476 (fb4a52e5)

#### 5.6.0 (2019-07-21)

##### Chores

* **TopAppBar:**  Update adapter methods from mdc (64b802f8)
* **Dialog:**  Update adapter methods from MDC (c956139c)
* **Chip:**  Update to semantic button element (ec495306)

##### Bug Fixes

* **Theme:**  Corrects issue with ThemProvider wrap duplicating children (ea3dd031)

#### 5.5.2 (2019-05-22)

##### Chores

* **Base:**  Removing githead artifacts causing lerna to bump all versions (766be134)

##### Bug Fixes

* **List:**  Corrects CollapsibleList behavior for controlled components #460 (95fa4fe8)
* **Slider:**  fix incorrect style import for docs #464 (8a3d3c1b)
* **Dialog|Snackbar:**  broken dialog and snackbar types (4f77264b)
* **TopAppBar:**  Add component props to props interface (f0e7c7b4)

#### 5.5.1 (2019-05-06)

##### Bug Fixes

* **Icon:**  Corrects an issue with nested markup when rendering svg icons (0bec2c50)
* **Docs:**  adding SImpleDialog (5134250a)

#### 5.5.0 (2019-05-03)

##### Chores

* **Base:**
  *  updating to CRA3 (cb42368e)
  *  Updating deps to mwc@2.x.x (11223f59)
* **Docs:**  Copying CNAME over to persistent public dir (3fa19458)
* **List:**  Fixing issue with CRA3 build (8a74e9af)
* **Snackbar:**  Updating SnackbarQueue docs and making ArrayEmitter reusable (08084986)
* **Card:**  Fixing deprecation in test (eb91bb38)
* **Menu:**  Implementing changed behavior from MCW (1701a5d0)

##### New Features

* **Dialog:**  Adding dialog queue (3596c6f0)
* **Button:**  Implementing danger button (5852be65)

##### Bug Fixes

* **Dialog:**  Correcting focus trap issue for when there are no focusable elements (88e46b24)

#### 5.4.3 (2019-04-30)

##### New Features

* **Menu:**  Add ability to disable focusOnOpen (0ea5342f)

#### 5.4.2 (2019-04-30)

##### Bug Fixes

* **Tabs:**  Corrects issue with Link as Tabs (76326d1e)

#### 5.4.1 (2019-04-29)

##### Bug Fixes

* **Snackbar:**  Corrects issues with es5 compilation extending built in Array (602f4855)

#### 5.4.0 (2019-04-29)

##### Chores

* **Base:**  Updating dependencies (6647cde9)
* **TextField:**  Adding autoFocus test #439 (f7f175e3)
* **Storybook:**  Updating Storybook (f180beaf)

##### New Features

* **Snackbar:**  Adding SnackbarQueue (4d6625b4)
* **Typescript:**  export all custom events for consumers (22a02d7c)

##### Bug Fixes

* **Menu:**  Corrects issue with using hoistToBody inside of Dialogs #453 (d1ecea0d)
* **TabBar:**  Corrects issue with delayed setting of tabIndex #442 (a87d2d5f)
* **Select:**  Corrects issue with autoFocusing of selects #439 (1d9c8de6)
* **Docs:**  Corrects double SimpleMenu entry in docs #455 (59333780)
* **Ripple:**
  *  Reset is touch for devices that support both mouse and touch events (d8171320)
  *  Fix ripple gets triggered twice on touch devices (bc887084)

#### 5.3.1 (2019-04-11)

#### 5.3.0 (2019-04-10)

##### Bug Fixes

* **TopAppBar:**  Improving usage in iframes (6d862e61)
* **Toolbar:**
  *  Improved usage in different window contexts (1624c298)
  *  Corrects regressions and missing behaviors (ba929568)
* **Menu:**  Adding ComponentProps to type signature of SimpleMenu (a801a089)
* **TestPolyfill:**  Adding scrollTo mock if not present for JSDOM (8741ce93)

#### 5.2.2 (2019-04-02)

##### Chores

* **npm:**  Running audit, updating lock (f4f033cd)

##### Bug Fixes

* **DataTable:**  Removes hover animation, fixes #443 (79574049)
* **Tabs:**  Fixes typings for Tab.onInteraction #438 (b51d39f8)
* **Base:**  Corrects potential conflict with built in component prop names and HTMLProps (76d89fd4)
* **Avatar:**  Corrects type signature error for size (b7a1e9ae)
* **Dialog:**  Render footer in SimpleDialog (9df9d395)
* **Checkbox:**  Adding missing dependency (8db8026a)

#### 5.2.1 (2019-03-15)

##### Documentation Changes

* **TopAppBar:**  Correct examples (985102cc)

##### Bug Fixes

* **Menu:**  Corrects race condition with hoistMenuToBody no detecting anchor (492fa2d6)
* **Docs:**  Corrects doc build tree shaking dropping CSS (d1c86a43)

#### 5.2.0 (2019-03-11)

##### Documentation Changes

* **Installation:**  Updating path to polyfill in docs (354c8b12)
* **DataTable:**  Correcting issue with data-table sticky menu select (b83145d3)
* **Drawer:**  Added right to left example (1b57b4f9)
* **Provider:**  Correct deprecated provider example (0d29926a)
* **Icon:**  Clean up examples (21cf790c)

##### Bug Fixes

* **Icon:**  Corrects a regression in icon sizing for the chip component (ccdebafc)
* **Docs:**
  *  Include information on Tree Shaking (fcb0b0f1)
  *  Update stance on breaking changes (c3ef24f3)
* **Avatar:**  Allows usage for avatars with transparent backgrounds and containing the image fixes #434 (29e21473)

#### 5.2.0-alpha.1 (2019-03-08)

##### Chores

* **Docs:**
  *  Fixing 404 (55c5ee35)
  *  Adding missing import to card docs (fd8e764d)
  *  increase memory limit for docs site (728c903d)
* **.gitignore:**  Ignore new report files (3befc9a3)
* **Contributing:**  Updating guidelines (64ad2269)
* **Flow:**  Removing unused config (a9b95ba9)

##### New Features

* **CollapsibleList:**  Added ability to start menu as open (9a832634)
* **Docs:**  Adding resources page (e3ac2cfd)

#### 5.2.0-alpha.0 (2019-03-08)

##### Breaking Changes

* **List:**  onAction evt.detail now equals {index: number} instead of just a raw number (a5af9fa8)

##### New Features

* **Dialog:**  Adds ability to prevent dismiss when Scrim is clicked fixes #376 (38c95192)

##### Bug Fixes

* **Typescript:**
  *  Correcting more issues hidden by previous ignores (ef3665a5)
  *  types foundations all the way through, fixes issue #416 (77198c8a)
  *  Fully integrate with MDC via typescript (62cd4143)
* **Menu:**  added hoistToBody functionality fixes #396 #347 (cf3a8578)
* **Select:**  Corrects issue with floating label and deferred options fixes #390 (441fff99)
* **Tabs:**  Corrects syncronicty issue with controlled tabs fixes #383 (1aa80ec7)
* **TopAppBar:**  Allows scrollTarget to be set via a prop fixes #430 (48ca8021)
* **Tests:**  corrects issue with ES6 export in polyfill #426 (46b35fde)
* **Storybook:**  Upgrades to storybook 5 and convert to TS (5e190104)
* **Snackbar:**  Add missing icon-button dependency (1edbdb4b)
* **Base:**  Updating classNames version for SSR (82c1fd5c)
* **Dev:**  Adding missing type files for contributing #422 (74a0864d)

#### 5.1.8 (2019-02-22)

##### Bug Fixes

* **Menu:**  Corrects Menu not closing on touch devices (23598c68)
* **Snackabar:**  Corrects issue with rendering JSX content in snackbars #418 (f6a5a60b)

#### 5.1.7 (2019-02-20)

##### Bug Fixes

* **IconButton:**  Corrects issue with extending components where defaultTag is also a component #415 (96dc0be9)

#### 5.1.6 (2019-02-18)

#### 5.1.5 (2019-02-18)

##### Bug Fixes

* **Docs:**  Correcting doc build change detection issue with Lerna (a31c2497)
* **Typescript:**  Correct package.json types declaration (1462bdce)
* **Snackbar:**  Corrects an with dismissing when clicking a button label (d4445d38)

#### 5.1.4 (2019-02-15)

##### Bug Fixes

* **Select:**  Fixes #412 Select issue with Firefox (cbebfe97)

#### 5.1.3 (2019-02-14)

##### Bug Fixes

* **Tab:**  Adding missing type signature for component props (4743ffa3)

#### 5.1.2 (2019-02-14)

##### Bug Fixes

* **TopAppBar:**  Adding missing ripple dependency to top app bar package.json (446fc1fd)

#### 5.1.1 (2019-02-14)

Changelog couldn't be generated for this release, see the release notes for the full details 🚀 https://opencollective.com/rmwc/updates/5-0-0-a-giant-leap-for-rmwc

#### 4.0.6 (2019-01-06)

##### Bug Fixes

* **TypeScript:**  Correcting issue with build (f42f7296)

#### 4.0.5 (2019-01-06)

##### Bug Fixes

* **Typescript:**  Correcting types (20dec9c3)

#### 4.0.4 (2019-01-06)

##### Bug Fixes

* **Select:**  use a combination of label and value as key for options (dc3d8a3e)

#### 4.0.3 (2018-12-28)

##### Bug Fixes

* **TS:**  Corrects className issue on buttons (f999004a)

#### 4.0.1 (2018-11-28)

##### Bug Fixes

* **Typescript:**  Corrects issue with proptypes import (6f8041bb)

#### 4.0.0 (2018-11-26)

##### Breaking Changes

* **apiRef:**  apiRef has been removed from the library. If you were using, just use the standard react “ref”  if you need to get access to the class internals. (41c2c149)
* **Chip:**
  *  Refactor to reduce the complexity, implementation, and event handling of Chips #354 (eb62bcac)
  *  Refactor to reduce the complexity, implementation, and event handling of Chips #354 (69139821)

##### Documentation Changes

* **Contributing:**  Updating contributing docs with a bit more info fixes #359 (73b34da8)
* **Slider:**  Adding known slider issue to documentation fixes #367 (a9d9f0fc)
* **ThemeProvider:**  Fixes empty onError property in example dropdown. closes #363 (714be619)

##### New Features

* **Dialog:**  Adds lifecycle hooks fixes #355 (68aab17e)

##### Bug Fixes

* **Switch:**  Corrects issue with controlled Switch using Safari fixes #374 (8dd7525b)
* **SelectIcon:**  Circumventing foundation to allow release due to MDC bug (e1c8fb6c)
* **MDC:**
  *  Corrects and updates imports throughout components to match MDCs new export path. #354 (b81bdf14)
  *  Corrects and updates imports throughout components to match MDCs new export path. #354 (b6438b44)
* **Radio:**
  *  removes deprecated adapter call, adds missing ripple #354 (405180e9)
  *  removes deprecated adapter call, adds missing ripple #354 (d53bb0da)

##### Refactors

* **Dependencies:**  Move all 3rd party deps to base (d163492b)
* **Select:**
  *  The Select component now uses the foundation / adapter pattern and includes an enhanced variant. A small caveat is the Select will no longer appear to show a value when no value or defaultValue is given. If you were relying on this behavior before, just pass defaultValue or value.  #354 (ef5a104e)
  *  The Select component now uses the foundation / adapter pattern and includes an enhanced variant. A small caveat is the Select will no longer appear to show a value when no value or defaultValue is given. If you were relying on this behavior before, just pass defaultValue or value.  #354 (11de8e1f)

#### 3.0.11 (2018-11-23)

##### Bug Fixes

* **TabBar:**  Corrects issue with asynchronously setting activeTabIndex (fed9f6bf)
* **Select:**  correcting id options (33836957)
* **Menu:**  Set aria-hidden dynamically for A11Y (e0eb5e1a)

#### 3.0.10 (2018-11-09)

##### Bug Fixes

* **Checkbox:**  Corrects an issue where animations would reply if checkbox display property was set to none and back #343 (f5572ae7)
* **Switch:**  Corrects issues with syncing, adds missing ripple, rewrites using Foundation adapter pattern #361 (5e95ef24)
* **Textfield:**  Corrects issue with floating label on dynamic updates #362 (c6b85926)

#### 3.0.9 (2018-10-31)

##### Bug Fixes

* **Select:**   fixes issue with floating label when programatically updating options #350 (4ccd6f47)
* **Checkbox:**  corrects remaining sync issues https://github.com/material-components/material-components-web/issues/4018 (1bcd0ced)

#### 3.0.8 (2018-10-30)

##### Documentation Changes

* **TextFieldHelperText:**  Fix missing docs fixes #352 (b39f4696)

##### Bug Fixes

* **Checkbox:**  Corrects issue deep in MDC that would cause React to not fire event handlers #312 (3ffef39d)
* **Textfield:**  Corrects issue where controlled required textfields render as invalid initially fixes #297 (c217bca7)
* **ListItem:**  added disabled state for Item in List (f32f557c)

#### 3.0.7 (2018-10-24)

##### Bug Fixes

* **Component:**  Corrects a regression for prop spreading on the slider component. (3580a6a0)

#### 3.0.6 (2018-10-24)

##### Refactors

* **Slider:**  Implements directly through foundation, drastically improves performance. (6b42908b)

#### 3.0.5 (2018-10-15)

##### Bug Fixes

* **Select:**
  *  Correct TS issue for style (7703a6e1)
  *  Allows style object to be applied to root of component #341 (0321ca1f)
* **TextField:**
  *  Corrects ‘undefined’ being rendered as className #335 (9240be21)
  *  corrects issue where TextField label does not respond to state change #338 (ea1e683b)
* **Tabs:**  make conditional tabs work even after re-render (3d2ca8f3)

#### 3.0.4 (2018-10-04)

##### Bug Fixes

* **TextField:**  Fixes #334 Corrects issue with PropsList on foundation components not merging user passed props (7a370707)

#### 3.0.3 (2018-10-02)

##### Bug Fixes

* **Flow:**  Corrects FlowTyped issue with Flow 0.82.0 and Provider. (464a4bfa)

#### 3.0.2 (2018-10-02)

##### Bug Fixes

* **Typescript:**  Toolbar Icon Typings (912ca3fb)

#### 3.0.1 (2018-10-01)

##### Bug Fixes

* **Dependency:**  Correcting package versions from @material (e1cc1a13)

#### 2.2.3 (2018-10-01)

##### Breaking Changes

* **Dialog:**  MDC has completely overhauled dialogs. The good news is, they are easier to consume in RMWC. The new structure should be easy to convert over to but unfortunately this couldn’t be done in a non breaking manner. (3f69744d)
* **Shape:**  The Shape package has been removed from RMWC due to a new SASS only implementation. The existing 2.x.x shape package is still available to use but will no longer be updated. (17975f29)

##### Chores

* **Select:**  Remove box variant (6e582fc8)
* **TextField:**  Remove simpleTag factory. (cf7a2d49)
* **Checkbox:**
  *  Type safe fixes (128ff884)
  *  Structural improvements to code. (9c94e40b)

##### Documentation Changes

* **LibraryIntegrations:**  Adding library integrations page (8a283873)
* **Theme:**  Adding dark theme example (4413e291)

##### New Features

* **ThemeProvider:**  Allow wrapping of content to preserve layout #317 (fb6cc936)
* **Theme:**  Adding error and onError theme options (382f2562)

##### Bug Fixes

* **Menu:**  Works around an MDC issue where menu items could not be anchor tags. Also submitted a PR upstream to fix. https://github.com/material-components/material-components-web/pull/3680 #311 (a111244b)
* **Theme:**  Wrapping preserves className on child node #327 (2ecb14fb)
* **Switch:**  apply className to switch root (17c0d90f)
* **Select:**  Honoring default value if passed (5b7ba066)
* **Radio:**  Adding classes to root (73a156ef)

##### Refactors

* **TextField:**  Rewrite to directly use foundation implementation. (9c77a0bf)
* **Radio:**  Using Foundation pattern. (a6c39a97)
* **Checkbox:**  Rendering perf improvement (f18209fd)

#### 2.2.3 (2018-09-24)

##### Bug Fixes

* **CircularProgress:**  Adding missing dependency to main rmwc package.json (46943e79)

#### 2.2.2 (2018-09-21)

##### Bug Fixes

* **Icon:**  Correcting icon sizing spec. (d7e95750)

#### 2.2.1 (2018-09-21)

##### Bug Fixes

* **Fab:**  Allows Fab to accept children (e13c68ff)

#### 2.2.0 (2018-09-20)

##### New Features

* **CircularProgress:**  Adding circular progress RMWC addon component. (8db0f60a)
* **Icon:**  Adding icon sizes (3e7dcf39)

##### Bug Fixes

* **Checkbox:**  Enhancing Typescript definition (dc9d46c2)

##### Refactors

* **Component:**  replacing simpleTag with more effecient base Component. (468a8d3c)

#### 2.1.3 (2018-09-19)

#### 2.1.2 (2018-09-19)

##### Chores

* **Typescript:**  Upgrade to 3.0.0 and fix @node types issue (68eb0d50)

##### Bug Fixes

* **DataTable:**  Scrolling and control alignment. (668420e9)

##### Refactors

* **Checkbox:**  Correcting sync issues by rewriting with standard foundation adpater. (8aa98d5a)

#### 2.1.1 (2018-09-18)

##### Bug Fixes

* **GridList:**  Adding missing dependency for styles (b4aac1c2)

#### 2.1.0 (2018-09-14)

##### New Features

* **DataTable:**  Adds custom DataTable component (3e2ac4a4)

##### Bug Fixes

* **TextField:**  removing marginTop (1981e18f)
* Textarea is including margin-top. (9869aab8)

#### 2.0.2 (2018-09-12)

##### Documentation Changes

* **Favicon:**  Adding favicon fixes #306 and adding missing switch styles fixes #307 (9a0ad1a3)

##### Bug Fixes

* **TS:**  Massive type cleanup (f44276ed)

#### 2.0.0 (2018-09-09)

##### Bug Fixes

* **TopAppBarFixedAdjust:**  Adds missing props fixes #302 (a2ba82fb)
* **TopAppBar:**  Corrects alignStart style for TopAppBarSection (7c361034)

#### 2.0.0 (2018-09-07)

##### Bug Fixes

* **Button:**  Corrects issue with disappearing Ripple #298 (c20b28b5)

#### 2018-09-07

#### 2018-09-07

#### 2018-09-06

#### 2018-09-06

#### 2018-09-06

#### 2018-09-06

#### 2018-09-06

#### 2018-09-06

#### 1.9.4 (2018-09-06)

#### 1.9.4 (2018-09-05)

##### Bug Fixes

* **CardActions:**  Makes fullbleed type optional ([7fc51d5e](https://github.com/jamesmfriedman/rmwc/commit/7fc51d5eb78a037d2420843eda21b8589da2daaa))
* **Snackbar:**  Corrects issues with Snackbar opening twice ([ddcac118](https://github.com/jamesmfriedman/rmwc/commit/ddcac118cca2ecf10ef2e1b34bfe763951d3f434))
* **Typescript:**  Corrects cryptic typing errors about base constructor [#40](https://github.com/jamesmfriedman/rmwc/pull/40) ([7ba24123](https://github.com/jamesmfriedman/rmwc/commit/7ba241234afb469d83d835302609df4873348cd5))

#### 1.9.3 (2018-09-04)

##### Documentation Changes

* **Menu:**  Correcting Menu docs proptypes fixes [#295](https://github.com/jamesmfriedman/rmwc/pull/295) ([df9aff7a](https://github.com/jamesmfriedman/rmwc/commit/df9aff7a0b8df049aad536d84871dd3bc38988fe))

##### New Features

* **LinearProgress:**  Adding closed prop fixes [#278](https://github.com/jamesmfriedman/rmwc/pull/278) ([af015a4b](https://github.com/jamesmfriedman/rmwc/commit/af015a4b94051f222a6b2e377fbaf79d8e999c4f))
* **Menu:**  Adding missing fixed prop and behavior [#295](https://github.com/jamesmfriedman/rmwc/pull/295) ([94459c4a](https://github.com/jamesmfriedman/rmwc/commit/94459c4a0f8e594f9d9dc347d426b5c39fde30e9))

##### Bug Fixes

* **Switch:**  Fixes an issue where disabled state on switch would persist fixes [#293](https://github.com/jamesmfriedman/rmwc/pull/293) ([a9caf555](https://github.com/jamesmfriedman/rmwc/commit/a9caf555331f86900912cf32f346282d87439cca))
* **Checkbox:**  adds RAF to fix unresponsive iOS checkbox fixes [#294](https://github.com/jamesmfriedman/rmwc/pull/294) ([fb53f44f](https://github.com/jamesmfriedman/rmwc/commit/fb53f44ff24ff02f5a6118fb0153638576ac7550))
* **Typescript:**  Corrects intrinsic props for html input elements fixes [#287](https://github.com/jamesmfriedman/rmwc/pull/287) ([54b2e2b9](https://github.com/jamesmfriedman/rmwc/commit/54b2e2b93a8d3c2ec9f696dce87b669eb73c32cf))

#### 1.9.2 (2018-08-31)

##### Bug Fixes

* **TypeScript:**  Adding ListItemPropsT to SimpleTagPropsT ([ba27d886](https://github.com/jamesmfriedman/rmwc/commit/ba27d886785e8f28d03c38cbddcfacb318a2f98a))

#### 1.9.1 (2018-08-30)

##### Bug Fixes

* **Menu:**  Corrects onSelected -> onSelect. Adds example in documentation. ([b164dad3](https://github.com/jamesmfriedman/rmwc/commit/b164dad3bb2ca34d90eb067f067460d2f0763157))

#### 1.9.0 (2018-08-29)

##### Breaking Changes

* **CardAction:**  Aligning with IconButton props. ([6901499f](https://github.com/jamesmfriedman/rmwc/commit/6901499f35cc524636c60add876723f0b00592e9))
* **Drawer:**  Matching MDC refactor of Drawers. persistent -> dismissible, temprorary -> modal. Permanent drawers are now used by default and dont have to be specified. DrawerContent is no longer an instance of the List component and can contain any content. ([9a675b33](https://github.com/jamesmfriedman/rmwc/commit/9a675b332f797f44956b31b1c9cd66d086b3144e))
* **IconButton:**  Refactor to match MDC refactor. The props interface has been simplified to support standard IconButtons and IconToggles ([c2ea570e](https://github.com/jamesmfriedman/rmwc/commit/c2ea570e19bbe5de1d760f93b93a494b9b0f0e0c))
* **Menu:**  MenuSurface has been renamed to MenuSurfaceAnchor. If you’re using SimpleMenu you will not be affected. ([c12a8358](https://github.com/jamesmfriedman/rmwc/commit/c12a83585149a0158ae14b8b169ba6b87aaa1e22))
* **Tabs:**  TabBar and Tabs have been completely overhauled by material-components-web, the good news is, they’re much simpler! RMWC has insulated from changes as best as possible. onChange: evt.detail.activeTabIndex becomes onActivated: evt.detail.index. TabBarScroller no longer and exists and TabBars scroll by default when there is enough content. Also, TabIcons and TabIconText are now built into the Tab component directly. ([5d0db7a2](https://github.com/jamesmfriedman/rmwc/commit/5d0db7a2c437c2ddf9afe826f792d85439357a03))
* **List:**  ListItemText is no longer required for single line lists. For multi line lists, it is required as a wrapper for PrimaryText and SecondaryText. If you’re using SimpleListItem, everything should just keep working without any changes. [#281](https://github.com/jamesmfriedman/rmwc/pull/281) ([dfb6e266](https://github.com/jamesmfriedman/rmwc/commit/dfb6e2669dccd8435fdb6645cdb34708116d3d72))

##### Chores

* **Switch:**  Upgrading to new switch component [#281](https://github.com/jamesmfriedman/rmwc/pull/281) ([13a51019](https://github.com/jamesmfriedman/rmwc/commit/13a51019d9f81a5038f40cdad031986e3805e39d))

##### Documentation Changes

* **Styles:**  Docs now include where to import the individual component styles ([f406bac3](https://github.com/jamesmfriedman/rmwc/commit/f406bac3f11a3cf98799e43c15eccc72a325fdd8))
* **Controls:**  Adding more examples ([0e040059](https://github.com/jamesmfriedman/rmwc/commit/0e040059906c10ad8ceae3a379233e19ef8ffdeb))
* **List:**  Adding Checkbox list example ([67c750d5](https://github.com/jamesmfriedman/rmwc/commit/67c750d5ea9ba99f06fc6f5467792feb970a38a8))
* **Styling And Theming:**
  *  fixed the prettier problems ([4a9a59d6](https://github.com/jamesmfriedman/rmwc/commit/4a9a59d6c7fc3743b950faa666886a24fb8f958c))
  *  fixed the prettier problems ([ce8bfd05](https://github.com/jamesmfriedman/rmwc/commit/ce8bfd05d338b97dee125de19af3c3954b7d18f1))
  *  added section Theme and ThemeProvider in docs ([4897e234](https://github.com/jamesmfriedman/rmwc/commit/4897e234f3abf465d31f792fa96d61257aff5983))
* **Theming:**  fixed the link to theming with runtime css variables ([1f0ec06c](https://github.com/jamesmfriedman/rmwc/commit/1f0ec06cd45dcdf37181fbff7a0e03b269e07e88))
* **Styling:**  renamed docs menu and url name Styling to Styling and Theming (and their import in menuContent.js) ([579510e8](https://github.com/jamesmfriedman/rmwc/commit/579510e8093e0c3a352fb7745ecefe1d0f344e4a))

##### New Features

* **ThemeProvider:**  automatically determining light and dark text color palettes. ([3378b2f8](https://github.com/jamesmfriedman/rmwc/commit/3378b2f89fac402ea84f7e5b19c7fb32ecfa258d))
* **MenuSurface:**  Adds menu surface component ([cd1f598b](https://github.com/jamesmfriedman/rmwc/commit/cd1f598b03fb6a6bed6d51406f077ab70b401968))

##### Bug Fixes

* **Select:**  corrects issue with label not floating. Fixes [#283](https://github.com/jamesmfriedman/rmwc/pull/283) ([2fcca699](https://github.com/jamesmfriedman/rmwc/commit/2fcca6991139bb9256929c4c3a8a46a854678f63))
* **Menu:**  Corrects JS error from timer being fired after unmount ([b95fff80](https://github.com/jamesmfriedman/rmwc/commit/b95fff80b848effc108b0a2f04ef6d6449e1be28))
* **Tabs:**  Corrects focus issue when activating initial tab ([0eac6982](https://github.com/jamesmfriedman/rmwc/commit/0eac69821fd9cfc0325226305a566a74d19131a0))
* **Checkbox:**  Corrects event handling with new foundation pattern. ([12d42546](https://github.com/jamesmfriedman/rmwc/commit/12d42546abf5372e893155d18f770bf0336a9a1c))
* **TextField:**  Fixes issue with deprecated single line input ([9663311f](https://github.com/jamesmfriedman/rmwc/commit/9663311fcf62ac433c17b13c58daa0265d4a552c))
* **Type Defs:**  strengthened Typings for Provider and Icon ([c4c9eabb](https://github.com/jamesmfriedman/rmwc/commit/c4c9eabb70b7047f4db534051e253f79cf2865b8))

##### Other Changes

* **ThemeProvider:**  Adding information about auto colors ([5f9194d9](https://github.com/jamesmfriedman/rmwc/commit/5f9194d91ff8cdcdd30530aeb55fc14f72ed2fe1))

##### Refactors

* **Icon:**  The Icon component props interface has been altered to better accomodate other components that are extending the Icon. A deprecation notice is posted and the old props handling will be removed in the next release of RMWC. ([ee826735](https://github.com/jamesmfriedman/rmwc/commit/ee8267351825e0fb07e4571dd888316fedf44564))

#### 1.8.3 (2018-07-19)

##### Documentation Changes

* **Composition:**  added the ability to show a components extended props (mainly for icons). Not implementing until the Icon component gets a makeover. ([9d57240b](https://github.com/jamesmfriedman/rmwc/commit/9d57240bcebc9e68de00906906ab12dbfd285461))

##### Bug Fixes

* **Switch:**  Corrects type issue with Switch component. ([f07df980](https://github.com/jamesmfriedman/rmwc/commit/f07df9801f6cf554021f11fa414754a856cfc952))
* **Version:**  Corrects a potential issue with MCW versioning, making sure to only grab the most recent patch since minor versions in their code can be breaking. ([24af877e](https://github.com/jamesmfriedman/rmwc/commit/24af877e4441c1eb05f6d7f36721b12c11de1a37))

#### 1.8.2 (2018-07-16)

##### Bug Fixes

* **Build:**  ignoring test react-versions which was bloating published npm version ([2c08f022](https://github.com/jamesmfriedman/rmwc/commit/2c08f022a98ccd3a08eef517d316725572e97b85))

#### 1.8.1 (2018-07-13)

##### New Features

* **ThemeProvider:**  Adds ThemeProvider based on comment from [#90](https://github.com/jamesmfriedman/rmwc/pull/90) ([ad035684](https://github.com/jamesmfriedman/rmwc/commit/ad035684d4a3a7b1f2ad1db4279d145b7c965c91))

##### Bug Fixes

* **TopAppBar:**  Corrects static title on SimpleTopAppBar. ([f4d04f77](https://github.com/jamesmfriedman/rmwc/commit/f4d04f773aa8e682a8ea6b63096fd1fae667e17f))

#### 1.8.0 (2018-07-12)

##### Breaking Changes

* **IconButton:**  New IconButton component has been added. IconToggles still exist but are now deprecated. The breaking changes are related to Cards and CardAction which now use the IconButton component instead of Icontoggle. [#267](https://github.com/jamesmfriedman/rmwc/pull/267) [#242](https://github.com/jamesmfriedman/rmwc/pull/242) ([e2abba59](https://github.com/jamesmfriedman/rmwc/commit/e2abba599057b9565aeda8825c830287f30df68a))

##### Documentation Changes

* **ThemePicker:**  added a global theme picker to the docs [#90](https://github.com/jamesmfriedman/rmwc/pull/90) ([5ff0f0e8](https://github.com/jamesmfriedman/rmwc/commit/5ff0f0e8642976a83f6f6d49509a915a572344f9))
* **Ripple:**  Adding documentation on disabling Ripples [#249](https://github.com/jamesmfriedman/rmwc/pull/249) ([420dbe93](https://github.com/jamesmfriedman/rmwc/commit/420dbe930505a465e3423938d62303a03c007bb1))
* **Tests:**  Updated documentation on testing [#250](https://github.com/jamesmfriedman/rmwc/pull/250) ([cec3ec69](https://github.com/jamesmfriedman/rmwc/commit/cec3ec69b15a3210baace00c99ea110c0383c7ae))
* **List:**  Update nonInteractive description. [#264](https://github.com/jamesmfriedman/rmwc/pull/264) ([6146fc15](https://github.com/jamesmfriedman/rmwc/commit/6146fc159c2ede2d1a035314836ed2aec67e6da0))

##### New Features

* **Chip:**  Adding onRemove. ([20e8771d](https://github.com/jamesmfriedman/rmwc/commit/20e8771d7664847c7501f6e4be3c87bbdd2c32e4))
* **TopAppBar:**  Adding SimpleTopAppBar [#257](https://github.com/jamesmfriedman/rmwc/pull/257) ([3c351234](https://github.com/jamesmfriedman/rmwc/commit/3c351234ac596049876a5b941e10d065d96614f1))
* **Grid:**  Add a custom GridInner component [#266](https://github.com/jamesmfriedman/rmwc/pull/266) ([6ffa9c54](https://github.com/jamesmfriedman/rmwc/commit/6ffa9c5451d053cc8c106f1ef600c5d20511dc06))
* **Select:**  adding outlined Select [#267](https://github.com/jamesmfriedman/rmwc/pull/267) ([53441918](https://github.com/jamesmfriedman/rmwc/commit/53441918ceda78d1a0e10c962f6bfc986e0f2dcb))
* **Fab:**  Adding extended Fabs [#267](https://github.com/jamesmfriedman/rmwc/pull/267) ([aebe0735](https://github.com/jamesmfriedman/rmwc/commit/aebe073562fa16f2ca77249e7075925d75d5e891))

##### Bug Fixes

* **docs:**  Fixed typo in "closed". ([d555733a](https://github.com/jamesmfriedman/rmwc/commit/d555733a268184b609e3001aba0786dce576f5a9))

#### 1.7.6 (2018-06-28)

##### Bug Fixes

* **Typescript:**  adding in material-components-web types ([b8433a86](https://github.com/jamesmfriedman/rmwc/commit/b8433a860258694bc9d79136fa1c12fcba8523d1))

#### 1.7.5 (2018-06-26)

##### Bug Fixes

* **Typescript:**  Correcting types for DrawerHeader and TabBar ([1aa4eb6f](https://github.com/jamesmfriedman/rmwc/commit/1aa4eb6f5d82e565bb46be88b50d536f5132d4a2))

#### 1.7.4 (2018-06-24)

##### Documentation Changes

* **Icon:**  Fixing Icon docs ([e4ab32e4](https://github.com/jamesmfriedman/rmwc/commit/e4ab32e4069380d5a577c77528df132b77b998da))

##### Bug Fixes

* **Typescript:**  Default HTML attributes ([8c186b24](https://github.com/jamesmfriedman/rmwc/commit/8c186b24e75842392a9a4cde4018f0d49475d016))

#### 1.7.3 (2018-06-22)

##### Bug Fixes

* **Tabs:**  Corrects a regression with the tab onChange handler not firing. ([81e251a0](https://github.com/jamesmfriedman/rmwc/commit/81e251a02e268724fc341b08c2f8ae3463412bca))
* **Checkbox:**  Corrects controlled syncronicity issue fixes [#247](https://github.com/jamesmfriedman/rmwc/pull/247) ([dbb87b78](https://github.com/jamesmfriedman/rmwc/commit/dbb87b789f3bf34a90d15bf6e79a1ebcca2e2a6b))

#### 1.7.2 (2018-06-20)

#### 1.7.1 (2018-06-15)

##### Bug Fixes

* **Checkbox:**  Corrects controlled syncronicity issue fixes [#247](https://github.com/jamesmfriedman/rmwc/pull/247) ([dbb87b78](https://github.com/jamesmfriedman/rmwc/commit/dbb87b789f3bf34a90d15bf6e79a1ebcca2e2a6b))

#### 1.7.0 (2018-06-13)

##### Breaking Changes

* **Tabs:**  Converted TabBar, Tab, and TabBar scroller to Foundation. evt.target.value is now evt.detail.activeTabIndex to match MDCs custom event api. ([3b613d51](https://github.com/jamesmfriedman/rmwc/commit/3b613d5110d01264aa1162ca778b4ef78fb173fa))

##### Chores

* **CustomEvent:**
  *  Fixing missing types ([05b2e3e6](https://github.com/jamesmfriedman/rmwc/commit/05b2e3e65ff1cdf99590c6b5fb1c70cb329f5295))
  *  properly typing CustomEvents ([2cbf25c7](https://github.com/jamesmfriedman/rmwc/commit/2cbf25c7d36ed126bd3f2a26eb1296d81cb07096))
* **SEO:**  adding some basic SEO enhancements fixes [#166](https://github.com/jamesmfriedman/rmwc/pull/166) ([d4164ac4](https://github.com/jamesmfriedman/rmwc/commit/d4164ac49e1d42316d75e94a16dc1737a51a397f))
* **MDC:**  Upgrading MDC version to 36 [#239](https://github.com/jamesmfriedman/rmwc/pull/239) ([fbc463b3](https://github.com/jamesmfriedman/rmwc/commit/fbc463b337b22751624c9fcc18e09e2cf7244b31))
* **Foundation:**  removal of dead code and final cleanup [#239](https://github.com/jamesmfriedman/rmwc/pull/239) ([6bc9eda6](https://github.com/jamesmfriedman/rmwc/commit/6bc9eda69a2960046a4c8553b1d9e4d6af323191))
* **LinearProgress:**  Refactor to Foundation pattern [#239](https://github.com/jamesmfriedman/rmwc/pull/239) [#195](https://github.com/jamesmfriedman/rmwc/pull/195) [#141](https://github.com/jamesmfriedman/rmwc/pull/141) ([84a02f03](https://github.com/jamesmfriedman/rmwc/commit/84a02f034f4ed12be825a0c384614986cd8ef033))
* **Snackbar:**  Refactor to MDC Foundation [#197](https://github.com/jamesmfriedman/rmwc/pull/197) [#141](https://github.com/jamesmfriedman/rmwc/pull/141) [#239](https://github.com/jamesmfriedman/rmwc/pull/239) ([6c29300f](https://github.com/jamesmfriedman/rmwc/commit/6c29300f2d4aac2b647bb82d715efb8f69182f27))
* **Drawer:**  Refactor Drawer to Foundation component [#193](https://github.com/jamesmfriedman/rmwc/pull/193) [#239](https://github.com/jamesmfriedman/rmwc/pull/239) ([089ef66e](https://github.com/jamesmfriedman/rmwc/commit/089ef66e158511c0b64e51b20106f8f1d5d2bd8f))

##### Documentation Changes

* **Flow:**  Documenting flow-typed setup [#231](https://github.com/jamesmfriedman/rmwc/pull/231) ([a58ec529](https://github.com/jamesmfriedman/rmwc/commit/a58ec529574a61a7bc2913b73e160e4efed0421a))
* **Bundle Size:**  correcting bundle size in docs ([5410f1ea](https://github.com/jamesmfriedman/rmwc/commit/5410f1ea910b908cb3ca6fffc7a4e7d20c9d175b))

##### New Features

* **TopAppBarFixedAdjust:**  Adding TopAppBarFixedAdjust component fixes [#245](https://github.com/jamesmfriedman/rmwc/pull/245) ([cd1d0cff](https://github.com/jamesmfriedman/rmwc/commit/cd1d0cff6f1a5ba189830daf809fd9a317dd65dd))

#### 1.6.4 (2018-05-25)

##### Chores

* **MDC:**  Upgrading to 0.35.2 ([7ed0545b](https://github.com/jamesmfriedman/rmwc/commit/7ed0545bdfb5ac97cc86d54eac1dad9adea9d85b))

#### 1.6.3 (2018-05-14)

##### Chores

* **Docs:**  fixing typos ([1e2df56d](https://github.com/jamesmfriedman/rmwc/commit/1e2df56d5d0ff5bfa57f075eebc2c8316c488363))

##### Bug Fixes

* **Switch:**  makes children FlowType for switch optional. ([4f7ec1db](https://github.com/jamesmfriedman/rmwc/commit/4f7ec1db14a0c6a38f33b5dbe39b367180ba0764))

#### 1.6.2 (2018-05-09)

##### Documentation Changes

* **Home:**  correcting header css issue ([c1964721](https://github.com/jamesmfriedman/rmwc/commit/c19647214712b2c5bec5619430faccf0ea2ed26d))

##### Bug Fixes

* **MDC:**  Bumping version to 0.35.1 ([a464d0c6](https://github.com/jamesmfriedman/rmwc/commit/a464d0c6f0936b44f1c6d0b744d0af14409ac830))

#### 1.6.1 (2018-05-06)

##### Bug Fixes

* **Flow:**  Correcting optional types ([a11b4a01](https://github.com/jamesmfriedman/rmwc/commit/a11b4a01a0ec1b45834b712890f0d79bb915a5d5))

#### 1.6.0 (2018-05-03)

##### Breaking Changes

* **Theme:**  MDC breaking change, they refactored their theme option names [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([86fa087a](https://github.com/jamesmfriedman/rmwc/commit/86fa087a2864f3198435cb5288ca793ee6f84b08))
* **Typography:**  MDC breaking change, updates almost all typography names. [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([8d77666b](https://github.com/jamesmfriedman/rmwc/commit/8d77666bd87380a824028c071a8597cdb647b1ad))
* **Card:**  MDC breaking change, `stroked` prop changed to `outlined` [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([62ab4157](https://github.com/jamesmfriedman/rmwc/commit/62ab4157a418acc0076eca95103df849a947f16b))
* **Button:**  MDC breaking change, stroked renamed to oulined [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([979b1fc1](https://github.com/jamesmfriedman/rmwc/commit/979b1fc13cb8ab9b9742ad0f5f2c71e45958ef05))

##### Chores

* **Select:**  Updates label and bottom line to new components [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([ef6806da](https://github.com/jamesmfriedman/rmwc/commit/ef6806da550731bc5b0cfb695e71c9421b358b30))
* **Menu:**  Implementing Menu via MDC foundation integration. [#210](https://github.com/jamesmfriedman/rmwc/pull/210) [#196](https://github.com/jamesmfriedman/rmwc/pull/196) ([8661541d](https://github.com/jamesmfriedman/rmwc/commit/8661541d162c7a47b8bc2406149bbf9dcc8d01c5))
* **FormField:**  Converting to foundation component [#210](https://github.com/jamesmfriedman/rmwc/pull/210) [#194](https://github.com/jamesmfriedman/rmwc/pull/194) ([495fda32](https://github.com/jamesmfriedman/rmwc/commit/495fda3200f487440b71c531019ea353d7cd9a54))
* **Typography:**  adding SSR test ([1c18a555](https://github.com/jamesmfriedman/rmwc/commit/1c18a55575a128f16ba5f219cf7f7c4607dbc2de))
* **Switch:**  Code cleanup and SSR test [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([b706f671](https://github.com/jamesmfriedman/rmwc/commit/b706f67191df3590a6042168c9a79673ea3790c8))
* **Radio:**  Implemented via Foundation [#210](https://github.com/jamesmfriedman/rmwc/pull/210) [#192](https://github.com/jamesmfriedman/rmwc/pull/192) ([9bc4b5ea](https://github.com/jamesmfriedman/rmwc/commit/9bc4b5ea38b482845cb183d7260551e26cdfa0e8))
* **Foundation:**  Removing class adapter handling due to repetitive renders [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([caa23edc](https://github.com/jamesmfriedman/rmwc/commit/caa23edc61f8cc762f0a9feade141a76b7f98833))
* **Checkbox:**  Implements Checkbox via Foundation [#210](https://github.com/jamesmfriedman/rmwc/pull/210) [#191](https://github.com/jamesmfriedman/rmwc/pull/191) ([1c6edfae](https://github.com/jamesmfriedman/rmwc/commit/1c6edfaea3c33af5c26506e2519819470c908842))
* **FlowType:**  Fixes all flow type issues through codebase, adds flow check to test suite, correctly exports .flow definition files for 3rd party comsumption [#210](https://github.com/jamesmfriedman/rmwc/pull/210) [#159](https://github.com/jamesmfriedman/rmwc/pull/159) [#40](https://github.com/jamesmfriedman/rmwc/pull/40) ([1158af9e](https://github.com/jamesmfriedman/rmwc/commit/1158af9ea1a9d701520ba0bca9c6377f2c247873))
* **TopAppBar:**  adding class adapter methods and dense story ([88abec3c](https://github.com/jamesmfriedman/rmwc/commit/88abec3ce9ab3ef8175f6cf6130824ac797667dd))

##### Documentation Changes

* **Readme:**  Updating Readme for latest release. [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([a5dd8338](https://github.com/jamesmfriedman/rmwc/commit/a5dd83382924fa5539cf7ed0abc2da8bcc8da40f))

##### New Features

* **ImageList:**  Adding new MDC ImageList component. [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([3b8f0504](https://github.com/jamesmfriedman/rmwc/commit/3b8f0504cf5cec0f60130dee7e8f05d844e8ab68))
* **ShapeContainer:**  Adding new ShapeContainer component and docs [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([748294e6](https://github.com/jamesmfriedman/rmwc/commit/748294e6219d9e79a83f84f33f4cf63b5feedbac))
* **TopAppBar:**  New top app bar component added [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([fc082b67](https://github.com/jamesmfriedman/rmwc/commit/fc082b67696ff5bfe211f933564d831712f28793))

##### Bug Fixes

* **Base:**  Removing apiRef from spread props [#210](https://github.com/jamesmfriedman/rmwc/pull/210) ([94dab63a](https://github.com/jamesmfriedman/rmwc/commit/94dab63a175271af77916666bfa02423bf6fdca5))
* **Menu:**  Corrects sync issue causing double click handlers and jittery animations ([285404c3](https://github.com/jamesmfriedman/rmwc/commit/285404c3ea21b82d42b87a4439aeeca782007390))

#### 1.5.6 (2018-04-23)

##### Bug Fixes

* **TextField:**  Corrects issue with syncing props quickly [#216](https://github.com/jamesmfriedman/rmwc/pull/216) ([12182722](https://github.com/jamesmfriedman/rmwc/commit/1218272222cf6d20fee598e4c6992761f62f8cfa))
* **dependencies:**  Adds hyperform and mutation as explicit dependency since they are required for testPolyfill [#217](https://github.com/jamesmfriedman/rmwc/pull/217) ([72176dac](https://github.com/jamesmfriedman/rmwc/commit/72176dac3ee9e0292ef726466814ff70d0cde3c9))
* **className:**  Removes redundant classNames on ripple elements [#218](https://github.com/jamesmfriedman/rmwc/pull/218) ([22be2ab5](https://github.com/jamesmfriedman/rmwc/commit/22be2ab5fcbb6f3eaa2d097a05b016e4ff3d6b6f))

#### 1.5.5 (2018-04-20)

##### Bug Fixes

* **Foundation:**  corrects issues with prop syncing from an event when a component removes itself. [#215](https://github.com/jamesmfriedman/rmwc/pull/215) ([3a5ec764](https://github.com/jamesmfriedman/rmwc/commit/3a5ec7648ce8b448c7e8edf652fb6722a4db4e9c))

#### 1.5.4 (2018-04-19)

##### Documentation Changes

* **Styling:**  adding a little more clarity to css runtime vars [#212](https://github.com/jamesmfriedman/rmwc/pull/212) ([8421c37c](https://github.com/jamesmfriedman/rmwc/commit/8421c37cb7524a724654544cc0faf46b9f22c69d))

##### Bug Fixes

* **TextField:**  corrects issue with trailing icon alignment when using custom icon rendering. ([9890736c](https://github.com/jamesmfriedman/rmwc/commit/9890736c518bff8ebb8affb211ec80ec2747c126))
* **Foundation:**
  *  foundation destroy must be explicitly called, fixing ripple tear down bug. ([eb8d126e](https://github.com/jamesmfriedman/rmwc/commit/eb8d126e04632828fd4dd1825cec201d4f9010e6))
  *  Component destroy was not being copied onto the new prototype and called resulting in memory leaks. ([70ff32ce](https://github.com/jamesmfriedman/rmwc/commit/70ff32cefbf94670f19c91f29b11dc3e5d8cf2c3))

#### 1.5.3 (2018-04-10)

##### Documentation Changes

* **Readme:**  Adding react version coverage ([d9334e2a](https://github.com/jamesmfriedman/rmwc/commit/d9334e2a54dbd04032abd8dde8a75ecfd11b54dc))

##### New Features

* **Test:**  Testing in multiple versions of react ([512828d9](https://github.com/jamesmfriedman/rmwc/commit/512828d910675104f272b32371b4ade84c270005))

##### Bug Fixes

* **Select:**  don’t specify value and default value ([0604c299](https://github.com/jamesmfriedman/rmwc/commit/0604c299c143eac14963a01666d3a89378282774))

#### 1.5.2 (2018-04-06)

##### Bug Fixes

* **Select:**  Corrects issue with syncing of disabled prop ([44fae50b](https://github.com/jamesmfriedman/rmwc/commit/44fae50b7e3dbc097c2fcb2e1774470531ff5721))

#### 1.5.1 (2018-04-06)

##### Bug Fixes

* **Select:**  Don’t spread className to native control ([54c6fc31](https://github.com/jamesmfriedman/rmwc/commit/54c6fc31b3c4fb0561470de80cf20338dee426d1))

#### 1.5.0 (2018-04-06)

##### Breaking Changes

* **Select:**  MDC switched to using native select elements. RMWC selects should be fine with a few caveats. Props now spread to the native select by default, and a rootProps prop has been added. Also, if you were relying on MDC’s ListItem as the children, they are now standard HTML option elements. [#179](https://github.com/jamesmfriedman/rmwc/pull/179) ([d7300093](https://github.com/jamesmfriedman/rmwc/commit/d7300093561b8f4222e1256ef9a69de8cb1468a0))
* **Button:**  MDC breaking change, removed compact buttons ([8d0fbcf9](https://github.com/jamesmfriedman/rmwc/commit/8d0fbcf90c9845089bdb9bc76f2cab92b62cd033))
* **Typography:**  MDC breaking change, removing adjustMargin ([f18f8542](https://github.com/jamesmfriedman/rmwc/commit/f18f85425fdf915e075f60ef2c45be3b20133e10))

##### Chores

* **Flow:**  FlowType improvements, [#159](https://github.com/jamesmfriedman/rmwc/pull/159) ([eccfb749](https://github.com/jamesmfriedman/rmwc/commit/eccfb749935fc75234691b2ad43b58377462206c))

##### Documentation Changes

* **Cleanup:**  small tweaks to docs for release ([a64f218b](https://github.com/jamesmfriedman/rmwc/commit/a64f218bc1d13aa15045a613551af6c2d5f32b96))
* **Node Version:**  Adding node version 7 as a requirement in contributing [#129](https://github.com/jamesmfriedman/rmwc/pull/129) [#179](https://github.com/jamesmfriedman/rmwc/pull/179) ([c541d960](https://github.com/jamesmfriedman/rmwc/commit/c541d960ad15034e2b055cfaa04ea1701f250864))
* **Select:**  Adding optgroup documentation. ([3774d663](https://github.com/jamesmfriedman/rmwc/commit/3774d663fc366aadd3301845074321f061873420))

##### New Features

* **Chips:**  Added chip filtering. [#179](https://github.com/jamesmfriedman/rmwc/pull/179) ([487ede3b](https://github.com/jamesmfriedman/rmwc/commit/487ede3bdc3c0f94fbcb6f14f1b75d3c17af2ab7))
* **Dialog:**  Implementing via foundation [#179](https://github.com/jamesmfriedman/rmwc/pull/179) [#177](https://github.com/jamesmfriedman/rmwc/pull/177) ([3a072b2e](https://github.com/jamesmfriedman/rmwc/commit/3a072b2e37aa7086052e146e66824eed2940ac57))
* **Grid:**  Added alignment and ordering props [#179](https://github.com/jamesmfriedman/rmwc/pull/179) closes [#178](https://github.com/jamesmfriedman/rmwc/pull/178) ([b5070705](https://github.com/jamesmfriedman/rmwc/commit/b50707052ada4cbdab8711832aff90bd6de69889))

##### Bug Fixes

* **TextField:**  Implements TextField foundation. [#179](https://github.com/jamesmfriedman/rmwc/pull/179) Closes [#128](https://github.com/jamesmfriedman/rmwc/pull/128), [#156](https://github.com/jamesmfriedman/rmwc/pull/156) ([bde5cd3f](https://github.com/jamesmfriedman/rmwc/commit/bde5cd3fb6d100f2596aa7fd7776884ca5ed52fa))
* **Ripple:**  Corrects an issue where Ripple would not properly handle using the tag prop with non RMWC components. [#176](https://github.com/jamesmfriedman/rmwc/pull/176) ([9fb80192](https://github.com/jamesmfriedman/rmwc/commit/9fb8019252efe5e0fd972f73e454c92dc79adbb6))

#### 1.4.1 (2018-03-26)

##### Bug Fixes

* **Select:**
  *  incorrect tabIndex attribute ([f6e81c39](https://github.com/jamesmfriedman/rmwc/commit/f6e81c39e744a7f216b8253baf232af3105ff770))
  *  Unknown attribute ‘options’ in older versions of react. ([443015ab](https://github.com/jamesmfriedman/rmwc/commit/443015ab9e6876f9603bd2bd4d49c6748f048889))
* **Slider:**
  *  Temporary workaround for MDC issue where min values greater than 100 ([da228d41](https://github.com/jamesmfriedman/rmwc/commit/da228d417b6fdf405812abe4123ef1dc89e2cb44))
  *  Temporary workaround for MDC issue where min values greater than 100 ([c90e899a](https://github.com/jamesmfriedman/rmwc/commit/c90e899ac2bc72613876f51ab0b003db26acd719))
* **SSR:**  Corrects server side rendering for foundation based components ([93c2487e](https://github.com/jamesmfriedman/rmwc/commit/93c2487e2b8a0e8784b0228319732b638f72ca93))

#### 1.4.0 (2018-03-19)

##### Breaking Changes

* **Slider:**  The Slider has been directly implemented with MDC Foundation. Please use evt.detail.value instead of evt.target.value. ([1a80fa02](https://github.com/jamesmfriedman/rmwc/commit/1a80fa02d9ceb74c0bbe85a73dfcf156a59ae691))
* **IconToggle:**  IconToggle has been directly integrated with the MDCFoundation and the onChange callback will contain their synthetic event. See https://material.io/components/web/catalog/buttons/icon-toggle-buttons/ notifyChange ([2701c34e](https://github.com/jamesmfriedman/rmwc/commit/2701c34e02084a7988ff695cbc7acc269e542024))

##### Chores

* **Docs:**  fixing typos ([1ec60560](https://github.com/jamesmfriedman/rmwc/commit/1ec60560fa008edc757b4a4c33e33b8e6998e4ab))
* **FloatingLabel, LineRipple:**  Making resuasble component ([e6f8f136](https://github.com/jamesmfriedman/rmwc/commit/e6f8f136d61bd4f048f119217ed146977238df99))
* **Test:**  Improving tests for IconToggle and Slider ([9e61e547](https://github.com/jamesmfriedman/rmwc/commit/9e61e547dc7ac5ac063c2fc5584a68bef2ed7685))
* **Ripple:**  Update typing ([82186b3b](https://github.com/jamesmfriedman/rmwc/commit/82186b3b6c597a47395774244ae31716db856015))
* **IconToggle:**  cleaning up prop sync ([8f2c40ed](https://github.com/jamesmfriedman/rmwc/commit/8f2c40ed7c5b1c6acf08671d03f2f8177fc55441))

##### Documentation Changes

* **Readme:**  Updating recent changes ([ab2aa2ce](https://github.com/jamesmfriedman/rmwc/commit/ab2aa2ce619bef3742507c6145bf1a77d7d52fb5))
* **IconToggle:**  updating documentation ([e013da67](https://github.com/jamesmfriedman/rmwc/commit/e013da673af157283c6993c978c66a7690ddeb95))

##### New Features

* **ListItem:**  adds the ability to specify text only for list item meta content [#162](https://github.com/jamesmfriedman/rmwc/pull/162) ([30cdfee9](https://github.com/jamesmfriedman/rmwc/commit/30cdfee94beb72cbb972328ca70c6a839ebb9a74))
* **Flow:**  potential fix for exporting flow types and publishing es6 src [#159](https://github.com/jamesmfriedman/rmwc/pull/159) ([2d0f85af](https://github.com/jamesmfriedman/rmwc/commit/2d0f85af518454ec751ceb7839196a4df94c63bf))
* **Chip:**  Implemented with Foundation adapter, upgraded to current spec. ([cc909ce0](https://github.com/jamesmfriedman/rmwc/commit/cc909ce0d708f88bea375fd86b09e23607284220))

##### Bug Fixes

* **CardPrimaryAction:**  Adding missing ripple. ([f9e28343](https://github.com/jamesmfriedman/rmwc/commit/f9e283436188c82047fb4152d58f644484987e93))
* **Ripple:**
  *  Correcting issues with mdc-ripple-surface class ([06c6686b](https://github.com/jamesmfriedman/rmwc/commit/06c6686bb1c0890c3a9820d7cfe0d2f3e5af1b11))
  *  Correcting issues with standalone ripple use ([147fd2dd](https://github.com/jamesmfriedman/rmwc/commit/147fd2dd2f56bed400e7d849b43e28497cd61ee9))
* **IconToggle:**  Implemented via foundation ([f77e8dd4](https://github.com/jamesmfriedman/rmwc/commit/f77e8dd444778296326f0762d9035369a2f8f4e7))

#### 1.3.0 (2018-02-26)

##### Breaking Changes

* **ChipIcon:**  Added ChipIcon component which required splitting apart the Chip and ChipText component. If you were using Chips before, wrap the interior content with ChipText. ([6d3eef96](https://github.com/jamesmfriedman/rmwc/commit/6d3eef9690c69638f4f446559307cc809fdfe58a))

##### Chores

* **Chip:**  Updating storybook stories ([dfa7d48e](https://github.com/jamesmfriedman/rmwc/commit/dfa7d48ecf8d8521f45df2c1d3344ced9742d0bf))

##### Documentation Changes

* **ChipIcon:**  Adding interactive description. ([71e0506e](https://github.com/jamesmfriedman/rmwc/commit/71e0506ebb2b049eb226f3c2e0dabf54809f35bd))

##### New Features

* **CardPrimaryAction:**  Adding CardPrimaryAction container. ([f2ac2a39](https://github.com/jamesmfriedman/rmwc/commit/f2ac2a398a17072f3d0a4ff759d5693a985bc1a9))

#### 1.2.1 (2018-02-20)

##### Chores

* **Dialog:**  Add scrollable prop type defintion to DialogBody ([15b8b481](https://github.com/jamesmfriedman/rmwc/commit/15b8b481cdb2c901aa91992fe79b85e5a5722070))

##### Documentation Changes

* **TextField:**  Adding disabled example ([8c00ad2a](https://github.com/jamesmfriedman/rmwc/commit/8c00ad2a79027a2ccb409e03eaa1e839b21f15ca))
* **Dialog:**  Fix issue with description docgen of DialogFooterButton ([64e02268](https://github.com/jamesmfriedman/rmwc/commit/64e02268f615b156ac7c6a387bce6fda79e60b86))
* **Chips:**  Fixing chips link ([5111ed80](https://github.com/jamesmfriedman/rmwc/commit/5111ed8050b9a254c9d8833fd6c3416abfd8d9e4))

##### Bug Fixes

* **textfield:**  add mdc class on disabled textfields ([b7c8fccf](https://github.com/jamesmfriedman/rmwc/commit/b7c8fccfd2ef96da689d05a20f484eb18d8789ea))

#### 1.2.0 (2018-02-13)

##### Breaking Changes

* **Card:**  matching MDC30 complete revamp of cards ([356a19ab](https://github.com/jamesmfriedman/rmwc/commit/356a19ab48808492399691e16b6157dd67058ca6))
* **DarkTheme:**  removing dark theme following its removal from material-components-web ([a4714dfe](https://github.com/jamesmfriedman/rmwc/commit/a4714dfe8b4ba9654836797da097837463b711c8))
* **select:**  remove cssOnly select ([f6990466](https://github.com/jamesmfriedman/rmwc/commit/f69904665f87667dc536a5ab9b0894ddb76370a4))

##### Chores

* **TextField:**  rename mdc-text-field__bottom-line -> mdc-line-ripple ([add1cba4](https://github.com/jamesmfriedman/rmwc/commit/add1cba48132007629a64f8c736f7101eb223d7a))

##### Documentation Changes

* **Icon:**  Fixing inconsistent headers ([ffbc0292](https://github.com/jamesmfriedman/rmwc/commit/ffbc02921a43b7ebb87fcd79456025bf8fe36d51))
* **Theme:**  Removing dark from the theme examples ([a0511f8b](https://github.com/jamesmfriedman/rmwc/commit/a0511f8b3fb935696ece2516edced4ab8c7cbd04))
* **SnackBar:**  Fix z-index issue which was cutting off start aligned SnackBars ([8dc07c79](https://github.com/jamesmfriedman/rmwc/commit/8dc07c79247b1588ae80efd311a38f69f3603d55))
* **Dialog:**  Rendering SimpleDialog example ([10c9efca](https://github.com/jamesmfriedman/rmwc/commit/10c9efca3596e0828e8d17f686631ea29203b949))

##### New Features

* **SimpleMenu:**  Adding SimpleMenu component that auto manages open state ([7b65488e](https://github.com/jamesmfriedman/rmwc/commit/7b65488e20648557325d106850d85d545e3f731e))
* **ButtonIcon:**  Adding ButtonIcon component. ([ca9cf996](https://github.com/jamesmfriedman/rmwc/commit/ca9cf99640d82f916dc02f6051f63070eadabc82))
* **Chip:**  Adding chip component ([967fb60e](https://github.com/jamesmfriedman/rmwc/commit/967fb60e48fc96d270718bc23ee222a228e18851))
* **menu:**  property to intialize the menu with a open state ([2b0855bb](https://github.com/jamesmfriedman/rmwc/commit/2b0855bb64eaf66c675059f7fd3b754fc8782d8c))
* **select:**  add box attribute to select ([5eba4853](https://github.com/jamesmfriedman/rmwc/commit/5eba4853813895142965b326a52dd9265210b544))

##### Bug Fixes

* **Ripple:**  corrects an issue where the Ripple would not respect unbounded ([2d7cabe2](https://github.com/jamesmfriedman/rmwc/commit/2d7cabe2cd245771d6601d1b8cf2ceb6ccdefc9a))
* **TabBar:**  Corrects an issue where a children check would fail if there was only one Tab [#142](https://github.com/jamesmfriedman/rmwc/pull/142) ([82217f85](https://github.com/jamesmfriedman/rmwc/commit/82217f85b0005de30413f8e166fa03b977ddd2fe))
* **TextField:**  Corrects an issue where uncontrolled TextFields could get out of sync with MDC ([a58d5830](https://github.com/jamesmfriedman/rmwc/commit/a58d583060037b89e02297d223c09d47d6b60b24))
* **checkbox:**  change mdc-checkbox__checkmark__path to mdc-checkbox__checkmark-path ([da3e8fe5](https://github.com/jamesmfriedman/rmwc/commit/da3e8fe5ad69d85cddc917f82d20bfea363802a5))
* **select:**  remove cssOnly select ([04a10b20](https://github.com/jamesmfriedman/rmwc/commit/04a10b20bc330023efd365edc31307d8d062d0ca))
* **menu:**  remove simple tags from menu ([ea267753](https://github.com/jamesmfriedman/rmwc/commit/ea267753bbc730dfecb9f29ecbda3c55fc4682e7))

##### Other Changes

*  issues 143 ([932b0fc5](https://github.com/jamesmfriedman/rmwc/commit/932b0fc5e7f9569bc9476f5f89c10003b9486e06))
*  on mounting open without animation ([cc05e8a0](https://github.com/jamesmfriedman/rmwc/commit/cc05e8a04ee68570fa37dbcdee8747debe1ea47a))
* **select:**  add box attribute to select ([9fbb3118](https://github.com/jamesmfriedman/rmwc/commit/9fbb3118ca5ca66162f817e70a60534a4477fb4c))

#### 1.1.3 (2018-02-12)

##### Bug Fixes

* **TextField:**  Corrects issue with the invalid prop not syncing ([70b06db8](https://github.com/jamesmfriedman/rmwc/commit/70b06db80d2ec2684e1f9cde89d16fda6f35c87f))

#### 1.1.2 (2018-02-05)

##### New Features

* **GridList:**  add GridTileIcon ([060b2fad](https://github.com/jamesmfriedman/rmwc/commit/060b2fadea75a8f742d7ac989db973c277c521a5))

##### Bug Fixes

* **TextField:**  Corrects an issues with test snapshotting [#137](https://github.com/jamesmfriedman/rmwc/pull/137) ([cee345b6](https://github.com/jamesmfriedman/rmwc/commit/cee345b61dce4322fadaac0d08126df8775334e8))
* **GridList:**  Removing redundant GridTilePrimaryContent node. ([263ec45e](https://github.com/jamesmfriedman/rmwc/commit/263ec45eed47bc6f5ac507f3fd4e41b1e498c4dc))

#### 1.1.1 (2018-01-30)

##### Bug Fixes

* **SimpleListItem:**  rendering child items ([952ac17b](https://github.com/jamesmfriedman/rmwc/commit/952ac17ba2a716b61175e9749911da89fceb0435))

#### 1.1.0 (2018-01-25)

##### Breaking Changes

* **Select:**  Removing multi-select from MDC breaking change. ([3625e86c](https://github.com/jamesmfriedman/rmwc/commit/3625e86c3aca109f0cdf64c60c0b16e7d38a9128))

##### Documentation Changes

* **General:**  fixing a layout bug ([4061c3db](https://github.com/jamesmfriedman/rmwc/commit/4061c3db29a2bba9659e99638b2da80fc63a1b86))
* **Icon:**  removing incorrect example ([0c1fa46c](https://github.com/jamesmfriedman/rmwc/commit/0c1fa46cd32bb23c1cb73bb4862a51074ce24949))
* **CSSModules:**
  *  Updating webpack loader example ([26967abc](https://github.com/jamesmfriedman/rmwc/commit/26967abc27018ea81c2b5dbb8d98b6d2ab039f1c))
  *  Extra configuration documentation [#113](https://github.com/jamesmfriedman/rmwc/pull/113) ([d722564c](https://github.com/jamesmfriedman/rmwc/commit/d722564c34c8eb6f43afd408e2d9dc73ce8ab70f))
* **Usage:**  fixing typo ([1d5ca408](https://github.com/jamesmfriedman/rmwc/commit/1d5ca4084aa7cfda2bb7e9f8cef8744939259f82))
* **DarkMode:**  documenting dark mode and adding a global toggle to docs. ([1627c6fe](https://github.com/jamesmfriedman/rmwc/commit/1627c6fe4e7fddc81787b54cc48b00452e85a4b4))
* **Contributing:**  Updating to show installation with peer dependencies ([e927698b](https://github.com/jamesmfriedman/rmwc/commit/e927698b30f22b8c0d22839778b72f53231e229f))
* **Testing:**  Added another enzyme mount issue case [#96](https://github.com/jamesmfriedman/rmwc/pull/96) ([63c2694d](https://github.com/jamesmfriedman/rmwc/commit/63c2694d1ca4c45b63eb29d655839ae3aa4dc7c5))
* **Toolbar:**  Documenting ToolbarFixedAdjust [#110](https://github.com/jamesmfriedman/rmwc/pull/110) ([f0ee1f15](https://github.com/jamesmfriedman/rmwc/commit/f0ee1f1510306f4ac89ae7940feec3908ff263c1))

##### New Features

* **TextFields:**  ability to set a TextField as invalid [#72](https://github.com/jamesmfriedman/rmwc/pull/72) ([42405cf7](https://github.com/jamesmfriedman/rmwc/commit/42405cf7b712a036ada41770f87a7403236e9061))
* **Tests:**  updating installation guide for tests, adding Test polyfill [#103](https://github.com/jamesmfriedman/rmwc/pull/103) ([f2844be4](https://github.com/jamesmfriedman/rmwc/commit/f2844be4a7e2bc00e1f4c99350b5f7631e2f0d93))

##### Bug Fixes

* **Drawer:**  Permanent drawers should no longer contain an inner wrapper ([053c8cdb](https://github.com/jamesmfriedman/rmwc/commit/053c8cdb82cd6ae77825dbeaf5dc0feba2c7b282))
* **TabBar:**  TabBar would get stuck in re-init loop if Tab children were wrapped with HOC, related to styled components [#116](https://github.com/jamesmfriedman/rmwc/pull/116) ([5dd4d9b5](https://github.com/jamesmfriedman/rmwc/commit/5dd4d9b506ca00bc985bc0a967eafc163bda10fe))
* **ParcelJS:**  Move babel config to babelrc and don’t publish babelrc to npm [#123](https://github.com/jamesmfriedman/rmwc/pull/123) ([1968f5e8](https://github.com/jamesmfriedman/rmwc/commit/1968f5e8b5552beba05840f8f823f9dd97983852))
* **TextField:**
  *  Corrects issue where label would not float after input was interacted with and then value was set to “” fixed [#122](https://github.com/jamesmfriedman/rmwc/pull/122) ([9d886b68](https://github.com/jamesmfriedman/rmwc/commit/9d886b6859068c0dbddc436f49bd9750cb6bc469))
  *  prevent react from removing mdc-text-field--upgraded on re-renders ([360ffc4a](https://github.com/jamesmfriedman/rmwc/commit/360ffc4aea82c48586ffb59d2431c3e2e9877b60))
* **slider:**  add onInput for sliding cb ([e32cefd7](https://github.com/jamesmfriedman/rmwc/commit/e32cefd7f07a0350e809ac3821843a1c46c04e9f))
* **Select:**  Reinit on cssOnly change [#108](https://github.com/jamesmfriedman/rmwc/pull/108) ([def6d0fa](https://github.com/jamesmfriedman/rmwc/commit/def6d0fa4b826fba486f5f887d6709764541fabe))

#### 1.0.2 (2018-01-19)
##### Critical Issue

* **peerDependencies:**  Updated 16.0.0 to 16.x.x. Fixed versions were causing installation issues.

#### 1.0.1 (2018-01-19)

##### Documentation Changes

* **Card:**
  *  clearing up examples ([27c18c7f](https://github.com/jamesmfriedman/rmwc/commit/27c18c7fe223476f789b59d15c3b9b1ac7ec6efb))
  *  Fixing typo ([a9cb439c](https://github.com/jamesmfriedman/rmwc/commit/a9cb439c579ede5e3ebe5243630c9169830369f8))
* **Tests:**  Added documentation for [#96](https://github.com/jamesmfriedman/rmwc/pull/96) ([f6718945](https://github.com/jamesmfriedman/rmwc/commit/f6718945008d4bd8c391d12a9564d03f4304ff54))

##### New Features

* **Icon:**  Added custom icon rendering hooks ([b51e777c](https://github.com/jamesmfriedman/rmwc/commit/b51e777cf0ab783707b6203b589d4185712c564f))

##### Bug Fixes

* **TabBarScroller:**  Support for dynamic tabs ([1ed982ed](https://github.com/jamesmfriedman/rmwc/commit/1ed982ed58d4e6128553609eab9537f035c28dea))
* **#95:**  Removes reliance on Reflect ([cb26c769](https://github.com/jamesmfriedman/rmwc/commit/cb26c769b4500b2f04a99b27291c651b46af9465))
* **TabBar:**  activeTabIndex doesn't set active tab of 0 on load [#94](https://github.com/jamesmfriedman/rmwc/pull/94) ([efdc130e](https://github.com/jamesmfriedman/rmwc/commit/efdc130e28062da68df69afeebc3094d98fb57cf))

#### 1.0.0 (2018-01-12)

##### Breaking Changes

* **IconToggle:**  Changed “value” to more idiomatic “checked” prop [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([03c8eeca](https://github.com/jamesmfriedman/rmwc/commit/03c8eecaa309de6d57fb839229e3ee1cfbf2577c))
* **default exports:**  Removed default exports from modules that export more than one usable component. [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([abf940bb](https://github.com/jamesmfriedman/rmwc/commit/abf940bb9891fd7f432a11289a1cbab04847325b))
* **Dialog:**  The Dialog component is now standard composable component. An existing DefaultDialogTemplate has been turned into a SimpleDialog component [breaking] [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([f6524eda](https://github.com/jamesmfriedman/rmwc/commit/f6524eda2ac0789345b0d94bdc2945969ce7db5b))
* **Snackbar:**  removed non-standard onClose handler, replaced with new onShow and onHide events from MDC [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([4174bfbd](https://github.com/jamesmfriedman/rmwc/commit/4174bfbdbddf9f4e3406aeb79afd183ad65c02ef))
* **List:**  MDC breaking change, renaming ListItemStartDetail -> ListItemGraphic, ListItemEndDetail -> ListItemMeta [#86](https://github.com/jamesmfriedman/rmwc/pull/86), [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([a03c9fd8](https://github.com/jamesmfriedman/rmwc/commit/a03c9fd8f7ed5ab5be69c01a74485d59ec9b50f4))
* **Drawer:**  MDC breaking change, Simplified and consolidated all Drawer types into one component. [#86](https://github.com/jamesmfriedman/rmwc/pull/86) [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([4c224aed](https://github.com/jamesmfriedman/rmwc/commit/4c224aedd3ee30fe4f14abbedaad8546a7033f36))
* **Menu:**  Corrected name to match MDC, Menu -> SimpleMenu, MenuItems -> SimpleMenuItems ([e8a2aafb](https://github.com/jamesmfriedman/rmwc/commit/e8a2aafb4c71692cb1f988edd0c88d1e16799517))

##### Documentation Changes

* **404:**  fixes the 404 page ([978cdd17](https://github.com/jamesmfriedman/rmwc/commit/978cdd17a9796cbcc413133539f7e15f5bb4c215))
* **Card:**
  *  improving darkTheme examples ([05648651](https://github.com/jamesmfriedman/rmwc/commit/056486517aa7fb2b4319bd10a378692dd5386e74))
  *  Remove unneccesary jsx block ([4457a220](https://github.com/jamesmfriedman/rmwc/commit/4457a220318680f9ac6b58f24bf5698c8c5dfcf0))
  *  Adding themeDark instructions ([36d888ff](https://github.com/jamesmfriedman/rmwc/commit/36d888ff1c79ee5946caa9318e7940f061033610))
  *  Adding lots of card examples [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([a1cb225a](https://github.com/jamesmfriedman/rmwc/commit/a1cb225a3b5c05af2e0d506da1ed75dd4274acc6))
* **Icon:**  Remove broken link ([c9c70273](https://github.com/jamesmfriedman/rmwc/commit/c9c70273e61ce6081698bf680d03d722412ea868))
* **Provider:**  fixing typo ([9edc6af4](https://github.com/jamesmfriedman/rmwc/commit/9edc6af40bfaffe11b5e1062175e1940337cdb4d))
* **Descriptions:**  Finishing doc descriptions ([bb6f036d](https://github.com/jamesmfriedman/rmwc/commit/bb6f036d39aa8803c8b410e2a04bd6f29f9f928a))
* **GridList:**  adding descriptions ([2d9eb365](https://github.com/jamesmfriedman/rmwc/commit/2d9eb3652aff61350a89d0d78e730722642ca1e4))
* **Menu:**  adding active state [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([b4d63abf](https://github.com/jamesmfriedman/rmwc/commit/b4d63abf935b18015d796c10d7cd676c79be966f))
* **RWMCProvider:**  documenting Provider usage [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([fd52b66f](https://github.com/jamesmfriedman/rmwc/commit/fd52b66f192c23f989e47e6ba2c41a8a63bbcaf7))
* **RTL:**  adding RTL to usage ([682fa178](https://github.com/jamesmfriedman/rmwc/commit/682fa178070a3237d73d75e2da0cfc9b0a9a5915))
* **GettingStarted:**  Installation, Usage, and Methodology ([db970ea8](https://github.com/jamesmfriedman/rmwc/commit/db970ea8d03765d692fbe838587fc88941845ec9))
* **CONTRIBUTING.md:**  Adding contributing guidelines ([1ddae8a4](https://github.com/jamesmfriedman/rmwc/commit/1ddae8a468cbd89c428554e8940db443268ff31b))
* **List:**  Fixing component name ([d71ac1f8](https://github.com/jamesmfriedman/rmwc/commit/d71ac1f800f0e2415c7a4479bdc4c345b5f4bada))

##### New Features

* **Tabs:**  Fixes known issues, adds TabIcon and TabIconText [#77](https://github.com/jamesmfriedman/rmwc/pull/77) [#75](https://github.com/jamesmfriedman/rmwc/pull/75) [#73](https://github.com/jamesmfriedman/rmwc/pull/73) ([124db29d](https://github.com/jamesmfriedman/rmwc/commit/124db29dedb64c99ff5b1e7063c08baefdd68bc1))
* **SimpleListItem:**  Added a convenience wrapper for ListItems. ([cde5661a](https://github.com/jamesmfriedman/rmwc/commit/cde5661ab6210f64739e0f7d98bfdeeadd57078e))
* **Fab:**  added exited prop [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([0297803b](https://github.com/jamesmfriedman/rmwc/commit/0297803b99467729b3b9ca6ae6ce7df5d747e422))
* **TextField:**  added dense and outlined TextFields [#86](https://github.com/jamesmfriedman/rmwc/pull/86), [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([45ccbb5f](https://github.com/jamesmfriedman/rmwc/commit/45ccbb5f46cb5c730d20d6bd782445433bd74343))
* **SimpleMenu:**  adding anchorCorner [#83](https://github.com/jamesmfriedman/rmwc/pull/83) [#77](https://github.com/jamesmfriedman/rmwc/pull/77) ([0981b3df](https://github.com/jamesmfriedman/rmwc/commit/0981b3dfdb4f3c306fe38be746f728b85514803e))
* **TextFields:**  Simplified icon usage ([f25e9230](https://github.com/jamesmfriedman/rmwc/commit/f25e92305a4c654fd50944273848bdaab6c791ea))

##### Bug Fixes

* **simpleTag:**  Corrects issue when extending components and then specifying a tag ([c68f8b6e](https://github.com/jamesmfriedman/rmwc/commit/c68f8b6e2c45589a48fe81915a2b1f66d4fc0094))
* **Card:**  consuming props so they dont end up as unhandled Dom attributes ([8d7a9027](https://github.com/jamesmfriedman/rmwc/commit/8d7a902705baf23c396ca63b60de128f10d95bc2))
* **Select:**
  *  moved tabIndex in accordance with MDC breaking change. ([9a2c8123](https://github.com/jamesmfriedman/rmwc/commit/9a2c8123eb17ef5bf0fb35b32068bd097b7e6987))
  *  Placeholder value should be blank [#63](https://github.com/jamesmfriedman/rmwc/pull/63) ([6997d060](https://github.com/jamesmfriedman/rmwc/commit/6997d0606e70663f49678cecb23b93167032c563))
  *  Fixes cssOnly tabIndex issue on Selects [#79](https://github.com/jamesmfriedman/rmwc/pull/79) ([a6b487f5](https://github.com/jamesmfriedman/rmwc/commit/a6b487f5269eed9eeb80b1c72ec063292bfde168))
* **drawer:**  list items don't show name and icon in story ([97c0bad8](https://github.com/jamesmfriedman/rmwc/commit/97c0bad8d9dddc6df8da2cfe1b4e15152a05e8ad))

##### Tests

* **List:**  removing dead node ([dbaa8844](https://github.com/jamesmfriedman/rmwc/commit/dbaa8844f3eb2233190d5b4822675f6389fd9f61))

#### 0.0.1-rc13 (2018-01-04)

##### New Features

* **Slider:**  allow children for extensibilty ([cca8b737](https://github.com/jamesmfriedman/rmwc/commit/cca8b73703ec47121185b7ce70b9e24b26eae953))
* **TabBarScroller:**  Adding TabBarScroller component. ([5361b46d](https://github.com/jamesmfriedman/rmwc/commit/5361b46d97d24a49adc6a8668eb8d6bd6e14eebb))

##### Bug Fixes

* **TabBar:**  reinit when adding/removing tabs dynamically. ([97a30f81](https://github.com/jamesmfriedman/rmwc/commit/97a30f817a026a1e0b74de34d9c851288816419c))

#### 0.0.1-rc12 (2017-12-19)

##### Documentation Changes

* **TextFieldHelperText:** fixed broken export ([ad8449bf](https://github.com/jamesmfriedman/rmwc/commit/ad8449bf5194072fbe68d6eba364fe2778142338))

##### New Features

* **Checkbox:** themeDark support ([61f485d5](https://github.com/jamesmfriedman/rmwc/commit/61f485d5fac8d74453f77db3add0e63d3779cdc0))
* **Fab:** add cssOnly support ([951391e0](https://github.com/jamesmfriedman/rmwc/commit/951391e0ec9655daa60f275b2a0ad46ffcc3b394))
* **Dialog:**
  * dark theme support ([71a82b21](https://github.com/jamesmfriedman/rmwc/commit/71a82b21a0bcc27ee9f6b2dddf9a944d45502978))
  * add scrollable body ([2434a8b5](https://github.com/jamesmfriedman/rmwc/commit/2434a8b596e3d5b45ab9bd9398b0dd230df08721))
* **ListItem:** Added select and activated props ([be462b27](https://github.com/jamesmfriedman/rmwc/commit/be462b270ed908754af14ef34d88f04e27482ba7))
* **Select:**
  * allow multiple #44 ([3dba63a6](https://github.com/jamesmfriedman/rmwc/commit/3dba63a6d1af518b57280c47b594cf347a9cb887))
  * CSSOnly Selects ([3b3669b3](https://github.com/jamesmfriedman/rmwc/commit/3b3669b360834167ffeb7264551cfe97ff3ff91b))
  * #43 additional props for listItems ([f1b9a8d4](https://github.com/jamesmfriedman/rmwc/commit/f1b9a8d4cc880a5f8d9aec6f5755b9de69d4b817))

##### Bug Fixes

* **Slider:** reinit on props change ([6787f7d1](https://github.com/jamesmfriedman/rmwc/commit/6787f7d1e0850e4bb9f1a63fc0c3644f8398fb49))
* **Button:** corrects ripple color ([aee2febc](https://github.com/jamesmfriedman/rmwc/commit/aee2febc73a4976595c5de197ba9017e24704d5c))
* **Select:** fixes #54 async rendering ([d0dbb09b](https://github.com/jamesmfriedman/rmwc/commit/d0dbb09ba4c64ced6bf2aca0371d73c869fddf80))
* **TextField:** Rename helptext to helper-text to follow mwc ([aaa4aefe](https://github.com/jamesmfriedman/rmwc/commit/aaa4aefe2de94e8c4ed435cf6e1df85bd3dae4ce))
* **LayoutGrid:** export GridInner ([9deeaf62](https://github.com/jamesmfriedman/rmwc/commit/9deeaf624fbc2f5d2edb4be37d0e228a40706cbf))
* **menu:** Add missing noop to onClose() & onSelect() callbacks ([282c0f4c](https://github.com/jamesmfriedman/rmwc/commit/282c0f4cf5b5a9fd26575e7b64a036bb045179e8))

##### Other Changes

* **List:** Rename ListItemTextSecondry -> ListSecondaryText ([3fb78a6d](https://github.com/jamesmfriedman/rmwc/commit/3fb78a6d09c87a27d67efa5abdb3f7ebd9c1797a))

#### 0.0.1-rc11 (2017-12-07)

##### New Features

* **Card:** Adding missing MediaItem functionality ([76c1a16c](https://github.com/jamesmfriedman/rmwc/commit/76c1a16ccab95806b31c65b4247aaeaa6f7c0ccf))

##### Bug Fixes

* **Dialog:** fixes #47 exports dialog components ([957ba8dc](https://github.com/jamesmfriedman/rmwc/commit/957ba8dc8c11f3abc01ae9db49747d70fdba675a))

#### 0.0.1-rc10 (2017-12-06)

##### Chores

* **Docs:** module imports fixes #34 ([c8da84ec](https://github.com/jamesmfriedman/rmwc/commit/c8da84ec625fc4f565ba232413bb0814429f441e))

##### New Features

* **Select:** allow children #43 ([986bdac5](https://github.com/jamesmfriedman/rmwc/commit/986bdac54182dcd5e834e5d955185dee60ef75e3))
* **Icon:** icon enhancements + docs fixes #41 ([b41a20e4](https://github.com/jamesmfriedman/rmwc/commit/b41a20e47e93e2f84282b4432b3556b599d27a58))
* **Snackbar:** fixes #42 hide extra elements ([e4603043](https://github.com/jamesmfriedman/rmwc/commit/e4603043e302df46073ef6ffcfb1b92ed78f7ac0))

#### 0.0.1-rc9 (2017-11-27)

##### Bug Fixes

* **TextField:** corrects floating label regression ([6e8d5fab](https://github.com/jamesmfriedman/rmwc/commit/6e8d5fab0f7e504ac3f607a72ee59379092a5b42))

#### 0.0.1-rc8 (2017-11-27)

##### Bug Fixes

* **Toolbar:** Auto attach ToolbarAdjust #35 ([b2cd36e7](https://github.com/jamesmfriedman/rmwc/commit/b2cd36e7d2faf77178ffa6c6008bf69a5971e2dd))
* **Drawer:** eventPath failure in Edge #38 ([8063b492](https://github.com/jamesmfriedman/rmwc/commit/8063b492d3bce9d1d17c1654968f5323d9cd46f6))
* **Base:** remove accidental window.name #33 ([5df57cd8](https://github.com/jamesmfriedman/rmwc/commit/5df57cd8fc245d3e243d0e07f2e38bef2e46f96c))

#### 0.0.1-rc7 (2017-11-21)

##### New Features

* **TextField:** fullwidth and box fixes #31 ([b52d72c2](https://github.com/jamesmfriedman/rmwc/commit/b52d72c2daaedbe091ea79f0c60245c86b58368a))

#### 0.0.1-rc6 (2017-11-20)

##### New Features

* **Toolbar:** Adding Toolbar MenuIcon and Icon ([ef1a8522](https://github.com/jamesmfriedman/rmwc/commit/ef1a8522f5d020efc693d642704607996d669f34))

#### 0.0.1-rc5 (2017-11-20)

##### New Features

* **TextField:**
  * leading and trailing icons ([7c7d5134](https://github.com/jamesmfriedman/rmwc/commit/7c7d51341d8e559d80ebdf3568aadd635f604bee))
  * bottom line and help text ([5a994f11](https://github.com/jamesmfriedman/rmwc/commit/5a994f1178bc22b8540ca75b89d3ca58f5f1eb11))

##### Bug Fixes

* **TextField:** adding missing bottom line ([cd3758c9](https://github.com/jamesmfriedman/rmwc/commit/cd3758c9d26f389d967b6f352b72e6fa802398b0))
* **withMDC:** catch errors from of MDC constructor ([37b1a3b9](https://github.com/jamesmfriedman/rmwc/commit/37b1a3b99b26a6daf44bbd01d3a536e3a9250303))
* **browserify:** correcting es2015 modules ([b98a8db7](https://github.com/jamesmfriedman/rmwc/commit/b98a8db7780ffa416c769ec64c28124383fc2f41))

#### 0.0.1-rc4 (2017-11-16)

##### Bug Fixes

* **TextField:** Import name changed :(. ([c5a24c5f](https://github.com/jamesmfriedman/rmwc/commit/c5a24c5f0af8beca44e6973afa1b287f8cab6050))

#### 0.0.1-rc3 (2017-11-16)

##### Bug Fixes

* **TextField:** Classnames are now dashed ([de5805a0](https://github.com/jamesmfriedman/rmwc/commit/de5805a0ff0a392f348c3a507f10ad231d518af9))

#### 0.0.1-rc2 (2017-11-16)
##### Docs

* **FormField:** Updated examples relating to FormField usage.

##### BREAKING CHANGES

* **TextField:** Following MDC 25 Change, Renaming Textfield -> TextField

#### 0.0.1-rc1 (2017-11-15)

#### 0.0.1-beta10 (2017-11-09)

#### 0.0.1-beta9 (2017-11-08)

##### Bug Fixes

* **Select:** initial values were not being set ([e4f79507](https://github.com/jamesmfriedman/rmwc/commit/e4f7950799a99efee496e80a2f8e92868f68c0ca))

#### 0.0.1-beta8 (2017-11-08)

#### 0.0.1-beta7 (2017-11-07)

#### 0.0.1-beta6 (2017-11-03)

#### 0.0.1-beta5 (2017-11-02)

#### 0.0.1-beta4 (2017-10-12)

#### 0.0.1-beta3 (2017-10-12)

#### 0.0.1-beta2 (2017-10-02)

##### Bug Fixes

* **drawer:** MDC drawers stopProp workaround #2 ([ee0f7a38](https://github.com/jamesmfriedman/rmwc/commit/ee0f7a38c17c3fca997cad6d8435c7907e0bc4e6))

