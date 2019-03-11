import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array } from '@storybook/addon-knobs';
import { Select } from './';
import { useKnob } from '@rmwc/base/utils/use-knob';

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
      label={label}
      value={value}
      enhanced={enhanced}
      options={options}
      onBlur={action('onBlur')}
      onClick={action('onClick')}
      onKeyDown={action('onKeyDown')}
      onFocus={action('onFocus')}
      onChange={evt => {
        setValue(evt.currentTarget.value);
        action('onChange: ' + evt.currentTarget.value)();
      }}
    />
  );
}

function EnhancedSelect() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <Select
        label={'Foods'}
        placeholder={'Select a Food'}
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        icon="favorite"
      />

      <Select
        label={'Controlled'}
        placeholder={'Select a Food'}
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        value={value}
        onChange={evt => {
          console.log('onChange', evt.currentTarget.value);
          setValue(evt.currentTarget.value);
        }}
      />

      <Select label={'Foods'} options={['Cookies', 'Pizza', 'Icecream']} />

      <Select
        label={'Controlled'}
        options={['Cookies', 'Pizza', 'Icecream']}
        value={value}
        onChange={evt => {
          console.log('onChange', evt.currentTarget.value);
          setValue(evt.currentTarget.value);
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
  const [value, setValue] = React.useState<string | undefined>(undefined);
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
        onChange={evt => {
          setValue(evt.currentTarget.value);
          console.log(evt.currentTarget.value, evt.currentTarget.value);
        }}
        label="Array"
        options={opts2}
      />
      <select
        value={value}
        onChange={evt => {
          setValue(evt.currentTarget.value);
          console.log(evt.currentTarget.value, evt.currentTarget.value);
        }}
      >
        {opts2.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </>
  );
}

storiesOf('Inputs and Controls', module)
  .add('Select with object', () => (
    <Select
      label={text('label', 'Foods')}
      placeholder={text('placeholder', 'Select a Food')}
      options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
    />
  ))
  .add('Select with array', () => (
    <Select
      label={text('label', 'Foods')}
      placeholder={text('placeholder', 'Select a Food')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
    />
  ))

  .add('Select Enhanced', () => <EnhancedSelect />)
  .add('Select without placeholder', () => (
    <Select
      label={text('label', 'Foods')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
    />
  ))
  .add('Select with initial value', () => (
    <Select
      label={text('label', 'Foods')}
      value={text('value', 'Cookies')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.currentTarget.value)()}
    />
  ))
  .add('Select with many values', () => (
    <>
      <Select options={[...Array(100)].map(() => Math.random().toString(16))} />
      <Select
        enhanced
        options={[...Array(100)].map(() => Math.random().toString(16))}
      />
    </>
  ))
  .add('Select with children', () => (
    <Select>
      <option value="Cookies">Cookies</option>
      <option value="Pizza">Pizza</option>
      <option value="Icecream">Icecream</option>
    </Select>
  ))
  .add('Select with children', () => (
    <Select>
      <option value="Cookies">Cookies</option>
      <option value="Pizza">Pizza</option>
      <option value="Icecream">Icecream</option>
    </Select>
  ))
  .add('Controlled Select', () => {
    return <ControlledSelect />;
  })
  .add('Mutating Select', () => <MutatingSelect />);
