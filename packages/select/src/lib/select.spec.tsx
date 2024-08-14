import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';
import { Portal } from '@rmwc/base';

const ConditionallyRenderedSelect = ({
  onChange
}: {
  onChange: () => void;
}) => {
  const [displaySelect, setDisplaySelect] = React.useState('');
  return (
    <>
      <Select
        data-testid="display-selection"
        label="Display"
        onChange={(e) => setDisplaySelect(e.currentTarget.value)}
        value={displaySelect}
        options={['cookie', 'pizza', 'Icecream']}
      />
      {displaySelect && (
        <Select
          data-testid="next-selection"
          label="Next"
          options={['cookie', 'pizza']}
          onChange={onChange}
        />
      )}
    </>
  );
};

describe('Select', () => {
  it('renders', () => {
    const { asFragment } = render(
      <Select
        label="test"
        placeholder="Select a food"
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    render(
      <Select
        label="myLabel"
        onChange={onChange}
        options={['cookie', 'pizza']}
      />
    );

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.selectOptions(screen.getByRole('combobox'), 'pizza');

    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange enhanced', async () => {
    const onChange = vi.fn();
    render(
      <Select
        label="myLabel"
        onChange={onChange}
        options={['cookie', 'pizza']}
        enhanced
      />
    );

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('menuitem', { name: 'pizza' }));

    expect(onChange).toHaveBeenCalled();
  });

  it('helpText', () => {
    const el1 = render(
      <div>
        <Select
          helpText="selectHelpText1"
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    const el2 = render(
      <div>
        <Select
          helpText={{
            children: 'selectHelpText2',
            validationMsg: true,
            persistent: true
          }}
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    expect(screen.getByText('selectHelpText1')).toBeInTheDocument();
    expect(screen.getByText('selectHelpText2')).toBeInTheDocument();

    expect(
      el2.container.getElementsByClassName(
        'mdc-select-helper-text--validation-msg'
      )
    ).toHaveLength(1);
    expect(
      el2.container.getElementsByClassName('mdc-select-helper-text--persistent')
    ).toHaveLength(1);
  });

  it('can have empty placeholder', () => {
    const { container } = render(
      <Select
        placeholder=""
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    // make sure the label is not floating
    expect(
      container.getElementsByClassName('mdc-select__label--float-above')
    ).toHaveLength(0);

    // make sure we have 4 options
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('can accept options array', () => {
    const { asFragment } = render(
      <Select
        label="test"
        placeholder="Select a food"
        options={['1', '2', '3']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be outlined', () => {
    const { container } = render(<Select outlined options={['1', '2', '3']} />);
    expect(container.firstChild).toHaveClass('mdc-select--outlined');
  });

  it('can be invalid', () => {
    const { container } = render(<Select invalid />);
    expect(container.firstChild).toHaveClass('mdc-select--invalid');
  });

  it('can be required', () => {
    const { container } = render(<Select required />);
    expect(container.firstChild).toHaveClass('mdc-select--required');
  });

  it('can have icon', () => {
    render(<Select icon="favorite" />);
    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  it('can accept formatted options array', () => {
    const { asFragment } = render(
      <Select
        label="test"
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have a tab index', () => {
    const { container } = render(
      <Select tabIndex={1} options={['1', '2', '3']} />
    );
    expect(
      container.getElementsByClassName('rmwc-select__native-control')[0]
    ).toHaveAttribute('tabIndex', '1');
  });

  it('can have custom rootProps', () => {
    const { asFragment } = render(
      <Select label="test" rootProps={{ name: 'test' }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be disabled', () => {
    const selectInput = render(
      <Select label="myLabel" disabled={false} options={['1', '2', '3']} />
    );

    expect(screen.getByRole('combobox')).not.toBeDisabled();

    expect(
      selectInput.container.getElementsByClassName('mdc-select--disabled')
    ).toHaveLength(0);

    selectInput.rerender(<Select disabled={true} options={['1', '2', '3']} />);

    expect(screen.getByRole('combobox')).toBeDisabled();

    expect(
      selectInput.container.getElementsByClassName('mdc-select--disabled')
    ).toHaveLength(1);
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <Select
        className={'my-custom-classname'}
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
    expect(container.getElementsByClassName('mdc-select')[0]).toHaveClass(
      'my-custom-classname'
    );
  });

  it('can autofocus', () => {
    const { container } = render(
      <Select options={['one', 'two', 'three']} autoFocus />
    );
    expect(document.activeElement).toBe(container.querySelector('select'));
  });

  it('can be conditionally rendered without breaking', async () => {
    const onChange = vi.fn();
    render(<ConditionallyRenderedSelect onChange={onChange} />);

    await userEvent.selectOptions(
      screen.getByTestId('display-selection'),
      'Icecream'
    );
    await userEvent.selectOptions(
      screen.getByTestId('display-selection'),
      'Icecream'
    );

    await userEvent.click(screen.getByText(/next/i));
    await userEvent.selectOptions(
      screen.getByTestId('next-selection'),
      'pizza'
    );

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});

describe('Select: Lifecycle', () => {
  it('SelectedText is blank with no value', () => {
    const { container } = render(
      <Select options={['Cookies', 'Pizza', 'Icecream']} />
    );
    expect(
      container.getElementsByClassName('mdc-select__selected_text')
    ).toHaveLength(0);
  });

  it('SelectedText is blank with no value, enhanced', () => {
    const { container } = render(
      <Select enhanced options={['Cookies', 'Pizza', 'Icecream']} />
    );
    expect(
      container.getElementsByClassName('mdc-select__selected_text')
    ).toHaveLength(0);
  });

  it('SelectedText is blank with incorrect defaultValue', () => {
    const { container } = render(
      <Select options={['Cookies', 'Pizza', 'Icecream']} defaultValue="Foo" />
    );
    expect(
      container.getElementsByClassName('mdc-select__selected_text')
    ).toHaveLength(0);
  });

  it('SelectedText is blank with incorrect defaultValue, enhanced', () => {
    const { container } = render(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Foo"
      />
    );
    expect(
      container.getElementsByClassName('mdc-select__selected_text')
    ).toHaveLength(0);
  });

  it('SelectedText is set to value', () => {
    render(
      <Select options={['Cookies', 'Pizza', 'Icecream']} value="Cookies" />
    );
    expect(screen.getAllByText('Cookies')[0]).toHaveClass(
      'mdc-select__selected-text'
    );
  });

  it('SelectedText is set to value, enhanced', () => {
    render(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        value="Cookies"
      />
    );
    expect(screen.getAllByText('Cookies')[0]).toHaveClass(
      'mdc-select__selected-text'
    );
  });

  it('SelectedText is set to default value', () => {
    render(
      <Select
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Cookies"
      />
    );
    expect(screen.getAllByText('Cookies')[0]).toHaveClass(
      'mdc-select__selected-text'
    );
  });

  it('SelectedText is set to default value, enhanced', () => {
    render(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Cookies"
      />
    );
    expect(screen.getAllByText('Cookies')[0]).toHaveClass(
      'mdc-select__selected-text'
    );
  });

  it('Select matches snapshot when enhanced, has defaultValue and renderToPortal', () => {
    const { asFragment } = render(
      <>
        <Portal />
        <Select
          label="test"
          enhanced={{ renderToPortal: true }}
          options={['Cookies', 'Pizza', 'Icecream']}
          defaultValue="Cookies"
        />
      </>
    );
    expect(screen.getAllByText('Cookies')[1]).toHaveClass(
      'mdc-select__selected-text'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
