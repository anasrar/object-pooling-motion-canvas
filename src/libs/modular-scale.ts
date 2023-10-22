export const modularScale = (
  base: number,
  ratio: number,
  stepForward: number,
  stepBack: number,
) => {
  const result = [base];

  let current = base;
  for (let i = 0; i < stepForward; i++) {
    current = current * ratio;
    result.push(current);
  }

  current = base;
  for (let i = 0; i < stepBack; i++) {
    current = current / ratio;
    result.unshift(current);
  }

  return result;
};
