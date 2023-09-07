import { closest } from './ponyfills';

describe('closest function', () => {
  it('should find the closest element using the native closest method', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    const closestElement = closest(child, 'div');

    expect(closestElement).toBe(child);
  });

  it('should find the closest element using the fallback method', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    const closestElement = closest(child, 'div');

    expect(closestElement).toBe(child);
  });

  it('should return null if no closest element is found', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    const closestElement = closest(child, 'span');

    expect(closestElement).toBe(null);
  });

  it('should handle null input', () => {
    const closestElement = closest(null, 'div');

    expect(closestElement).toBe(null);
  });
});
