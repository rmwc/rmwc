import GettingStartedDocs from '../../src/README/getting-started.md';
import ButtonDocs from '../../src/Button/button.md';
import FabDocs from '../../src/Fab/fab.md';
import IconToggleDocs from '../../src/IconToggle/icon-toggle.md';
import CardDocs from '../../src/Card/card.md';
import DialogDocs from '../../src/Dialog/dialog.md';
import DrawerDocs from '../../src/Drawer/drawer.md';
import ElevationDocs from '../../src/Elevation/elevation.md';
import GridListDocs from '../../src/GridList/grid-list.md';
import CheckboxDocs from '../../src/Checkbox/checkbox.md';
import FormFieldDocs from '../../src/FormField/form-field.md';
import RadioDocs from '../../src/Radio/radio.md';
import SelectDocs from '../../src/Select/select.md';
import SliderDocs from '../../src/Slider/slider.md';
import SwitchDocs from '../../src/Switch/switch.md';
import TextFieldDocs from '../../src/TextField/textfield.md';
import GridDocs from '../../src/Grid/grid.md';
import LinearProgressDocs from '../../src/LinearProgress/linear-progress.md';
import ListDocs from '../../src/List/list.md';
import MenuDocs from '../../src/Menu/menu.md';
import RippleDocs from '../../src/Ripple/ripple.md';
import SnackbarDocs from '../../src/Snackbar/snackbar.md';
import TabDocs from '../../src/Tabs/tabs.md';
import ThemeDocs from '../../src/Theme/theme.md';
import ToolbarDocs from '../../src/Toolbar/toolbar.md';
import TypographyDocs from '../../src/Typography/typography.md';
import IconDocs from '../../src/Icon/icon.md';

export const menuContent = [
  {
    label: 'Getting Started',
    url: `${process.env.PUBLIC_URL}/getting-started`,
    component: GettingStartedDocs
  },
  {
    label: 'Buttons',
    options: [
      {
        label: 'Buttons',
        url: `${process.env.PUBLIC_URL}/buttons`,
        component: ButtonDocs
      },
      {
        label: 'Fabs',
        url: `${process.env.PUBLIC_URL}/fabs`,
        component: FabDocs
      },
      {
        label: 'Icon Toggles',
        url: `${process.env.PUBLIC_URL}/icon-toggles`,
        component: IconToggleDocs
      }
    ]
  },
  {
    label: 'Cards',
    url: `${process.env.PUBLIC_URL}/cards`,
    component: CardDocs
  },
  {
    label: 'Dialogs',
    url: `${process.env.PUBLIC_URL}/dialogs`,
    component: DialogDocs
  },
  {
    label: 'Drawers',
    url: `${process.env.PUBLIC_URL}/drawers`,
    component: DrawerDocs
  },
  {
    label: 'Elevation',
    url: `${process.env.PUBLIC_URL}/elevation`,
    component: ElevationDocs
  },
  {
    label: 'Grid Lists',
    url: `${process.env.PUBLIC_URL}/grid-lists`,
    component: GridListDocs
  },
  {
    label: 'Inputs and Controls',
    options: [
      {
        label: 'Checkboxes',
        url: `${process.env.PUBLIC_URL}/checkboxes`,
        component: CheckboxDocs
      },
      {
        label: 'FormFields',
        url: `${process.env.PUBLIC_URL}/form-fields`,
        component: FormFieldDocs
      },
      {
        label: 'Radio Buttons',
        url: `${process.env.PUBLIC_URL}/radio-buttons`,
        component: RadioDocs
      },
      {
        label: 'Select Menus',
        url: `${process.env.PUBLIC_URL}/select-menus`,
        component: SelectDocs
      },
      {
        label: 'Sliders',
        url: `${process.env.PUBLIC_URL}/sliders`,
        component: SliderDocs
      },
      {
        label: 'Switches',
        url: `${process.env.PUBLIC_URL}/switches`,
        component: SwitchDocs
      },
      {
        label: 'Text Fields',
        url: `${process.env.PUBLIC_URL}/text-fields`,
        component: TextFieldDocs
      }
    ]
  },
  {
    label: 'Layout Grid',
    url: `${process.env.PUBLIC_URL}/layout-grid`,
    component: GridDocs
  },
  {
    label: 'Linear Progress',
    url: `${process.env.PUBLIC_URL}/linear-progress`,
    component: LinearProgressDocs
  },
  {
    label: 'Lists',
    url: `${process.env.PUBLIC_URL}/lists`,
    component: ListDocs
  },
  {
    label: 'Menus',
    url: `${process.env.PUBLIC_URL}/menus`,
    component: MenuDocs
  },
  {
    label: 'Ripples',
    url: `${process.env.PUBLIC_URL}/ripples`,
    component: RippleDocs
  },
  {
    label: 'Snackbars',
    url: `${process.env.PUBLIC_URL}/snackbars`,
    component: SnackbarDocs
  },
  {
    label: 'Tabs',
    url: `${process.env.PUBLIC_URL}/tabs`,
    component: TabDocs
  },
  {
    label: 'Theme',
    url: `${process.env.PUBLIC_URL}/theme`,
    component: ThemeDocs
  },
  {
    label: 'Toolbars',
    url: `${process.env.PUBLIC_URL}/toolbars`,
    component: ToolbarDocs
  },
  {
    label: 'Typography',
    url: `${process.env.PUBLIC_URL}/typography`,
    component: TypographyDocs
  },
  {
    label: 'Icons',
    url: `${process.env.PUBLIC_URL}/icons`,
    component: IconDocs
  }
];
