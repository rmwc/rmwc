import React from 'react';
import { Elevation } from './';
import { Link, BrowserRouter } from 'react-router-dom';

const elevationStyle = {
  padding: '16px',
  margin: '16px',
  display: 'inline-block',
  width: '96px',
  height: '96px',
  verticalAlign: 'top'
};

class HoverElevation extends React.Component {
  state = {
    elevation: 0
  };

  render() {
    return (
      <Elevation
        style={elevationStyle}
        z={this.state.elevation}
        transition
        onMouseOver={() => this.setState({ elevation: 24 })}
        onMouseOut={() => this.setState({ elevation: 0 })}
      >
        Hover Me {this.state.elevation}dp
      </Elevation>
    );
  }
}

export default {
  title: 'Elevation'
};

export const _Elevation = () => (
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

export const ComponentTest = () => {
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
};
