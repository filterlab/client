export const formatCurrency = (value, currency) => {
  if (currency === "eur") {
    return `${value}€`;
  } else {
    return `${convertCurrency(value, "usd")}$`;
  }
};

export const convertCurrency = (value, currency) =>
  currency === "usd"
    ? Math.round((value * 1.2 + Number.EPSILON) * 100) / 100
    : value;
