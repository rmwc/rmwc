import * as React from 'react';
import { mount } from 'enzyme';
import { withTheme } from './withTheme';
import { noop } from './utils/noop';
import { randomId } from './utils/randomId';
import { debounce } from './utils/debounce';

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
});
