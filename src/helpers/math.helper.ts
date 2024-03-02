export const Round = (value: number, digits: number) => {
  const multiplier = Math.pow(10, digits);
  return Math.round(value * multiplier) / multiplier;
};
