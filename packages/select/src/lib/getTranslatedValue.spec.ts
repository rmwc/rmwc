import { getTranslatedValue } from './getTranslatedValue';
import { FormattedOption } from './select';

describe('getTranslatedValue', () => {
  it('should translate the value correctly when options are an array of strings', () => {
    const optionsStringArray = ['One', 'Two'];
    expect(getTranslatedValue(optionsStringArray, 'One')).toBe('One');
  });

  it('should translate the value correctly when options are an array of FormattedOptions', () => {
    const optionsArray: FormattedOption[] = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' }
    ];
    expect(getTranslatedValue(optionsArray, '1')).toBe('One');
    expect(getTranslatedValue(optionsArray, 'One')).toBe('One');
  });

  it('should translate the value correctly when options are an array of objects with string as key', () => {
    const optionsObject: { [value: string]: string } = {
      '1': 'One',
      '2': 'Two',
      '3': 'Three'
    };
    expect(getTranslatedValue(optionsObject, 1)).toBe('One');
    expect(getTranslatedValue(optionsObject, '1')).toBe('One');
    expect(getTranslatedValue(optionsObject, 'One')).toBe('One');
  });

  it('should translate the value correctly when options are an array of objects with number as key', () => {
    const optionsObject: { [value: string]: string } = {
      1: 'One',
      2: 'Two',
      3: 'Three'
    };
    expect(getTranslatedValue(optionsObject, 1)).toBe('One');
    expect(getTranslatedValue(optionsObject, '1')).toBe('One');
    expect(getTranslatedValue(optionsObject, 'One')).toBe('One');
  });

  it('should return the default value when options are undefined', () => {
    expect(getTranslatedValue(undefined, 1)).toBe(1);
  });
});
