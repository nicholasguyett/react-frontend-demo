import { PlanInfo } from "./pricing";

export function getAvailablePlans(): PlanInfo[] {
  return [
    {
      userLabel: "Arcade",
      machineLabel: "arcade",
      pricing: {
        Monthly: 7,
        Yearly: 88,
      },
    },
    {
      userLabel: "Advanced",
      machineLabel: "advanced",
      pricing: {
        Monthly: 10,
        Yearly: 118,
      },
    },
    {
      userLabel: "Pro",
      machineLabel: "pro",
      pricing: {
        Monthly: 13,
        Yearly: 148,
      },
    },
  ];
}
