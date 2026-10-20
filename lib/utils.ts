export { cn } from "cn";

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});
