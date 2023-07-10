export const calculateTotalPriceWithTenPercentDishes = (calculateArray) => {
  if (!calculateArray) return 0;

  const result = calculateArray.reduce((acc, curr) => {
    return acc + curr?.dishTotalPrice || 0;
  }, 0);
  return result * 0.1 + result;
};
