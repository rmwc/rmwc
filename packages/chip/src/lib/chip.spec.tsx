import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip, ChipSet } from './';

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
    expect(screen.getAllByRole('row')[0]).toHaveClass('mdc-chip--selected');
    expect(screen.getAllByRole('row')[1]).toHaveClass('mdc-chip--selected');
  });

  it('handles onInteraction', async () => {
    const onInteraction = vi.fn();
    render(<Chip label="my label" onInteraction={onInteraction} />);

    userEvent.click(screen.getByText('my label'));

    await waitFor(() => expect(onInteraction).toHaveBeenCalledTimes(1));
  });

  it('handles custom ChipIcon', () => {
    render(<Chip icon="favorite" />);

    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  it('handles onTrailingIconInteraction', async () => {
    let onInteraction = vi.fn();
    let onRemove = vi.fn();

    render(
      <Chip
        trailingIcon="close"
        onTrailingIconInteraction={onInteraction}
        onRemove={onRemove}
      />
    );

    userEvent.click(screen.getByText('close'));

    await waitFor(() => {
      expect(onInteraction).toHaveBeenCalledTimes(1);
    });
  });

  it('handles onTrailingIconInteraction onKeyDown (Enter button)', async () => {
    let onInteraction = vi.fn();
    let onRemove = vi.fn();

    render(
      <Chip
        trailingIcon="close"
        onTrailingIconInteraction={onInteraction}
        onRemove={onRemove}
      />
    );

    screen.getByText('close').focus();

    await userEvent.keyboard('{Enter}');

    expect(onInteraction).toHaveBeenCalledTimes(1);
  });

  it('handles onTrailingIconInteraction onKeyDown (Space button)', async () => {
    let onInteraction = vi.fn();
    let onRemove = vi.fn();

    render(
      <Chip
        trailingIcon="close"
        onTrailingIconInteraction={onInteraction}
        onRemove={onRemove}
      />
    );

    screen.getByText('close').focus();

    await userEvent.keyboard('{ }');

    expect(onInteraction).toHaveBeenCalledTimes(1);
  });

  it('does not call onTrailingIconInteraction onKeyDown (Tab button)', async () => {
    let onInteraction = vi.fn();
    let onRemove = vi.fn();

    render(
      <Chip
        trailingIcon="close"
        onTrailingIconInteraction={onInteraction}
        onRemove={onRemove}
      />
    );

    screen.getByText('close').focus();

    await userEvent.tab();

    expect(onInteraction).not.toHaveBeenCalled();
  });
});
