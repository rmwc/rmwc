import * as React from 'react';
import { mount } from 'enzyme';
import { TextField, TextFieldHelperText, TextFieldIcon } from './';

describe('TextField', () => {
  it('renders', () => {
    mount(<TextField label="test" placeholder="test" />);
  });

  it('can have children', () => {
    mount(
      <TextField placeholder="test">
        <div>Child</div>
      </TextField>
    );
  });

  it('can have custom classnames', () => {
    const el = mount(
      <TextField placeholder="test" className="my-custom-classname">
        <div>Child</div>
      </TextField>
    );

    const html = el.html();
    expect(
      !!~html.search('mdc-text-field') && !!~html.search('my-custom-classname')
    ).toEqual(true);
  });

  it('can be bound', () => {
    const el = mount(
      <TextField placeholder="test" value="hello world" onChange={evt => {}} />
    );
    expect((el.find('input').getDOMNode() as HTMLInputElement).value).toBe(
      'hello world'
    );
  });

  it('can be textarea', () => {
    const el = mount(
      <TextField
        placeholder="test"
        value="hello world"
        textarea
        onChange={evt => {}}
      />
    );
    expect(
      (el.find('textarea').getDOMNode() as HTMLTextAreaElement).value
    ).toBe('hello world');
  });

  it('can have custom classnames on input', () => {
    const el = mount(<TextField className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });

  it('can be invalid', () => {
    mount(<TextField invalid />);
  });

  it('can be outlined', () => {
    mount(<TextField outlined />);
  });

  it('can be disabled', () => {
    mount(<TextField disabled />);
  });

  it('can be required', () => {
    const el = mount(<TextField value="" onChange={() => {}} required />);
    const getValid = () =>
      el.html().includes('mdc-text-field--invalid') === false;

    // should render valid to start
    expect(getValid()).toBe(true);
  });

  it('can be have leadingIcon', () => {
    mount(<TextField leadingIcon="favorite" />);
  });

  it('can be have trailingIcon', () => {
    mount(<TextField trailingIcon="favorite" />);
  });

  it('label floats on dynamic change', done => {
    const el = mount(<TextField label="test" value="" onChange={() => {}} />);
    expect(el.html().includes('mdc-floating-label--float-above')).toBe(false);
    el.setProps({ value: 'foo' }, () => {
      setTimeout(() => {
        expect(el.html().includes('mdc-floating-label--float-above')).toBe(
          true
        );
        done();
      }, 100);
    });
  });

  it('foundation checks', () => {
    const el = mount(<TextField />);
    const adapter = (el.instance() as TextField).foundation.adapter_;
    adapter.addClass('test');
    adapter.removeClass('test');
    adapter.hasClass('test');
    adapter.registerTextFieldInteractionHandler('click', () => {});
    adapter.deregisterTextFieldInteractionHandler('click', () => {});
    adapter.registerValidationAttributeChangeHandler(() => {});
    adapter.deregisterValidationAttributeChangeHandler({
      disconnect: () => {}
    });
    adapter.isFocused();
    adapter.isRtl();
    adapter.registerInputInteractionHandler('click', () => {});
    adapter.deregisterInputInteractionHandler('click', () => {});
    adapter.getNativeInput();
    adapter.notchOutline(200, false);
    adapter.closeOutline();
    adapter.hasOutline();
    adapter.activateLineRipple();
    adapter.deactivateLineRipple();
    adapter.setLineRippleTransformOrigin(1);
    adapter.shakeLabel(true);
    adapter.floatLabel(true);
    adapter.hasLabel();
    adapter.getLabelWidth();
  });
});

describe('TextFieldIcon', () => {
  it('renders', () => {
    mount(<TextFieldIcon icon="favorite" />);
  });

  it('foundation checks', () => {
    const el = mount(<TextFieldIcon icon="favorite" />);
    const adapter = (el.instance() as TextField).foundation.adapter_;
    adapter.getAttr('test');
    adapter.setAttr('test', 1);
    adapter.removeAttr('test');
    adapter.setContent('test');
    adapter.registerInteractionHandler('click', () => {});
    adapter.deregisterInteractionHandler('click', () => {});
    adapter.notifyIconAction();
  });
});

describe('TextFieldHelperText', () => {
  it('renders', () => {
    mount(<TextFieldHelperText>Hello</TextFieldHelperText>);
  });
});
