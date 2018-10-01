import * as React from 'react';
import { mount } from 'enzyme';
import { ListItem } from '@rmwc/list';
import { withTheme } from './withTheme';
import { withFoundation } from './withFoundation';
import { noop, Component, randomId } from './';

jest.spyOn(console, 'warn');

describe('RMWC', () => {
  it('works', () => {});
});

describe('Utils', () => {
  it('noop', () => {
    noop();
  });

  it('randomId', () => {
    process.env.NODE_ENV = 'production';
    randomId();
    process.env.NODE_ENV = 'test';
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

describe('Component', () => {
  class EmptyComponent extends Component {}

  class TestComponent extends Component {
    static displayName = 'TestComponent';
    deprecate = {
      oldProp: 'newProp',
      oldPropFunc: ['newProp', () => 'changedValue']
    };
    classNames = () => ['rmwc-test'];
    consumeProps = ['consumeProp'];
  }

  class IconComponent extends Component {
    classNames = ['rmwc-icon'];
    tag = TestComponent;
  }

  it('renders', () => {
    mount(<EmptyComponent />);
    mount(<TestComponent />);
  });

  it('allows tag override with string', () => {
    const el = mount(<TestComponent tag="span" />);
    expect(el.html().includes('span')).toBe(true);
  });

  it('allows tag override when extending component', () => {
    const el = mount(<IconComponent tag="span" />);
    expect(el.html().includes('rmwc-test')).toBe(true);
    expect(el.html().includes('rmwc-icon')).toBe(true);
  });

  it('allows theme', () => {
    const el = mount(<TestComponent theme="primary" />);
    expect(el.html().includes('mdc-theme--primary')).toBe(true);
  });

  it('handles elementRef', () => {
    let myRef;
    let myRef2;
    mount(<TestComponent elementRef={ref => (myRef = ref)} />);
    mount(<IconComponent elementRef={ref => (myRef2 = ref)} />);
    expect(!!myRef).toBe(true);
    expect(!!myRef2).toBe(true);
  });

  it('handles basic deprecations', () => {
    const el = mount(<TestComponent oldProp="foo" />);
    expect(el.instance().getProps().newProp).toBe('foo');
    expect(console.warn).toHaveBeenCalled();
  });

  it('handles transform deprecations', () => {
    const el = mount(<TestComponent oldPropFunc="foo" />);
    expect(el.instance().getProps().newProp).toBe('changedValue');
    expect(console.warn).toHaveBeenCalled();
  });

  it('handles consumeProps', () => {
    const el = mount(<TestComponent consumeProp="test" />);
    expect(el.instance().getProps().consumeProp).toBe(undefined);
  });

  it('accepts classnames', () => {
    const el = mount(<TestComponent className="foo" />);
    expect(el.html().includes('foo')).toBe(true);
    expect(el.html().includes('rmwc-test')).toBe(true);
  });
});
