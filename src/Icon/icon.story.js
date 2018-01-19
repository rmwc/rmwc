import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Icon } from './';
import { RMWCProvider } from '../Provider';

storiesOf('Icons', module).add('Icon', () => (
  <ul>
    <li>
      Ligature child: <Icon>favorite</Icon>
    </li>
    <li>
      Ligature use: <Icon use="favorite" />
    </li>
    <li>
      Url child:
      <Icon>
        https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon
      </Icon>
    </li>
    <li>
      Url use:{' '}
      <Icon use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon" />
    </li>
    <li>
      Component child:{' '}
      <Icon>
        <div style={{ background: 'purple', width: '24px', height: '24px' }} />
      </Icon>
    </li>
    <li>
      Component Use:
      <Icon
        use={
          <div
            style={{ background: 'purple', width: '24px', height: '24px' }}
          />
        }
      />
    </li>
    <li>
      Nested Icon Child:{' '}
      <Icon>
        <Icon
          use={
            <div
              style={{ background: 'blue', width: '24px', height: '24px' }}
            />
          }
        />
      </Icon>
    </li>
    <li>
      Nested Icon Use:{' '}
      <Icon
        use={
          <Icon
            use={
              <div
                style={{ background: 'blue', width: '24px', height: '24px' }}
              />
            }
          />
        }
      />
    </li>
    <li>
      className child:{' '}
      <Icon prefix="ion-" strategy="className" basename="icon">
        ionic
      </Icon>
    </li>
    <li>
      className use:{' '}
      <Icon prefix="ion-" use="ionic" strategy="className" basename="icon" />
    </li>
    <li>
      custom child:{' '}
      <Icon
        strategy="custom"
        render={props => <div>Customized-{props.content}</div>}
      >
        CUSTOM
      </Icon>
    </li>
    <li>
      custom use:{' '}
      <Icon
        strategy="custom"
        render={props => <div>Customized-{props.content}</div>}
        use="CUSTOM"
      />
    </li>
    <li>
      custom with Provider:{' '}
      <RMWCProvider
        iconStrategy="custom"
        iconRender={props => <div>Custom + {props.content}</div>}
      >
        <Icon use="test" />
      </RMWCProvider>
    </li>
  </ul>
));
