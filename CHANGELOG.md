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

