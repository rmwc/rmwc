import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { mount } from 'enzyme';
import {
  withTheme,
  randomId,
  wrapChild,
  debounce,
  componentFactory,
  toCamel,
  toDashCase,
  FoundationComponent,
  closest
} from './';

jest.spyOn(console, 'warn');

describe('RMWC', () => {
  it('works', () => {});
});

describe('componentFactory', () => {
  it('sets displayName', () => {
    const Foo = componentFactory({ displayName: 'foo' });
    expect(Foo.displayName).toBe('foo');
  });

  it('handle classNames', () => {
    const Foo = componentFactory({
      displayName: 'foo',
      classNames: ['my-foo']
    });
    const el = mount(<Foo />);
    expect(el.html().includes('my-foo')).toBe(true);

    const Baz = componentFactory({
      displayName: 'baz',
      classNames: props => ['my-baz']
    });

    const el2 = mount(<Baz />);
    expect(el2.html().includes('my-baz')).toBe(true);
  });

  it('handles DOM tags', () => {
    const Foo = componentFactory({
      displayName: 'foo',
      classNames: ['my-foo'],
      tag: 'span'
    });

    const el = mount(<Foo />);
    expect(el.getDOMNode() instanceof HTMLSpanElement).toBe(true);

    const el2 = mount(<Foo tag="div" />);
    expect(el2.getDOMNode() instanceof HTMLDivElement).toBe(true);
  });

  it('handles extending other components as tag', () => {
    const Foo = componentFactory({
      displayName: 'foo',
      classNames: ['my-foo'],
      tag: 'span'
    });

    const Baz = componentFactory({
      displayName: 'baz',
      classNames: ['my-baz'],
      tag: Foo
    });

    const Duz = componentFactory({
      displayName: 'duz',
      classNames: ['my-duz'],
      tag: 'a'
    });

    const el = mount(<Baz tag="button" />);
    expect(el.html().includes('my-baz') && el.html().includes('my-foo')).toBe(
      true
    );

    // assert dynamic passthrough of string tag works
    expect(el.getDOMNode() instanceof HTMLButtonElement).toBe(true);

    const el2 = mount(<Baz tag={Duz} />);
    expect(el2.getDOMNode() instanceof HTMLAnchorElement).toBe(true);
  });

  it('handles prop consumption', () => {
    const Foo = componentFactory<{ testprop: string }>({
      displayName: 'foo',
      consumeProps: ['testprop']
    });

    const el = mount(<Foo testprop="test" />);
    expect(el.html().includes('testprop')).toBe(false);
  });

  it('handles deprecations', () => {
    let myProps: any = null;

    const Foo = componentFactory<{
      goneProp?: string;
      oldProp?: string;
      oldProp2?: string;
    }>({
      displayName: 'foo',
      deprecate: {
        goneProp: '',
        oldProp: 'newProp',
        oldProp2: ['newProp2', (val: any) => 'changed']
      },
      render: (props, ref, Tag) => {
        myProps = props;
        return <Tag />;
      }
    });

    mount(<Foo oldProp="val1" oldProp2="val2" goneProp={'gone'} />);
    expect(myProps.goneProp).toBe(undefined);
    expect(myProps.newProp).toBe('val1');
    expect(myProps.newProp2).toBe('changed');
  });

  it('handles themes', () => {
    const Foo = componentFactory({
      displayName: 'foo'
    });

    const el = mount(<Foo theme="onPrimary" />);
    expect(el.html().includes('class="mdc-theme--on-primary"')).toBe(true);
  });

  it('handles ref forwarding', () => {
    const Foo = componentFactory({
      displayName: 'foo'
    });

    let myRef: any;
    mount(<Foo ref={el => (myRef = el)} />);
    expect(myRef).toBeTruthy();
  });
});

describe('FoundationComponent', () => {
  class MyComp extends FoundationComponent<{
    onInteraction?: any;
    value?: any;
  }> {
    root = this.createElement('root');

    sync(props: any, prevProps: any) {
      this.syncProp(props.value, prevProps.value, () => {});
    }

    render() {
      const { onInteraction, ...rest } = this.props;
      return <div ref={this.root.setRef} {...this.root.props(rest)} />;
    }
  }

  class MyComp2 extends FoundationComponent<{
    onInteraction?: any;
    value?: any;
  }> {
    static shouldDebounce = false;
    root = this.createElement('root');

    sync(props: any, prevProps: any) {
      super.sync(props, prevProps);
      this.syncProp(props.value, prevProps.value, () => {});
    }

    render() {
      const { onInteraction, ...rest } = this.props;
      return <div ref={this.root.setRef} {...this.root.props(rest)} />;
    }
  }

  it('mounts', () => {
    mount(<MyComp />);
  });

  it('unmounts', () => {
    const el = mount(<MyComp />);
    el.unmount();
  });

  it('emits events', () => {
    let interacted = false;

    const el = mount(
      <MyComp
        onInteraction={(evt: RMWC.CustomEventT<any>) =>
          (interacted = evt.detail)
        }
      />
    );
    const inst = el.instance() as MyComp;
    inst.emit('onInteraction', { foo: 'val' });
    expect(interacted).toEqual({ foo: 'val' });

    // should not explode after it unmounts
    el.unmount();
    inst.emit('onInteraction', { foo: 'val' });
  });

  it('handle sync', () => {
    const el = mount(<MyComp />);
    el.setProps({ value: 1 });
    el.setProps({ value: 2 });
    el.setProps({ value: undefined });
  });

  it('handles getDefaultFoundation', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;
    expect(inst.getDefaultFoundation()).toBeTruthy();
  });

  it('handles debounce', () => {
    const el = mount(<MyComp />);
    const el2 = mount(<MyComp2 />);
  });

  it('FoundationElement: handles classNames', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;

    inst.root.addClass('foo');
    inst.root.addClass('foo');
    expect(inst.root.props({}).className.includes('foo')).toBe(true);
    expect(inst.root.hasClass('foo')).toBe(true);

    inst.root.removeClass('foo');
    inst.root.removeClass('foo');
    expect(inst.root.props({}).className.includes('foo')).toBe(false);
    expect(inst.root.hasClass('foo')).toBe(false);
  });

  it('FoundationElement: handles ref', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;

    expect(inst.root.ref instanceof HTMLDivElement).toBe(true);
  });

  it('FoundationElement: handles addEventListener / removeEventListener', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;

    // double up on the adds to check that it doesnt add a second time
    const changeHandler = () => {};
    inst.root.addEventListener('change', changeHandler);
    inst.root.addEventListener('change', changeHandler);
    expect(inst.root.props({}).onChange).toBe(changeHandler);

    // double up on the removes to check that it doesnt remove a second time
    inst.root.removeEventListener('change', changeHandler);
    inst.root.removeEventListener('change', changeHandler);
    expect(inst.root.props({}).onChange).toBe(undefined);

    // Check to make sure we can add a bogus one
    inst.root.addEventListener('onChange', changeHandler);
  });

  it('FoundationElement: handles setStyle', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;

    inst.root.setStyle('color', 'red');
    inst.root.setStyle('color', 'red');
    inst.root.setStyle('--myvar', 'red');
    expect(inst.root.props({}).style).toEqual({
      color: 'red',
      '--myvar': 'red'
    });

    inst.root.setStyle('color', 'blue');

    expect(inst.root.props({}).style).toEqual({
      color: 'blue',
      '--myvar': 'red'
    });
  });

  it('FoundationElement: handles prop setters / getters', () => {
    const el = mount(<MyComp />);
    const inst = el.instance() as MyComp;

    inst.root.setProp('title', 'red');
    inst.root.setProp('title', 'red');
    expect(inst.root.props({}).title).toBe('red');
    expect(inst.root.getProp('title')).toBe('red');
    expect(inst.root.removeProp('title'));
    expect(inst.root.removeProp('title'));
    expect(inst.root.getProp('title')).toBe(undefined);
  });

  it('FoundationElement: handles prop merging', done => {
    let blueChangeCalled = false;
    let redChangeCalled = false;
    const el = mount(
      <MyComp
        className="blue"
        style={{ background: 'blue' }}
        onChange={() => (blueChangeCalled = true)}
      />
    );
    const inst = el.instance() as MyComp;

    inst.root.addClass('red');
    inst.root.setStyle('color', 'red');
    inst.root.addEventListener('change', () => (redChangeCalled = true));
    el.update();
    setTimeout(() => {
      el.simulate('change');
      const mergedProps = inst.root.props(el.props());
      expect(mergedProps.className).toBe('blue red');
      expect(mergedProps.style).toEqual({ color: 'red', background: 'blue' });
      expect(blueChangeCalled).toBe(true);
      expect(redChangeCalled).toBe(true);
      done();
    }, 100);
  });
});

describe('Utils', () => {
  it('randomId', () => {
    process.env.NODE_ENV = 'production';
    randomId();
    process.env.NODE_ENV = 'test';
  });

  it('debounce', done => {
    let val = 0;
    const foo = () => val++;
    const debouncedFoo = debounce(foo, 100);
    debouncedFoo();
    setTimeout(() => {
      expect(val).toBe(1);
      done();
    }, 150);
  });

  it('closest', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.classList.add('foo');

    parent.appendChild(child);

    expect(closest(child, '.foo')).toBe(parent);
    expect(closest(null, '.foo')).toBe(null);
  });

  it('wrapChild', () => {
    const Foo = (props: any) => {
      return wrapChild({ ...props, className: 'foo' });
    };

    const el = mount(
      <Foo>
        <div className="child" />
      </Foo>
    );

    expect(el.html().includes('foo child')).toBe(true);
  });

  it('toCamel', () => {
    expect(toCamel('test-foo')).toBe('testFoo');
  });

  it('toDashCase', () => {
    expect(toDashCase('testFoo')).toBe('test-foo');
  });
});

describe('withTheme', () => {
  it('works with and without classnames', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);
    const el = mount(<Component className="test" theme="primary" />);
    expect(el.html().includes('test'));

    mount(<Component className="test" />);
    expect(el.html().includes('test'));
  });

  it('works with arrays', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);
    const el = mount(<Component theme={['primary']} />);
    expect(el.html().includes('mdc-theme-primary'));
  });

  it('handles deprecations', () => {
    const Component = withTheme(({ ...rest }) => <div {...rest} />);
    // @ts-ignore
    mount(<Component theme="primary foo" />);
    mount(<Component theme="on-primary" />);
  });
});
