import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

export default {
  title: 'Typography',
  component: Typography
} as Meta;

type Story = StoryObj<Parameters<typeof Typography>[0]>;

function TypographyRef() {
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);

  React.useEffect(() => {
    console.log('ref1', ref1.current);
    console.log('ref2', ref2.current);
  });

  return (
    <div className="App">
      <Typography ref={ref1} use="headline1">
        Headline
      </Typography>

      <Typography ref={ref2} use="headline1">
        Headline
      </Typography>
    </div>
  );
}

export const TypographyStory: Story = {
  render: (args) => (
    <div>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline1">
        display4
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline2">
        display3
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline3">
        display2
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline4">
        display1
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline5">
        headline
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="headline6">
        title
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="subtitle1">
        subheading2
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="subtitle2">
        subheading1
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="body1">
        body2
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="body2">
        body1
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="caption">
        caption
      </Typography>
      <Typography tag="div" style={{ margin: '16px 0' }} use="button">
        button
      </Typography>
    </div>
  )
};

export const TypographyREFStory: Story = {
  render: (args) => <TypographyRef />
};
