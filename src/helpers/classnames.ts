export function classnames(classesObj: Object): string {
  return Object.entries(classesObj).reduce((result, [key, value]) => {
    return value ? `${result} ${key}` : result;
  }, '');
}
