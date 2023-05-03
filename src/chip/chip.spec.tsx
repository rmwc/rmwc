import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChipSet } from './chip-set';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders', () => {
    const { asFragment } = render(
      <ChipSet>
        <Chip icon="favorite" trailingIcon="close" label="test-label" />
      </ChipSet>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with children', () => {
    render(
      <ChipSet>
        <Chip icon="favorite" trailingIcon="close">
          test-label
        </Chip>
      </ChipSet>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('handles selected', () => {
    render(
      <ChipSet>
        <Chip checkmark selected label="test-label" />
        <Chip checkmark selected icon="favorite" label="test-label" />
      </ChipSet>
    );
    expect(screen.getAllByRole('row')[0]).toHaveClass(
      'mdc-evolution-chip--selected'
    );
    expect(screen.getAllByRole('row')[1]).toHaveClass(
      'mdc-evolution-chip--selected'
    );
  });

  it('handles onInteraction', async () => {
    const onInteraction = jest.fn();
    render(<Chip label="my label" onInteraction={onInteraction} />);

    userEvent.click(screen.getByText('my label'));

    await waitFor(() => expect(onInteraction).toHaveBeenCalledTimes(1));
  });

  it('handles onRemove', async () => {
    const onRemove = jest.fn();
    render(
      <ChipSet>
        <Chip
          label="my label"
          onRemove={onRemove}
          id="1"
          trailingIcon="close"
        />
      </ChipSet>
    );

    userEvent.click(screen.getByText('close'));

    await waitFor(() => expect(onRemove).toHaveBeenCalledTimes(1));
  });

  it('handles onInteraction', async () => {
    const onInteraction = jest.fn();
    render(
      <ChipSet>
        <Chip label="my label" onInteraction={onInteraction} id="1" />
      </ChipSet>
    );

    userEvent.click(screen.getByText('my label'));

    await waitFor(() => expect(onInteraction).toHaveBeenCalledTimes(1));
  });

  it('handles custom ChipIcon', () => {
    render(<Chip icon="favorite" />);

    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  it('should not trigger events when disabled', () => {
    const onClick = jest.fn();

    render(<Chip disabled label="Cookie" onClick={onClick} />);

    userEvent.click(screen.getByText('Cookie'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
