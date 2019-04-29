import * as React from 'react';
import { mount } from 'enzyme';
import { TextField, TextFieldHelperText, TextFieldIcon } from './';

describe('TextField', () => {
  it('renders', () => {
    mount(<TextField label="test" placeholder="test" />);
  });

  it('can autoFocus', () => {
    const el = mount(<TextField label="test" placeholder="test" autoFocus />);
    expect(document.activeElement).toBe(el.find('input').getDOMNode());
  });

  it('can have children', () => {
    mount(
      <TextField placeholder="test">
        <div>Child</div>
      </TextField>
    );
  });

  it('can have helpText', () => {
    const el = mount(
      <div>
        <TextField helpText="textHelpText" />
      </div>
    );
    const el2 = mount(
      <div>
        <TextField
          helpText={{
            children: 'textHelpText',
            validationMsg: true,
            persistent: true
          }}
        />
      </div>
    );

    expect(el.contains('textHelpText')).toBe(true);
    expect(el2.contains('textHelpText')).toBe(true);
    expect(
      el2.html().includes('mdc-text-field-helper-text--validation-msg')
    ).toBe(true);
    expect(el2.html().includes('mdc-text-field-helper-text--persistent')).toBe(
      true
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

  it('can be have icon', () => {
    mount(<TextField icon="favorite" />);
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
});

describe('TextFieldIcon', () => {
  it('renders', () => {
    mount(<TextFieldIcon icon="favorite" />);
  });
});

describe('TextFieldHelperText', () => {
  it('renders', () => {
    mount(<TextFieldHelperText>Hello</TextFieldHelperText>);
  });
});
