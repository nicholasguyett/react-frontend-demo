export enum PlanFrequency {
  Monthly,
  Yearly,
}

export function frequencyToLabel(frequency: PlanFrequency) {
  return PlanFrequency[frequency] as keyof typeof PlanFrequency;
}
