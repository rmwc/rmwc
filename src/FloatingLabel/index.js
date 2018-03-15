import { simpleTag } from '../Base';

export const FloatingLabel = simpleTag({
  displayName: 'FloatingLabel',
  tag: 'label',
  classNames: props => [
    'mdc-floating-label',
    {
      'mdc-floating-label--float-above': props.value || props.focused
    }
  ],
  consumeProps: ['value', 'focused']
});

export default FloatingLabel;
