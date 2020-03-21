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

storiesOf('Bugs', module).add('#538', Bug538);
