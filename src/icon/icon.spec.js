import * as React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
  it('renders ligature', () => {
    const el = mount(<Icon icon="favorite" />);
    expect(el.html()).toBe(`<i class="material-icons ">favorite</i>`);
  });

  it('renders Url', () => {
    const el2 = mount(
      <Icon icon="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    );
    expect(el2.html()).toBe(
      `<img class="material-icons " src="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon">`
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
      `<i class="material-icons "><div style="background: purple; width: 24px; height: 24px;"></div></i>`
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
      `<i class="material-icons "><div style="background: purple; width: 24px; height: 24px;"></div></i>`
    );
  });

  it('renders nested Icons', () => {
    const el = mount(<Icon icon={<Icon icon={<div>Hello World</div>} />} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });

  it('renders className', () => {
    const el = mount(
      <Icon
        icon="ionic"
        iconOptions={{
          prefix: 'ion-',
          strategy: 'className',
          basename: 'icon'
        }}
      />
    );
    expect(el.html()).toBe(`<i class="icon ion-ionic "></i>`);
  });

  it('renders custom', () => {
    const el = mount(
      <Icon
        icon="CUSTOM"
        iconOptions={{
          strategy: 'custom',
          render: props => <div>Customized-{props.content}</div>
        }}
      />
    );
    expect(el.html().replace(/<!--.+?-->/g, '')).toBe(
      `<div>Customized-CUSTOM</div>`
    );
  });
});
