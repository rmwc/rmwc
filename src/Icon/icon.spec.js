import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './';

describe('Icon', () => {
  it('renders ligature', () => {
    const el = mount(<Icon>favorite</Icon>);
    expect(el.html()).toBe(`<i class="material-icons ">favorite</i>`);

    const el2 = mount(<Icon use="favorite" />);
    expect(el2.html()).toBe(`<i class="material-icons ">favorite</i>`);
  });

  it('renders Url', () => {
    const el = mount(
      <Icon>
        https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon
      </Icon>
    );
    expect(el.html()).toBe(
      `<img class="material-icons " src="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon">`
    );

    const el2 = mount(
      <Icon use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
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
      <Icon>
        <div style={{ background: 'purple', width: '24px', height: '24px' }} />
      </Icon>
    );
    expect(el.html()).toBe(
      `<i class="material-icons "><div style="background: purple; width: 24px; height: 24px;"></div></i>`
    );

    const el2 = mount(
      <Icon
        use={
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
    const el = mount(<Icon use={<Icon use={<div>Hello World</div>} />} />);
    expect(!!~el.html().search('Hello World')).toEqual(true);
  });

  it('renders className', () => {
    const el = mount(
      <Icon prefix="ion-" strategy="className" basename="icon">
        ionic
      </Icon>
    );
    expect(el.html()).toBe(`<i class="icon ion-ionic "></i>`);

    const el2 = mount(
      <Icon prefix="ion-" use="ionic" strategy="className" basename="icon" />
    );
    expect(el2.html()).toBe(`<i class="icon ion-ionic "></i>`);
  });

  it('renders custom', () => {
    const el = mount(
      <Icon
        strategy="custom"
        render={props => <div>Customized-{props.content}</div>}
        use="CUSTOM"
      />
    );
    expect(el.html()).toBe(`<div>Customized-CUSTOM</div>`);

    const el2 = mount(
      <Icon
        strategy="custom"
        render={props => <div>Customized-{props.content}</div>}
      >
        CUSTOM
      </Icon>
    );
    expect(el2.html()).toBe(`<div>Customized-CUSTOM</div>`);
  });
});
