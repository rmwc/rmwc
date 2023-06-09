import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedButton } from './segmented-button';
import { Segment } from './segment';

describe('Segmented Button', () => {
  it('renders', () => {
    const { asFragment } = render(
      <SegmentedButton selectType="single">
        <Segment icon="favorite" value="cookies" />
        <Segment label="Button" value="pizza" />
        <Segment icon="favorite" label="Button" value="icecream" />
      </SegmentedButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles onClick', async () => {
    const onClick = jest.fn();
    render(
      <SegmentedButton selectType="single">
        <Segment label="Cookies" value="cookies" onClick={onClick} />
      </SegmentedButton>
    );
    userEvent.click(screen.getByText('Cookies'));

    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
  });

  it('can be selected', () => {
    render(
      <SegmentedButton selectType="single">
        <Segment label="Cookies" value="cookies" selected />
      </SegmentedButton>
    );
    expect(screen.getByText('Cookies').parentElement).toHaveClass(
      'mdc-segmented-button__segment--selected'
    );
  });

  it('can have an icon', () => {
    const { asFragment } = render(
      <SegmentedButton>
        <Segment icon="favorite">Segment</Segment>
      </SegmentedButton>
    );
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have a trailing icon', () => {
    const { asFragment } = render(
      <SegmentedButton>
        <Segment trailingIcon="favorite">Segment</Segment>
      </SegmentedButton>
    );
    expect(screen.getByRole('group').firstChild).toHaveAttribute(
      'trailingicon',
      'favorite'
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    render(
      <SegmentedButton>
        <Segment className={'my-custom-classname'}>Cookies</Segment>
      </SegmentedButton>
    );
    expect(screen.getByText('Cookies').parentElement).toHaveClass(
      'my-custom-classname'
    );
  });

  it('can be disabled', () => {
    render(
      <SegmentedButton>
        <Segment disabled={true}>Segment</Segment>
      </SegmentedButton>
    );
    expect(screen.getByText('Segment').parentElement).toHaveAttribute(
      'disabled'
    );
  });

  it('can be touch', () => {
    render(
      <SegmentedButton>
        <Segment touch>Segment</Segment>
      </SegmentedButton>
    );
    expect(screen.getByText('Segment').parentElement).toHaveClass(
      'mdc-segmented-button--touch'
    );
  });
});
