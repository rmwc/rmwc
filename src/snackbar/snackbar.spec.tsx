import * as React from 'react';
import { mount } from 'enzyme';
import { Snackbar } from './';

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
});
