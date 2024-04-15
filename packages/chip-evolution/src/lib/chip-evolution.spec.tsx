import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ChipEvolution } from './chip-evolution';
import { ChipSetEvolution } from './chip-set-evolution';

describe('Chip', () => {
  it('renders', () => {
    const { asFragment } = render(
      <ChipSetEvolution>
        <ChipEvolution icon="favorite" label="test-label" />
      </ChipSetEvolution>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with children', () => {
    render(
      <ChipSetEvolution>
        <ChipEvolution icon="favorite" label="test-label" />
      </ChipSetEvolution>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('renders as filter chips', () => {
    const { asFragment } = render(
      <ChipSetEvolution filter>
        <ChipEvolution icon="favorite" label="test-label" />
      </ChipSetEvolution>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as input chips', () => {
    const { asFragment } = render(
      <ChipSetEvolution input>
        <ChipEvolution icon="favorite" label="test-label" />
      </ChipSetEvolution>
    );

    expect(screen.getByText('test-label')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles selected', () => {
    render(
      <ChipSetEvolution>
        <ChipEvolution checkmark selected label="test-label" />
        <ChipEvolution checkmark selected icon="favorite" label="test-label" />
      </ChipSetEvolution>
    );
    expect(screen.getAllByRole('row')[0]).toHaveClass(
      'mdc-evolution-chip--selected'
    );
    expect(screen.getAllByRole('row')[1]).toHaveClass(
      'mdc-evolution-chip--selected'
    );
  });

  it('handles onInteraction', async () => {
    const onInteraction = vi.fn();
    render(<ChipEvolution label="my label" onInteraction={onInteraction} />);

    userEvent.click(screen.getByText('my label'));

    await waitFor(() => expect(onInteraction).toHaveBeenCalledTimes(1));
  });

  it('handles onRemove', async () => {
    const onRemove = vi.fn();
    render(
      <ChipSetEvolution input>
        <ChipEvolution
          label="my label"
          onRemove={onRemove}
          trailingIcon="close"
        />
      </ChipSetEvolution>
    );

    userEvent.click(screen.getByText('close'));

    await waitFor(() => expect(onRemove).toHaveBeenCalledTimes(1));
  });

  it('handles onInteraction', async () => {
    const onInteraction = vi.fn();
    render(
      <ChipSetEvolution>
        <ChipEvolution label="my label" onInteraction={onInteraction} />
      </ChipSetEvolution>
    );

    userEvent.click(screen.getByText('my label'));

    await waitFor(() => expect(onInteraction).toHaveBeenCalledTimes(1));
  });

  it('handles custom ChipIcon', () => {
    render(<ChipEvolution icon="favorite" />);

    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  it('should not trigger events when disabled', () => {
    const onClick = vi.fn();

    render(<ChipEvolution disabled label="Cookie" onClick={onClick} />);

    userEvent.click(screen.getByText('Cookie'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can be overlow', () => {
    const { container } = render(
      <ChipSetEvolution overflow>
        <ChipEvolution label="Cookie" />
      </ChipSetEvolution>
    );
    expect(container.firstChild).toHaveClass('mdc-evolution-chip-set--overlow');
  });

  it('can be role grid', () => {
    const { container } = render(
      <ChipSetEvolution action>
        <ChipEvolution label="Cookie" />
      </ChipSetEvolution>
    );
    expect(container.firstChild).toHaveAttribute('role', 'grid');
  });

  it('can be role listbox and receive prop aria-orientation', () => {
    const { container } = render(
      <ChipSetEvolution filter>
        <ChipEvolution label="Cookie" />
      </ChipSetEvolution>
    );
    expect(container.firstChild).toHaveAttribute('role', 'listbox');
    expect(container.firstChild).toHaveAttribute(
      'aria-orientation',
      'horizontal'
    );
  });
});
