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

