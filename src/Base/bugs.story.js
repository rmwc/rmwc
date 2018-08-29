import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextField, Button, Checkbox, Menu, MenuItem, Select } from '../rmwc';

class Bug216 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisabled: false };
  }

  GO = () => {
    this.setState({ isDisabled: true });
    setTimeout(() => {
      this.setState({ isDisabled: false });
    }, 3);
  };

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.GO}>Test</Button>
        </div>

        <div>
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
          <TextField
            label="Write something..."
            disabled={this.state.isDisabled}
          />
        </div>
      </div>
    );
  }
}

class Bug283 extends React.Component {
  state = { value: '' };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClick = () => {
    this.setState({ value: 'Pizza' });
  };

  render() {
    return (
      <React.Fragment>
        <Select
          outlined
          label="Label"
          placeholder=""
          options={['Cookies', 'Pizza', 'Icecream']}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <br />
        <Button onClick={this.handleClick}>Change value</Button>
      </React.Fragment>
    );
  }
}

storiesOf('Bugs', module)
  .add('#206', () => (
    <Menu open={true} onSelected={() => console.log('selected')}>
      <MenuItem>
        <span>Cookies</span>
      </MenuItem>
    </Menu>
  ))
  .add('#216', () => <Bug216 />)
  .add('#247', () => (
    <React.Fragment>
      <label>
        <input
          type="checkbox"
          checked={true}
          onChange={e => console.log('change', e.target.checked)}
        />
        Native
      </label>

      <Checkbox
        checked={true}
        onChange={e => console.log('change', e.target.checked)}
        label="True controlled"
      />

      <Checkbox
        checked={false}
        onChange={e => console.log('change', e.target.checked)}
        label="False controlled"
      />
      <Checkbox
        onChange={e => console.log('change', e.target.checked)}
        label="Uncontrolled"
      />
    </React.Fragment>
  ))
  .add('#283', () => <Bug283 />);
