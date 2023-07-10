import { Pricing } from "./pricing";

export interface AddOnInfo {
  userLabel: string;
  machineLabel: string;
  description: string;
  pricing: Pricing;
}

export function getAvailableAddOns(): AddOnInfo[] {
  return [
    {
      userLabel: "Online Service",
      machineLabel: "online_service",
      description: "Access to multiplayer games",
      pricing: {
        Monthly: 1,
        Yearly: 10,
      },
    },
    {
      userLabel: "Larger storage",
      machineLabel: "expanded_storage",
      description: "Extra TB of cloud save",
      pricing: {
        Monthly: 2,
        Yearly: 20,
      },
    },
    {
      userLabel: "Customizable profile",
      machineLabel: "custom_profile",
      description: "Custom theme on your profile",
      pricing: {
        Monthly: 2,
        Yearly: 20,
      },
    },
  ];
}
