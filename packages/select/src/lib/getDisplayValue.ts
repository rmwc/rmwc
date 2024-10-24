import { FormattedOption, OptionsType } from './select';

export const getDisplayValue = (
  options: OptionsType | undefined,
  defaultValue: any
) => {
  if (options === undefined) {
    return defaultValue;
  }
  if (Array.isArray(options)) {
    if (typeof options[0] === 'string') {
      // Case where options is a string array
      return options.includes(defaultValue) ? defaultValue : '';
    } else {
      // Case where options is an array of FormattedOption
      const formattedOptions = options as FormattedOption[];
      const option = formattedOptions.find(
        (opt) => opt.value === defaultValue || opt.label === defaultValue
      );
      return option ? option.label : '';
    }
  } else {
    // Case where options is an object
    const optionsObject = options as { [value: string]: string };
    if (optionsObject[defaultValue]) {
      // If the defaultValue is a key, return the corresponding value
      return optionsObject[defaultValue];
    } else {
      // If the defaultValue is a value, find the corresponding key
      const key = Object.keys(optionsObject).find(
        (key) => optionsObject[key] === defaultValue
      );
      return key ? optionsObject[key] : '';
    }
  }
};
