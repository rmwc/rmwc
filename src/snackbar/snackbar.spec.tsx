import * as React from 'react';
import { mount } from 'enzyme';
import { Snackbar, SnackbarAction } from './';

describe('Snackbar', () => {
  it('renders', done => {
    const el = mount(
      <Snackbar
        open
        timeout={1000}
        onClose={() => {}}
        message="This is a new message"
        action={<div />}
      />
    );

    setTimeout(() => {
      expect(!!~el.html().search('mdc-snackbar')).toBe(true);
      done();
    }, 1500);
  });

  it('can be leading', () => {
    const el = mount(<Snackbar open message="This is a new message" leading />);
    expect(!!~el.html().search('mdc-snackbar--leading')).toBe(true);
  });

  it('can be multiline', () => {
    mount(<Snackbar open message="This is a new message" />);
  });

  it('can dismissesOnAction', () => {
    const el = mount(
      <Snackbar open message="This is a new message" dismissesOnAction />
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

  it('handles events', () => {
    const el = mount(
      <Snackbar
        open
        timeout={1000}
        onClose={() => {}}
        message="This is a new message"
        dismissIcon
        action={<SnackbarAction label="foo" />}
      />
    );

    const root = el.find('.mdc-snackbar');
    root.simulate('keydown');

    const surface = el.find('.mdc-snackbar__surface');
    surface.simulate('click');

    const action = el.find('.mdc-snackbar__action').first();
    action.simulate('click');

    const dismiss = el.find('.mdc-snackbar__dismiss').first();
    dismiss.simulate('click');
  });
});
