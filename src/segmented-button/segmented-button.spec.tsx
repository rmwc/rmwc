import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Segment, SegmentedButton } from './';

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

  it('handles onClick', () => {
    const onClick = jest.fn();
    render(
      <SegmentedButton selectType="single">
        <Segment label="Cookies" value="cookies" onClick={onClick} />
      </SegmentedButton>
    );
    userEvent.click(screen.getByText('Cookies'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can be selected', () => {
    render(
      <SegmentedButton selectType="single">
        <Segment label="Cookies" value="cookies" selected />
      </SegmentedButton>
    );
    expect(screen.getByText('Cookies')).toHaveClass(
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

  it('can have custom classnames', () => {
    const { container } = render(
      <SegmentedButton>
        <Segment className={'my-custom-classname'} />
      </SegmentedButton>
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
