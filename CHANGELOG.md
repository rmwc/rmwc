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

