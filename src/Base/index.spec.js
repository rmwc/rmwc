import * as React from 'react';
import { mount } from 'enzyme';
import { ListItem } from '../List';
import { withTheme } from './withTheme';

describe('RMWC', () => {
  it('works', () => {});
});

describe('simpleTag', () => {
  it('Tag can be another component', () => {
    const Link = ({ to, ...rest }) => <a href="#" {...rest} />;
    const ListItemGraphic = 'div';
    const ListItemPrimaryText = 'div';
    mount(
      <ListItem tag={Link} to="/">
        <ListItemGraphic>home</ListItemGraphic>
        <ListItemPrimaryText>Home</ListItemPrimaryText>
      </ListItem>
    );
  });
});

describe('withTheme', () => {
  it('works with and without classnames', () => {
    const Component = withTheme('div');
    const el = mount(<Component className="test" theme="primary" />);
    expect(el.html().includes('test'));

    mount(<Component className="test" />);
    expect(el.html().includes('test'));
  });

  it('works with arrays', () => {
    const Component = withTheme('div');
    const el = mount(<Component theme={['primary']} />);
    expect(el.html().includes('mdc-theme-primary'));
  });
});
