export const combineString = (value: string | string[] | unknown) => {
  if (typeof value === 'string') {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(',');
  } else {
    return '';
  }
};
