import React from 'react';

import { action } from '@storybook/addon-actions';
import { text, object, array } from '@storybook/addon-knobs';
import { Select } from './';
import { useKnob } from '@rmwc/base/utils/use-knob';
import { MenuItems, MenuItem } from '@rmwc/menu';
import { Portal } from '@rmwc/base';

function MutatingSelect(props: any) {
  const [value, setValue] = useKnob('text', 'value', 'Cookies');
  const [label] = useKnob('text', 'label', 'Label');
  const [enhanced] = useKnob('boolean', 'enhanced', false);
  const [disabled] = useKnob('boolean', 'disabled', false);
  const [options] = useKnob('array', 'options', [
    'Cookies',
    'Pizza',
    'Icecream'
  ]);

  return (
    <Select
      {...props}
      disabled={disabled}
      foundationRef={console.log}
      label={label}
      value={value}
      enhanced={enhanced}
      options={options}
      onBlur={action('onBlur')}
      onClick={action('onClick')}
      onKeyDown={action('onKeyDown')}
      onFocus={action('onFocus')}
      onChange={(evt) => {
        setValue(evt.currentTarget.value);
        action('onChange: ' + evt.currentTarget.value)();
      }}
    />
  );
}

// This story describes the bug in issue https://github.com/jamesmfriedman/rmwc/issues/686
// Selecting the first element of the first select will cause the bug
const DependentSelects = () => {
  const [first, setFist] = React.useState(3);
  const [second, setSecond] = React.useState<number | undefined>(2);

  return (
    <div>
      <Select
        value={first.toString()}
        label="first-select"
        enhanced={{ focusOnOpen: false }}
        onChange={(e: any) => {
          setFist(parseInt(e.detail.value));

          // Clear the second select to cause the bug
          setSecond(undefined);
        }}
      >
        <MenuItem data-value="1">first-menu-item-1</MenuItem>
        <MenuItem data-value="2">first-menu-item-2</MenuItem>
        <MenuItem data-value="3">first-menu-item-3</MenuItem>
      </Select>
      <Select
        value={second?.toString() || ''}
        label="second-select"
        enhanced={{ focusOnOpen: false }}
        onChange={(e: any) => {
          setSecond(e.detail.value);
        }}
      >
        {Array.from(Array(first)).map((num, index) => {
          return (
            <MenuItem key={index} data-value={index}>
              second-menu-item-{index}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

function EnhancedSelect() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <div>
        <Select
          label={'Foods'}
          placeholder={'Select a Food'}
          enhanced
          options={['Cookies', 'Pizza', 'Icecream']}
          icon="favorite"
        />
      </div>

      <div>
        <Select
          label={'Controlled'}
          placeholder={'Select a Food'}
          enhanced
          options={['Cookies', 'Pizza', 'Icecream']}
          value={value}
          onChange={(evt) => {
            console.log('onChange', evt.currentTarget.value);
            setValue(String(evt.currentTarget.value));
          }}
        />
      </div>
      <div>
        <Select
          label={'Controlled'}
          placeholder={'Select a Food'}
          enhanced
          options={['Cookies', 'Pizza', 'Icecream']}
          value={'Cookies'}
          onChange={(evt) => {
            console.log('onChange', evt.currentTarget.value);
          }}
        />
      </div>
      <div>
        <Select
          label={'Manual Enhanced'}
          enhanced={{
            anchorCorner: 'bottomStart'
          }}
          onChange={(evt) => {
            console.log('onChange', evt.currentTarget.value);
            setValue(String(evt.currentTarget.value));
          }}
        >
          <MenuItems twoLine style={{ width: '400px' }}>
            <MenuItem data-value="Cookies">Cookies</MenuItem>
            <MenuItem data-value="Pizza">Pizza</MenuItem>
            <MenuItem data-value="Icecream">Icecream</MenuItem>
          </MenuItems>
        </Select>
      </div>

      <Select label={'Foods'} options={['Cookies', 'Pizza', 'Icecream']} />

      <Select
        label={'Controlled'}
        options={['Cookies', 'Pizza', 'Icecream']}
        value={value}
        onChange={(evt) => {
          console.log('onChange', evt.currentTarget.value);
          setValue(String(evt.currentTarget.value));
        }}
      />

      <Select
        label={'Controlled'}
        placeholder={'Select a Food'}
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        value={value}
        onChange={(evt) => {
          console.log('onChange', evt.currentTarget.value);
          setValue(String(evt.currentTarget.value));
        }}
      />

      <Select label="Manually Built">
        <optgroup label="Dinner">
          <option value="Pizza">Pizza</option>
        </optgroup>
        <optgroup label="Dessert">
          <option value="Cookies">Cookies</option>
          <option value="Icecream">Icecream</option>
        </optgroup>
      </Select>

      <Select
        label="Formatted"
        enhanced
        options={[
          {
            label: 'Dinner',
            options: [
              {
                label: 'Pizza',
                value: '2'
              }
            ]
          },
          {
            label: 'Dessert',
            options: [
              {
                label: 'Cookies',
                value: '1'
              },

              {
                label: 'Icecream',
                value: '3'
              }
            ]
          }
        ]}
      />
    </div>
  );
}

function ControlledSelect() {
  const [value, setValue] = React.useState<string | undefined>('Cookies');
  const opts = [
    {
      label: 'Cookies',
      value: '1'
    },
    {
      label: 'Pizza',
      value: '2'
    },
    {
      label: 'Icecream',
      value: '3'
    }
  ];

  const opts2 = ['Cookies', 'Pizza', 'Icecream'];

  return (
    <>
      <Select
        value={value}
        onChange={(evt) => {
          console.log('RMWC Change', evt);
          setValue(String(evt.currentTarget.value));
        }}
        label="Array"
        options={opts2}
      />
      <Select
        value={value}
        onChange={(evt) => {
          console.log('Enhanced Change', evt);
          setValue(String(evt.currentTarget.value));
        }}
        label="Array"
        enhanced
        options={opts2}
      />
      <select
        value={value}
        onChange={(evt) => {
          console.log('Native Change');
          setValue(evt.currentTarget.value);
        }}
      >
        {opts2.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <hr />

      <Select
        value="Cookies"
        onChange={(evt) => {}}
        label="Array"
        options={opts2}
      />
      <Select label="Array" options={opts2} />
      <Select label="Array" enhanced options={opts2} />
    </>
  );
}

function EnhancedSelectWithPortal(props: any) {
  const [value, setValue] = useKnob('text', 'value', 'Cookies');

  return (
    <>
      <Portal />
      <Select
        label={'Enhanced with Portal'}
        enhanced={{
          renderToPortal: true
        }}
        value={value}
        onChange={(evt) => {
          const value = evt.currentTarget.value;
          console.log('onChange', value);
          setValue(value === undefined ? 'undefined' : value);
        }}
        options={['Cookies', 'Pizza', 'Icecream']}
      />
    </>
  );
}

export default {
  title: 'Select'
};

export const SelectWithObject = () => (
  <Select
    label={text('label', 'Foods')}
    placeholder={text('placeholder', 'Select a Food')}
    options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
  />
);

SelectWithObject.story = {
  name: 'Select with object'
};

export const SelectWithArray = () => (
  <Select
    label={text('label', 'Foods')}
    placeholder={text('placeholder', 'Select a Food')}
    options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
  />
);

SelectWithArray.story = {
  name: 'Select with array'
};

export const SelectAll = () => <EnhancedSelect />;

export const SelectEnhanced = () => (
  <div>
    <Select
      label={'Manual Enhanced'}
      enhanced={{
        anchorCorner: 'bottomStart'
      }}
      onChange={(evt) => {
        console.log('onChange', evt.currentTarget.value);
      }}
    >
      <MenuItems twoLine style={{ width: '400px' }}>
        <MenuItem data-value="cookies">Cookies</MenuItem>
        <MenuItem data-value="pizza">Pizza</MenuItem>
        <MenuItem data-value="icecream">Icecream</MenuItem>
      </MenuItems>
    </Select>
  </div>
);

export const SelectEnhancedWithPortal = () => <EnhancedSelectWithPortal />;

SelectEnhancedWithPortal.story = {
  name: 'Select Enhanced with Portal'
};

export const SelectWithoutPlaceholder = () => (
  <Select
    label={text('label', 'Foods')}
    options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
  />
);

SelectWithoutPlaceholder.story = {
  name: 'Select without placeholder'
};

export const SelectWithInitialValue = () => (
  <Select
    label={text('label', 'Foods')}
    value={text('value', 'Cookies')}
    options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
    onChange={(evt) => action('onChange: ' + evt.currentTarget.value)()}
  />
);

SelectWithInitialValue.story = {
  name: 'Select with initial value'
};

export const SelectWithManyValues = () => (
  <>
    <Select options={[...Array(100)].map(() => Math.random().toString(16))} />
    <Select
      enhanced
      options={[...Array(100)].map(() => Math.random().toString(16))}
    />
  </>
);

SelectWithManyValues.story = {
  name: 'Select with many values'
};

export const SelectWithChildren = () => (
  <Select>
    <option value="Cookies">Cookies</option>
    <option value="Pizza">Pizza</option>
    <option value="Icecream">Icecream</option>
  </Select>
);

SelectWithChildren.story = {
  name: 'Select with children'
};

export const _SelectWithChildren = () => (
  <Select>
    <option value="Cookies">Cookies</option>
    <option value="Pizza">Pizza</option>
    <option value="Icecream">Icecream</option>
  </Select>
);

_SelectWithChildren.story = {
  name: 'Select with children'
};

export const _ControlledSelect = () => {
  return <ControlledSelect />;
};

export const _MutatingSelect = () => <MutatingSelect />;

export const AutoFocus = () => (
  <Select
    label="Autofocus"
    autoFocus
    value="one"
    options={['one', 'two', 'three']}
  />
);

AutoFocus.story = {
  name: 'autoFocus'
};

export const ControlledSingle = () => (
  <Select
    label="Controlled"
    value="one"
    outlined
    enhanced
    options={['one', 'two', 'three']}
    onChange={(evt) => {
      console.log('onChange', evt.currentTarget.value);
    }}
  />
);

export const Changing = function () {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setInterval(() => {
      setValue((val) => (val === '' ? 'one' : ''));
    }, 2000);
  }, []);

  return (
    <Select
      label="Controlled"
      value={value}
      outlined
      enhanced
      options={['one', 'two', 'three']}
      onChange={(evt) => {
        console.log('onChange', evt.currentTarget.value);
      }}
    />
  );
};

export const InterdepndentSelects = DependentSelects;
