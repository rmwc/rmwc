export type DeprecateT = {
  [oldPropName: string]: string | [string, (value: any) => void];
};

export const deprecationWarning = (message: string) => {
  if (!import.meta.env.PROD) {
    console.warn(`RMWC Deprecation Warning: ${message}`);
  }
};

export const handleDeprecations = (
  props: any,
  deprecate: DeprecateT,
  displayName: string
) => {
  props = { ...props };
  for (const oldPropName in deprecate) {
    const newProp = deprecate[oldPropName];
    let newPropName;
    let transformProp = (value: any) => value;

    if (Array.isArray(newProp)) {
      newPropName = newProp[0];
      transformProp = newProp[1];
    } else {
      newPropName = newProp;
    }

    if (props[oldPropName] !== undefined) {
      if (newPropName === '') {
        /* istanbul ignore next */
        deprecationWarning(
          `${
            displayName || ''
          } component prop '${oldPropName}' has been removed from and is no longer a valid prop.`
        );
      } else {
        props[newPropName] = transformProp(props[oldPropName]);
        let propTransformMessage = '';
        if (props[newPropName] !== props[oldPropName]) {
          propTransformMessage = ` The old value has also been converted from '${props[oldPropName]}' to '${props[newPropName]}'`;
        }

        /* istanbul ignore next */
        deprecationWarning(
          `${
            displayName || ''
          } component prop '${oldPropName}' has been replaced with '${newPropName}'. ${propTransformMessage}`
        );
      }

      delete props[oldPropName];
    }
  }
  return props;
};
