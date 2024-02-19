import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Elevation } from './elevation';
import { BrowserRouter, Link } from 'react-router-dom';

export default {
  title: 'Elevation',
  component: Elevation
} as Meta;

type Story = StoryObj<typeof Elevation>;

const elevationStyle = {
  padding: '16px',
  margin: '16px',
  display: 'inline-block',
  width: '96px',
  height: '96px',
  verticalAlign: 'top'
};

const HoverElevation = (args) => {
  const [elevation, setElevation] = useState(0);

  return (
    <Elevation
      {...args}
      style={elevationStyle}
      z={elevation}
      transition
      onMouseOver={() => setElevation(24)}
      onMouseOut={() => setElevation(0)}
    >
      Hover Me {elevation}dp
    </Elevation>
  );
};

export const HoverElevationStory: Story = {
  render: (args) => {
    return (
      <div>
        <HoverElevation />

        {Array(25)
          .fill(undefined)
          .map((val, i) => (
            <Elevation z={i} key={i} style={elevationStyle}>
              {i}dp
            </Elevation>
          ))}
      </div>
    );
  }
};

export const ComponentTestStory: Story = {
  render: (args) => {
    return (
      <>
        <Elevation z={10} style={elevationStyle}>
          Box
        </Elevation>

        <Elevation
          z={10}
          style={elevationStyle}
          ref={(el: any) => console.log(el)}
        >
          Ref
        </Elevation>

        <BrowserRouter>
          <Elevation z={10} style={elevationStyle} tag={Link} to="#">
            Tag
          </Elevation>
        </BrowserRouter>
      </>
    );
  }
};
