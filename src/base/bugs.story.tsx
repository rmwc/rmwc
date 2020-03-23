import * as React from 'react';

import { Link, BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import {
  TextField,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Select,
  Switch,
  TabBar,
  Tab,
  IconButton,
  SimpleDialog,
  Dialog,
  DialogContent,
  MenuSurfaceAnchor,
  List,
  CollapsibleList,
  SimpleListItem,
  Typography,
  Icon,
  Slider,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  Theme,
  ThemeProvider,
  Radio,
  DialogTitle
} from '../rmwc';

function Bug538() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Test</DialogTitle>
        <DialogContent>
          <Slider discrete displayMarkers min={100} max={200} step={5} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Bug515() {
  const [disabled, setDisabled] = React.useState(false);

  function switchDisabled() {
    setDisabled(!disabled);
  }

  return (
    <React.Fragment>
      <Typography use="headline4">RMWC Sandbox</Typography>
      <Typography use="subtitle1" tag="p">
        Buttons using state for disabled remain focused when enabled. Steps to
        reproduce:
      </Typography>
      <Typography use="body1">
        <ul>
          <li>Cick each button.</li>
          <li>Buttons 3 and 4 remain selected when they are enabled.</li>
          <li>Buttons 1 and 2 do not.</li>
          <li>
            Only difference is the disabled flag being set by state: disabled.
          </li>
        </ul>
      </Typography>
      <Button label="Button 1" onClick={() => switchDisabled()} />
      <Button label="Button 2" onClick={() => switchDisabled()} />
      <Button
        label="Button 3"
        disabled={disabled}
        onClick={() => switchDisabled()}
      />
      <Button
        label="Button 4"
        disabled={disabled}
        onClick={() => switchDisabled()}
      />
    </React.Fragment>
  );
}

storiesOf('Bugs', module)
  .add('#538', Bug538)
  .add('#515', Bug515);
