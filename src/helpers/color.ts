/* eslint-disable */
const colors: { [key: string]: string } = {};

export const stringToColorCode = (str: string) => {
  return str in colors
    ? colors[str]
    : (colors[str] = `#${`000000${((Math.random() * 0xffffff) << 0).toString(16)}`.slice(-6)}`);
};
