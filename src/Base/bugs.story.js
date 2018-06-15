import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextField, Button, Checkbox } from '../rmwc';

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

storiesOf('Bugs', module)
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
  ));
