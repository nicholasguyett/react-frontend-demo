import { PlanInfo } from "./pricing";

export function getAvailablePlans(): PlanInfo[] {
  return [
    {
      userLabel: "Arcade",
      machineLabel: "arcade",
      pricing: {
        Monthly: 9,
        Yearly: 90,
      },
    },
    {
      userLabel: "Advanced",
      machineLabel: "advanced",
      pricing: {
        Monthly: 12,
        Yearly: 12,
      },
    },
    {
      userLabel: "Pro",
      machineLabel: "pro",
      pricing: {
        Monthly: 15,
        Yearly: 15,
      },
    },
  ];
}
