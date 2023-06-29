export const dateFormatter = new Intl.DateTimeFormat("en-CA");

export const priceFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});
