import GettingStartedDocs from '../../src/README/getting-started.md';
import ButtonDocs from '../../src/Button/button.md';
import FabDocs from '../../src/Fab/fab.md';
import IconToggleDocs from '../../src/IconToggle/icon-toggle.md';
import CardDocs from '../../src/Card/card.md';
import DialogDocs from '../../src/Dialog/dialog.md';

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
  }
];
