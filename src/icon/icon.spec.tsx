import * as React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
  it('renders ligature', () => {
    const el = mount(<Icon icon="favorite" />);
    expect(el.html()).toBe(`<i class="rmwc-icon material-icons">favorite</i>`);
  });

  it('renders Url', () => {
    const el2 = mount(
      <Icon icon="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    );
    expect(el2.html()).toBe(
      `<img src="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" class="rmwc-icon material-icons">`
    );
  });

  it('can have custom classnames', () => {
    const el = mount(<Icon className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });

  it('renders with JSX', () => {
    const el = mount(
      <Icon
        icon={
          <div
            style={{ background: 'purple', width: '24px', height: '24px' }}
          />
        }
      />
    );
    expect(el.html()).toBe(
      `<i class="rmwc-icon material-icons"><div style="background: purple; width: 24px; height: 24px;"></div></i>`
    );

    const el2 = mount(
      <Icon
        icon={
          <div
            style={{ background: 'purple', width: '24px', height: '24px' }}
          />
        }
      />
    );
    expect(el2.html()).toBe(
      `<i class="rmwc-icon material-icons"><div style="background: purple; width: 24px; height: 24px;"></div></i>`
    );
  });

  it('renders nested Icons', () => {
    const el = mount(<Icon icon={<Icon icon={<div>Hello World</div>} />} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });

  it('can be sizes', () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    sizes.forEach((size: any) => {
      const el = mount(<Icon icon={{ content: 'favorite', size }} />);
      expect(el.html().includes(`rmwc-icon--size-${size}`)).toEqual(true);
    });
  });

  it('renders className', () => {
    const el = mount(
      <Icon
        icon={{
          content: 'ionic',
          prefix: 'ion-',
          strategy: 'className',
          basename: 'icon'
        }}
      />
    );
    expect(el.html()).toBe(`<i class="rmwc-icon icon ion-ionic"></i>`);
  });

  it('Errors when bad strategy is passed', () => {
    jest.spyOn(console, 'error');
    mount(
      <Icon
        // @ts-ignore
        icon={{
          content: 'foo',
          strategy: 'error'
        }}
      />
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('renders custom', () => {
    const el = mount(
      <Icon
        icon={{
          content: 'CUSTOM',
          strategy: 'custom',
          render: props => (
            <div>
              Customized-
              {props.content}
            </div>
          )
        }}
      />
    );
    expect(el.html().replace(/<!--.+?-->/g, '')).toBe(
      `<div>Customized-CUSTOM</div>`
    );
  });
});
