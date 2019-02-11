import * as React from 'react';
import { mount } from 'enzyme';
import { Select, SelectBase, SelectIcon } from './';

describe('Select', () => {
  it('renders', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
  });

  it('helpText', () => {
    const el = mount(
      <div>
        <Select
          helpText="selectHelpText"
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    const el2 = mount(
      <div>
        <Select
          helpText={{
            children: 'selectHelpText',
            validationMsg: true,
            persistent: true
          }}
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    expect(el.contains('selectHelpText')).toBe(true);
    expect(el2.contains('selectHelpText')).toBe(true);
    expect(el2.html().includes('mdc-select-helper-text--validation-msg')).toBe(
      true
    );
    expect(el2.html().includes('mdc-select-helper-text--persistent')).toBe(
      true
    );
  });

  it('can have empty placeholder', () => {
    const el = mount(
      <Select
        placeholder=""
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    // make sure the label is not floating
    expect(el.html().includes('mdc-select__label--float-above')).toBe(false);

    // make sure we have 4 options
    expect(el.find('option').length).toBe(4);
  });

  it('can accept options array', () => {
    mount(<Select placeholder="Select a food" options={['1', '2', '3']} />);
  });

  it('can be outlined', () => {
    const el = mount(<Select outlined options={['1', '2', '3']} />);
    expect(el.html().includes('mdc-select--outlined')).toBe(true);
  });

  it('can accept formatted options array', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={[
          {
            label: 'Cookies',
            value: '1'
          },
          {
            label: 'Pizza',
            value: '2',
            'aria-disabled': true,
            tabIndex: -1
          },
          {
            label: 'Icecream',
            value: '3'
          }
        ]}
      />
    );
  });

  it('can have a tab index', () => {
    const el = mount(<Select tabIndex={1} options={['1', '2', '3']} />);
    expect(!!~el.html().search('tabindex="1"')).toEqual(true);
  });

  it('can have custom rootProps', () => {
    mount(<Select rootProps={{ name: 'test' }} />);
  });

  it('can be disabled', done => {
    const el = mount(<Select disabled={false} options={['1', '2', '3']} />);
    expect(el.html().includes('mdc-select--disabled')).toBe(false);
    el.setProps({ disabled: true });
    setTimeout(() => {
      expect(el.html().includes('mdc-select--disabled')).toBe(true);
      done();
    });
  });

  it('can have custom classnames', () => {
    const el = mount(
      <Select
        className={'my-custom-classname'}
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    expect(el.find('.mdc-select').hasClass('my-custom-classname')).toEqual(
      true
    );
  });

  it('adapter checks', () => {
    const standard = mount(
      <SelectBase options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }} />
    );

    const enhanced = mount(
      <SelectBase
        enhanced
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    const inst = standard.instance() as any;
    const a = inst.foundation.adapter_;
    const enhancedA = (enhanced.instance() as any).foundation.adapter_;

    [a, enhancedA].forEach(a => {
      a.getValue();
      a.setValue();
      a.openMenu();
      a.closeMenu();
      a.isMenuOpen();
      a.setSelectedIndex(0);
      a.setDisabled(false);
      a.setValid(true);

      // having an issue polyiflling check validity
      //a.checkValidity();
    });

    a.addClass('test');
    a.hasClass('test');
    a.removeClass('test');
    a.isRtl();
    a.setRippleCenter(0);
    a.activateBottomLine();
    a.deactivateBottomLine();
    a.notifyChange();

    a.hasOutline();
    a.notchOutline(0, false);
    a.closeOutline();

    a.floatLabel(false);
    a.getLabelWidth();
  });
});

describe('Select Icon', () => {
  it('renders', () => {
    mount(<SelectIcon icon="favorite" />);
  });

  // it('adapter checks', () => {
  //   const el = mount(<SelectIcon icon="favorite" />);
  //   const a = el.instance().foundation.adapter_;

  //   a.getAttr('test');
  //   a.setAttr('test', 'test');
  //   a.removeAttr('test');
  //   a.setContent('test');
  //   a.registerInteractionHandler('click', () => {});
  //   a.deregisterInteractionHandler('click', () => {});
  //   a.notifyIconAction();
  // });
});
