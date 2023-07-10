import { useState } from "react";
import { PlanFrequency, PlanInfo, formatPrice } from "../data";
import { FormStep, StepProps } from "./FormStep";
import styles from "./SelectPlan.module.css";

function PlanOption({
  planInfo,
  selectedFrequency,
  selectedPlan,
  setSelectedPlan,
}: {
  planInfo: PlanInfo;
  selectedFrequency: PlanFrequency;
  selectedPlan: PlanInfo;
  setSelectedPlan: (selectedPlan: PlanInfo) => void;
}) {
  const priceInfo = formatPrice(planInfo.pricing, selectedFrequency);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className={[
        styles["plan-option"],
        selectedPlan.machineLabel === planInfo.machineLabel
          ? styles["selected-plan"]
          : "",
        isFocused ? styles["focused-plan"] : "",
      ].join(" ")}
    >
      <span className={styles["plan-name"]}>{planInfo.userLabel}</span>
      <span className={styles["plan-price"]}>{priceInfo}</span>
      {selectedFrequency === PlanFrequency.Yearly ? (
        <span className={styles["plan-savings"]}>2 months free</span>
      ) : (
        <span className={styles["plan-savings"]}>
          {/* Prevent option height from shifting when frequency is toggled */}
          &nbsp;
        </span>
      )}
      <input
        type="radio"
        name="plan"
        value={planInfo.machineLabel}
        onChange={(event) => setSelectedPlan(planInfo)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </label>
  );
}

function FrequencyOption({
  frequency,
  selectedFrequency,
  setSelectedFrequency,
}: {
  frequency: PlanFrequency;
  selectedFrequency: PlanFrequency;
  setSelectedFrequency: (frequency: PlanFrequency) => void;
}) {
  const isSelected = frequency === selectedFrequency;
  return (
    <label
      className={`${styles["frequency-option"]} ${
        isSelected ? styles["selected-frequency"] : ""
      }`}
    >
      <input
        type="radio"
        name="plan-frequency"
        checked={isSelected}
        onChange={() => {
          // The change event only fires when this option is selected, not when it is deselected
          // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
          setSelectedFrequency(frequency);
        }}
      />
      <span className={styles["frequency-label"]}>
        {PlanFrequency[frequency]}
      </span>
    </label>
  );
}

function SelectFrequency({
  frequency,
  setFrequency,
}: {
  frequency: PlanFrequency;
  setFrequency: (frequency: PlanFrequency) => void;
}) {
  // NOTE: Implementing as radio buttons so this control is comprehensible to screen readers
  // TODO: Create accesible implementation without unexpected behavior
  return (
    <div className={styles["frequency-wrapper"]}>
      <FrequencyOption
        frequency={PlanFrequency.Monthly}
        selectedFrequency={frequency}
        setSelectedFrequency={setFrequency}
      />
      <FrequencyOption
        frequency={PlanFrequency.Yearly}
        selectedFrequency={frequency}
        setSelectedFrequency={setFrequency}
      />
    </div>
  );
}

export function SelectPlan({
  availablePlans,
  selectedPlan,
  setSelectedPlan,
  frequency,
  setFrequency,
  ...stepProps
}: {
  availablePlans: PlanInfo[];
  selectedPlan: PlanInfo;
  setSelectedPlan: (selectedPlan: PlanInfo) => void;
  frequency: PlanFrequency;
  setFrequency: (frequency: PlanFrequency) => void;
} & StepProps) {
  return (
    <FormStep
      title="Select your plan"
      summary="You have the option of monthly or yearly billing"
      isValid={
        true /* Plan and frequency are pre-set and cannot be unselected */
      }
      {...stepProps}
    >
      <ul className={styles["plan-group"]}>
        {availablePlans.map((planInfo) => (
          <li>
            <PlanOption
              planInfo={planInfo}
              selectedFrequency={frequency}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          </li>
        ))}
      </ul>
      <SelectFrequency frequency={frequency} setFrequency={setFrequency} />
    </FormStep>
  );
}
