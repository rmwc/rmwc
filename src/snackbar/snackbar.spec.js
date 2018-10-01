import * as React from 'react';
import { mount } from 'enzyme';
import { Snackbar } from './';

describe('Snackbar', () => {
  it('renders', done => {
    const el = mount(
      <Snackbar
        show
        timeout={1000}
        onHide={() => console.log('HIDE')}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
      />
    );

    setTimeout(() => {
      expect(!!~el.html().search('mdc-snackbar')).toBe(true);
      done();
    }, 1500);
  });

  it('can be alignStart', () => {
    const el = mount(
      <Snackbar
        show
        onHide={evt => {}}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
        alignStart
      />
    );
    expect(!!~el.html().search('mdc-snackbar--align-start')).toBe(true);
  });

  it('can be multiline', () => {
    mount(<Snackbar show message="This is a new message" multiline />);
  });

  it('can dismissesOnAction', () => {
    const el = mount(
      <Snackbar show message="This is a new message" dismissesOnAction />
    );
    el.setProps({ dismissesOnAction: false });
  });

  it('can be have JSX', () => {
    mount(
      <Snackbar>
        <div>Hello World</div>
      </Snackbar>
    );

    mount(<Snackbar message={<div>Hello World</div>} />);
  });
});
