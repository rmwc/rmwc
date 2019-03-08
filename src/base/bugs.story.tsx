import * as React from 'react';

import { Link, BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import {
  TextField,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Select,
  Switch,
  TabBar,
  Tab,
  IconButton
} from '../rmwc';

class Bug216 extends React.Component {
  state = { isDisabled: false };

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

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  handleClick = () => {
    this.setState({ value: 'Pizza' });
  };

  render() {
    return (
      <React.Fragment>
        <Select
          style={{ width: '100%' }}
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

class Bug293 extends React.Component {
  state = { isLoading: false, checked: false };

  render() {
    return (
      <React.Fragment>
        <Switch
          label="Try to switch me, baby"
          checked={this.state.checked}
          disabled={this.state.isLoading}
          onChange={this.onChange}
        />
        <Checkbox
          label="Try to switch me, baby"
          checked={this.state.checked}
          disabled={this.state.isLoading}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
  onChange = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState(c => ({
        ...c,
        // @ts-ignore
        checked: !c.checked,
        isLoading: false
      }));
    }, 100);
  };
}

class Bug298 extends React.Component {
  state = { show: true };

  render() {
    return (
      <React.Fragment>
        <p>Long click on the button below (so you get a full ripple)</p>
        {this.state.show && (
          <Button
            raised
            onClick={() => {
              this.setState({ show: false });
            }}
          >
            Long click me
          </Button>
        )}
      </React.Fragment>
    );
  }
}

class Bug312 extends React.Component {
  state = {
    checked1: true,
    checked2: true
  };
  render() {
    return (
      <div className="App">
        <div>
          <Checkbox
            checked={this.state.checked1}
            onChange={e => {
              console.log('change', e.currentTarget.checked);
              this.setState({ checked1: e.currentTarget.checked });
            }}
          >
            Test 1
          </Checkbox>
          <Button onClick={() => this.setState({ checked1: true })}>
            Change
          </Button>
        </div>
      </div>
    );
  }
}

const Bug334 = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <TextField
          className={'tester'}
          label="MDC"
          onChange={e => console.log(e.currentTarget.value)}
          onBlur={() => console.log('rmwc blur')}
          onFocus={() => console.log('rmwc onFocus')}
        />
        <input
          onChange={e => console.log(e.currentTarget.value)}
          onBlur={() => console.log('regular blur')}
        />
      </div>
    </div>
  );
};

class Bug338 extends React.Component {
  state = {
    value: ''
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: 'Test'
      });
    }, 1000);
  }

  render() {
    return (
      <TextField label="Foo" value={this.state.value} onChange={() => {}} />
    );
  }
}

class Bug297 extends React.Component {
  state = {
    value: ''
  };

  render() {
    return (
      <TextField
        label="Foo"
        value={this.state.value}
        onChange={evt => this.setState({ value: evt.currentTarget.value })}
        required
      />
    );
  }
}

class Bug350 extends React.Component {
  state = { options: [] };
  ref = React.createRef();

  render() {
    const style = { width: '100%', marginBottom: '1rem' };
    return (
      <React.Fragment>
        <Select
          style={style}
          outlined
          label="Options"
          options={this.state.options}
        />

        <Select
          style={style}
          outlined
          label="Options"
          options={this.state.options}
          ref={this.ref}
        />

        <Button
          onClick={() => {
            this.setState({ options: ['Apples', 'Oranges'] });
          }}
        >
          Update options
        </Button>
      </React.Fragment>
    );
  }
}

class Bug361 extends React.Component {
  state = { checked: false };

  render() {
    return (
      <React.Fragment>
        <div>
          <Switch
            id="test"
            checked={this.state.checked}
            onChange={e => this.setState({ checked: e.currentTarget.checked })}
            label={`Checked ${this.state.checked ? 'yes' : 'no'}`}
          />
        </div>

        <div>
          <Switch
            id="test2"
            checked={this.state.checked}
            onChange={e => this.setState({ checked: e.currentTarget.checked })}
            label="Fixed label"
          />
        </div>

        <Button
          onClick={() =>
            this.setState(state => ({ checked: !this.state.checked }))
          }
        >
          Toggle
        </Button>
      </React.Fragment>
    );
  }
}

class Bug370 extends React.Component {
  state = {
    activeTab: 0
  };

  render() {
    return (
      <TabBar
        activeTabIndex={this.state.activeTab}
        onActivate={evt => {
          setTimeout(() => this.setState({ activeTab: evt.detail.index }), 0);
        }}
      >
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabBar>
    );
  }
}

class Bug374 extends React.Component {
  state = { checked: false };

  render() {
    return (
      <Switch
        label="Label"
        checked={this.state.checked}
        onChange={e => {
          this.setState({ checked: e.currentTarget.checked });
        }}
      />
    );
  }
}

function Bug842vo56019() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <IconButton
        icon="star"
        disabled={disabled}
        onClick={() => setDisabled(true)}
      />

      <IconButton
        icon="favorite"
        disabled={disabled}
        ripple={false}
        onClick={() => setDisabled(true)}
      />

      <Button onClick={() => setDisabled(false)}>Enable</Button>
    </>
  );
}

function Bug383() {
  return (
    <TabBar activeTabIndex={0}>
      <Tab>Cookies</Tab>
      <Tab>Pizza</Tab>
      <Tab>Icecream</Tab>
    </TabBar>
  );
}

function Bug415() {
  return (
    <BrowserRouter>
      <IconButton
        icon={{ icon: 'edit', size: 'medium' }} // or icon="edit"
        label="some label"
        tag={Link}
        {...{ to: '/link' }}
      />
    </BrowserRouter>
  );
}

storiesOf('Bugs', module)
  .add('#206', () => (
    <Menu open={true} onSelect={() => console.log('selected')}>
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
          onChange={e => console.log('change', e.currentTarget.checked)}
        />
        Native
      </label>

      <Checkbox
        checked={true}
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="True controlled"
      />

      <Checkbox
        checked={false}
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="False controlled"
      />
      <Checkbox
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="Uncontrolled"
      />

      <Switch
        checked={true}
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="True controlled"
      />

      <Switch
        checked={false}
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="False controlled"
      />
      <Switch
        onChange={e => console.log('change', e.currentTarget.checked)}
        label="Uncontrolled"
      />
    </React.Fragment>
  ))
  .add('#283', () => <Bug283 />)
  .add('#293', () => <Bug293 />)
  .add('#297', () => <Bug297 />)
  .add('#298', () => <Bug298 />)
  .add('#312', () => <Bug312 />)
  .add('#334', () => <Bug334 />)
  .add('#338', () => <Bug338 />)
  .add('#350', () => <Bug350 />)
  .add('#361', () => <Bug361 />)
  .add('#370', () => <Bug370 />)
  .add('#374', () => <Bug374 />)
  .add('#383', () => <Bug383 />)
  .add('#842vo56019', () => <Bug842vo56019 />)
  .add('#415', () => <Bug415 />);
