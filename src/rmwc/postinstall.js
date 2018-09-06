const fs = require('fs');
const path = require('path');

const modules = {
  '@rmwc/base': 'Base',
  '@rmwc/button': 'Button',
  '@rmwc/card': 'Card',
  '@rmwc/checkbox': 'Checkbox',
  '@rmwc/chip': 'Chip',
  '@rmwc/dialog': 'Dialog',
  '@rmwc/drawer': 'Drawer',
  '@rmwc/elevation': 'Elevation',
  '@rmwc/fab': 'Fab',
  '@rmwc/floating-label': 'FloatingLabel',
  '@rmwc/formfield': 'FormField',
  '@rmwc/grid': 'Grid',
  '@rmwc/grid-list': 'GridList',
  '@rmwc/icon': 'Icon',
  '@rmwc/icon-button': 'IconButton',
  '@rmwc/image-list': 'ImageList',
  '@rmwc/line-ripple': 'LineRipple',
  '@rmwc/linear-progress': 'LinearProgress',
  '@rmwc/list': 'List',
  '@rmwc/menu': 'Menu',
  '@rmwc/notched-outline': 'NotchedOutline',
  '@rmwc/provider': 'Provider',
  '@rmwc/radio': 'Radio',
  '@rmwc/ripple': 'Ripple',
  '@rmwc/select': 'Select',
  '@rmwc/shape': 'Shape',
  '@rmwc/slider': 'Slider',
  '@rmwc/snackbar': 'Snackbar',
  '@rmwc/switch': 'Switch',
  '@rmwc/tabs': 'Tabs',
  '@rmwc/textfield': 'TextField',
  '@rmwc/theme': 'Theme',
  '@rmwc/toolbar': 'Toolbar',
  '@rmwc/top-app-bar': 'TopAppBar',
  '@rmwc/typography': 'Typography'
};

for (const key in modules) {
  const dir = path.dirname(require.resolve(key));
  fs.symlinkSync(dir, path.join(__dirname, modules[key]));
}
