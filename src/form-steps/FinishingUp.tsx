import {
  PlanFrequency,
  PlanInfo,
  formatAggregatePrice,
  formatPrice,
  frequencyToLabel,
} from "../data";
import { AddOnInfo } from "../data/addons";
import styles from "./FinishingUp.module.css";
import { FormStep, StepProps } from "./FormStep";

function PlanPricingSummary({
  selectedPlan,
  selectedFrequency,
  returnToSelectPlanStep,
}: {
  selectedPlan: PlanInfo;
  selectedFrequency: PlanFrequency;
  returnToSelectPlanStep: () => void;
}) {
  return (
    <div className={styles["pricing-line-item"]}>
      <div>
        <div className={styles["plan-description"]}>
          {selectedPlan.userLabel} ({PlanFrequency[selectedFrequency]})
        </div>
        <button
          type="button"
          className={styles["change-plan-button"]}
          onClick={returnToSelectPlanStep}
        >
          Change
        </button>
      </div>
      <div className={styles["plan-pricing"]}>
        {formatPrice(selectedPlan.pricing, selectedFrequency)}
      </div>
    </div>
  );
}

function AddOnPricingSummary({
  addOnInfo,
  selectedFrequency,
}: {
  addOnInfo: AddOnInfo;
  selectedFrequency: PlanFrequency;
}) {
  return (
    <div className={styles["pricing-line-item"]}>
      <div className={styles["addon-description"]}>{addOnInfo.userLabel}</div>
      <div className={styles["addon-pricing"]}>
        {formatPrice(addOnInfo.pricing, selectedFrequency)}
      </div>
    </div>
  );
}

export function FinishingUp({
  returnToSelectPlanStep,
  selectedPlan,
  selectedFrequency,
  selectedAddOns,
  ...stepProps
}: {
  selectedPlan: PlanInfo;
  selectedFrequency: PlanFrequency;
  selectedAddOns: AddOnInfo[];
  returnToSelectPlanStep: () => void;
} & StepProps) {
  const allPricings = [
    selectedPlan.pricing,
    ...selectedAddOns.map((addOnInfo) => addOnInfo.pricing),
  ];
  return (
    <FormStep
      title="Finishing up"
      summary="Double-checking everything looks OK before confirming."
      isValid={true}
      isLastStep
      {...stepProps}
    >
      <div className={styles["pricing-line-item-list"]}>
        <PlanPricingSummary
          selectedPlan={selectedPlan}
          selectedFrequency={selectedFrequency}
          returnToSelectPlanStep={returnToSelectPlanStep}
        />
        {selectedAddOns.length > 0 && <hr />}
        {selectedAddOns.map((addOnInfo) => (
          <AddOnPricingSummary
            addOnInfo={addOnInfo}
            selectedFrequency={selectedFrequency}
          />
        ))}
      </div>
      <div className={styles["total-pricing-wrapper"]}>
        <div className={styles["pricing-line-item"]}>
          <div>Total (per {frequencyToLabel(selectedFrequency, true)})</div>
          <div className={styles["total-pricing"]}>
            {formatAggregatePrice(allPricings, selectedFrequency)}
          </div>
        </div>
      </div>
    </FormStep>
  );
}
