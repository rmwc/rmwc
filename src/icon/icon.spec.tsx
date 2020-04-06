import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
  it('renders ligature', () => {
    const el = mount(<Icon icon="favorite" />);
    expect(el.html()).toBe(
      `<i class="rmwc-icon rmwc-icon--ligature material-icons">favorite</i>`
    );
  });

  it('renders Url', () => {
    const el2 = mount(<Icon icon="images/icons/twitter.png" />);
    expect(el2.html()).toBe(
      `<i class="rmwc-icon rmwc-icon--url material-icons" style="background-image: url(images/icons/twitter.png);"></i>`
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
      `<i class="rmwc-icon rmwc-icon--component material-icons"><div style="background: purple; width: 24px; height: 24px;"></div></i>`
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
      `<i class="rmwc-icon rmwc-icon--component material-icons"><div style="background: purple; width: 24px; height: 24px;"></div></i>`
    );
  });

  it('renders svg', () => {
    const el = mount(
      <Icon
        icon={
          <svg>
            <path />
          </svg>
        }
      />
    );
    expect(el.html()).toBe(
      `<svg class="rmwc-icon rmwc-icon--component material-icons"><path></path></svg>`
    );
  });

  it('renders nested Icons', () => {
    const el = mount(<Icon icon={<Icon icon={<div>Hello World</div>} />} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });

  it('can be sizes', () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    sizes.forEach((size: any) => {
      const el = mount(<Icon icon={{ icon: 'favorite', size }} />);
      expect(el.html().includes(`rmwc-icon--size-${size}`)).toEqual(true);
    });
  });

  it('renders className', () => {
    const el = mount(
      <Icon
        icon={{
          icon: 'ionic',
          prefix: 'ion-',
          strategy: 'className',
          basename: 'icon'
        }}
      />
    );
    expect(el.html()).toBe(
      `<i class="rmwc-icon rmwc-icon--className icon ion-ionic"></i>`
    );
  });

  it('Errors when bad strategy is passed', () => {
    jest.spyOn(console, 'error');
    mount(
      <Icon
        // @ts-ignore
        icon={{
          icon: 'foo',
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
          icon: 'CUSTOM',
          strategy: 'custom',
          render: (props) => (
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
