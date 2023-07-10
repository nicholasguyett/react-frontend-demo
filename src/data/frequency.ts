export enum PlanFrequency {
  Monthly,
  Yearly,
}

export function frequencyToLabel(
  frequency: PlanFrequency,
): keyof typeof PlanFrequency;
export function frequencyToLabel(
  frequency: PlanFrequency,
  asNount: true,
): string;
export function frequencyToLabel(
  frequency: PlanFrequency,
  asNoun: boolean = false,
) {
  const fullLabel = PlanFrequency[frequency] as keyof typeof PlanFrequency;

  return asNoun ? fullLabel.slice(0, -2) : fullLabel;
}
