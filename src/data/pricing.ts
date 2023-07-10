import { PlanFrequency, frequencyToLabel } from "./frequency";

export type Pricing = Record<keyof typeof PlanFrequency, number>;
export interface PlanInfo {
  // TODO: Add icon
  userLabel: string;
  machineLabel: string;
  pricing: Pricing;
}

// NOTE: Price is assumed USD currently
const priceFormatter = Intl.NumberFormat(undefined, {
  style: "currency",
  minimumFractionDigits: 0,
  currency: "USD",
});

export function formatPrice(pricing: Pricing, frequency: PlanFrequency) {
  let frequencyAbbreviation: string;
  switch (frequency) {
    case PlanFrequency.Monthly:
      frequencyAbbreviation = "mo";
      break;
    case PlanFrequency.Yearly:
      frequencyAbbreviation = "yr";
      break;
    default:
      throw new TypeError("Invalid frequency");
  }

  let price = pricing[frequencyToLabel(frequency)];

  return `${priceFormatter.format(price)}/${frequencyAbbreviation}`;
}

export function formatAggregatePrice(
  pricings: Pricing[],
  frequency: PlanFrequency,
) {
  const frequencyLabel = frequencyToLabel(frequency);
  const totalPricing: Pricing = Object.fromEntries(
    Object.keys(PlanFrequency).map((planFrequencyLabel) => [
      planFrequencyLabel,
      pricings.reduce((sum, pricing) => sum + pricing[frequencyLabel], 0),
    ]),
  ) as Pricing;

  return formatPrice(totalPricing, frequency);
}
