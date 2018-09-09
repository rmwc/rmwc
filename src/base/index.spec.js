import * as React from 'react';
import { mount } from 'enzyme';
import { ListItem } from '@rmwc/list';
import { withTheme } from './withTheme';
import { withFoundation } from './withFoundation';
import { noop } from './';

describe('RMWC', () => {
  it('works', () => {});
});

describe('Utils', () => {
  it('noop', () => {
    noop();
  });
});

describe('withFoundation', () => {
  class MyComponent extends withFoundation({
    constructor: function() {
      this.foundation_ = {};
    },
    adapter: {}
  }) {
    componentDidMount() {
      const func = () => {};
      this.listen('click', func);
      this.emit('clicked', {});
      this.unlisten('click', func);
    }

    render() {
      return <div ref={this.foundationRefs.root_} />;
    }
  }

  it('FoundationComponent', () => {
    mount(<MyComponent onClick={() => {}} elementRef={el => {}} />);
  });
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
