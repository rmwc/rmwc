// eslint-disable-next-line @nx/enforce-module-boundaries
import { wait } from '@rmwc/testing-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField, TextFieldHelperText } from './textfield';

describe('TextField', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TextField label="test" placeholder="test" />
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can autoFocus', () => {
    const { container } = render(
      <TextField label="test" placeholder="test" autoFocus />
    );
    expect(document.activeElement).toBe(container.querySelector('input'));
  });

  it('can have children', () => {
    const { asFragment } = render(
      <TextField label="test" placeholder="test">
        <div>Child</div>
      </TextField>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have helpText', () => {
    render(
      <div>
        <TextField helpText="textHelpText1" />
      </div>
    );
    const { container } = render(
      <div>
        <TextField
          helpText={{
            children: 'textHelpText2',
            validationMsg: true,
            persistent: true
          }}
        />
      </div>
    );

    expect(screen.getByText('textHelpText1')).toBeInTheDocument();
    expect(screen.getByText('textHelpText2')).toBeInTheDocument();

    expect(
      container.getElementsByClassName(
        'mdc-text-field-helper-text--validation-msg'
      )
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName('mdc-text-field-helper-text--persistent')
    ).toHaveLength(1);
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <TextField placeholder="test" className="my-custom-classname">
        <div>Child</div>
      </TextField>
    );

    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('can be bound', () => {
    render(
      <TextField placeholder="test" value="hello world" onChange={() => {}} />
    );
    expect(screen.getByRole('textbox')).toHaveValue('hello world');
  });

  it('can be textarea', () => {
    const { asFragment } = render(
      <TextField
        label="test"
        placeholder="test"
        value="hello world"
        textarea
        onChange={() => {}}
      />
    );
    expect(screen.getByText('hello world')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames on input', () => {
    const { container } = render(
      <TextField className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('can be invalid', () => {
    const { asFragment } = render(<TextField label="test" invalid />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be outlined', () => {
    const { asFragment } = render(<TextField label="test" outlined />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be disabled', () => {
    const { asFragment } = render(<TextField label="test" disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be required', async () => {
    const { container } = render(
      <TextField value="" onChange={vi.fn()} required />
    );
    const getValid = () =>
      container.getElementsByClassName('mdc-text-field--invalid').length === 0;

    // should render valid to start
    expect(getValid()).toBe(true);

    fireEvent.focus(screen.getByRole('textbox'));
    await wait(20);
    fireEvent.blur(screen.getByRole('textbox'));

    await waitFor(() => expect(getValid()).toBe(false));
  });

  it('can be have icon', () => {
    const { asFragment } = render(<TextField label="test" icon="favorite" />);
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be have trailingIcon', () => {
    const { asFragment } = render(
      <TextField label="test" trailingIcon="favorite" />
    );
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('supports inputRef as an object reference', () => {
    const textObjectRef: any = { current: null };
    const { rerender } = render(<TextField inputRef={textObjectRef} />);
    expect(textObjectRef.current instanceof HTMLInputElement).toBeTruthy();

    const areaObjectRef: any = { current: null };
    rerender(<TextField inputRef={areaObjectRef} textarea />);
    expect(areaObjectRef.current instanceof HTMLTextAreaElement).toBeTruthy();
  });

  it('supports inputRef as a function reference', () => {
    let inputObjectRef: any;
    const objectRefFunc: any = (el: HTMLInputElement) => {
      inputObjectRef = el;
    };
    render(<TextField inputRef={objectRefFunc} />);
    expect(inputObjectRef instanceof HTMLInputElement).toBeTruthy();
  });

  it('label floats on dynamic change', async () => {
    const { container } = render(
      <TextField label="test" value="" onChange={() => {}} />
    );
    await waitFor(() =>
      expect(
        container.getElementsByClassName('mdc-floating-label--float-above')
      ).toHaveLength(0)
    );
    userEvent.type(screen.getByRole('textbox'), 'foo');
    await waitFor(() =>
      expect(
        container.getElementsByClassName('mdc-floating-label--float-above')
      ).toHaveLength(1)
    );
  });

  it('can have a prefix', () => {
    render(<TextField prefix="USD" />);
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('can have a suffix', () => {
    render(<TextField suffix="USD" />);
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('can be fullwidth', () => {
    const { container } = render(<TextField fullwidth />);

    expect(container.firstChild).toHaveClass('rmwc-text-field--fullwidth');
  });
});

describe('TextFieldHelperText', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TextFieldHelperText>Hello</TextFieldHelperText>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
