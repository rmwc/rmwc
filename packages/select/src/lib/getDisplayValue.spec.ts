import { getDisplayValue } from './getDisplayValue';
import { FormattedOption } from './select';

describe('getDisplayValue', () => {
  it('should get the correct display value when options are an array of strings', () => {
    const optionsStringArray = ['One', 'Two'];
    expect(getDisplayValue(optionsStringArray, 'One')).toBe('One');
  });

  it('should get the correct display value when options are an array of FormattedOptions', () => {
    const optionsArray: FormattedOption[] = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' }
    ];
    expect(getDisplayValue(optionsArray, '1')).toBe('One');
    expect(getDisplayValue(optionsArray, 'One')).toBe('One');
  });

  it('should get the correct display value when options are an array of objects with string as key', () => {
    const optionsObject: { [value: string]: string } = {
      '1': 'One',
      '2': 'Two',
      '3': 'Three'
    };
    expect(getDisplayValue(optionsObject, 1)).toBe('One');
    expect(getDisplayValue(optionsObject, '1')).toBe('One');
    expect(getDisplayValue(optionsObject, 'One')).toBe('One');
  });

  it('should get the correct display value when options are an array of objects with number as key', () => {
    const optionsObject: { [value: string]: string } = {
      1: 'One',
      2: 'Two',
      3: 'Three'
    };
    expect(getDisplayValue(optionsObject, 1)).toBe('One');
    expect(getDisplayValue(optionsObject, '1')).toBe('One');
    expect(getDisplayValue(optionsObject, 'One')).toBe('One');
  });

  it('should return the default value when options are undefined', () => {
    expect(getDisplayValue(undefined, 1)).toBe(1);
  });
});
