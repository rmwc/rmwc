// @vitest-environment node
import { renderToString as mount } from 'react-dom/server';
import { Avatar, AvatarCount, AvatarGroup } from './';

describe('Avatar SSR', () => {
  it('renders', () => {
    mount(<Avatar src="test" />);
    mount(<AvatarGroup />);
    mount(<AvatarCount value={4} />);
  });
});
