import { RMWCProvider } from '@rmwc/provider';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTooltip, RichTooltipLink, Tooltip } from './tooltip';
import { Button } from '@rmwc/button';
import { Portal } from '@rmwc/base';

describe('Tooltip', () => {
  it('renders', () => {
    const { asFragment } = render(
      <>
        <Tooltip overlay="tooltip" label="test">
          <span>test</span>
        </Tooltip>
        <Portal />
      </>
    );
    userEvent.hover(screen.getByText('test'));
    expect(screen.getByText('tooltip')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('className', () => {
    const { asFragment } = render(
      <>
        <Tooltip overlay="tooltip" className="my-custom-classname" label="test">
          <span>test</span>
        </Tooltip>
        <Portal />
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('enterDelay', () => {
    render(
      <>
        <Tooltip overlay="tooltip" enterDelay={1000}>
          <span>test</span>
        </Tooltip>
        <Portal />
      </>
    );
  });

  it('leaveDelay', () => {
    render(
      <>
        <Tooltip overlay="tooltip" leaveDelay={1000}>
          <span>test</span>
        </Tooltip>
        <Portal />
      </>
    );
  });

  it('works with provider', () => {
    render(
      <RMWCProvider tooltip={{}}>
        <Tooltip overlay="tooltip">
          <span>test</span>
        </Tooltip>
        <Portal />
      </RMWCProvider>
    );
  });

  it('accepts allowed align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'start' }}>
        <Tooltip label="test">
          <span>test</span>
        </Tooltip>
        <Portal />
      </RMWCProvider>
    );
    expect(console.warn).not.toBeCalled();
  });

  it('warn against wrong align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'bottom' }}>
        <Tooltip label="test">
          <span>test</span>
        </Tooltip>
        <Portal />
      </RMWCProvider>
    );
    expect(console.warn).toBeCalled();
  });
});

describe('RichTooltip', () => {
  it('renders', () => {
    const { asFragment } = render(
      <RichTooltip title="Title" body="This is content" label="test">
        <span>test</span>
      </RichTooltip>
    );
    userEvent.hover(screen.getByText('test'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('can have interactive content', async () => {
    const onClick = vi.fn();

    render(
      <RichTooltip
        title="Title"
        body="This is content"
        actions={<Button onClick={onClick}>Click me</Button>}
      >
        <span>test</span>
      </RichTooltip>
    );

    expect(onClick).not.toHaveBeenCalled();

    userEvent.hover(screen.getByText('test'));
    userEvent.click(screen.getByText('Click me'));

    await waitFor(() => expect(onClick).toHaveBeenCalled());
  });
  it('can have a link', () => {
    const { asFragment } = render(
      <RichTooltip
        title="Title"
        link={
          <RichTooltipLink href="/" target="_blank">
            Link
          </RichTooltipLink>
        }
        label="test"
      >
        <span>test</span>
      </RichTooltip>
    );
    userEvent.hover(screen.getByText('test'));
    expect(asFragment()).toMatchSnapshot();
  });
  it('className', () => {
    const { asFragment } = render(
      <RichTooltip
        className="my-custom-classname"
        title="Title"
        body="This is content"
        label="test"
      >
        <span>test</span>
      </RichTooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
