import { PlanFrequency, formatPrice } from "../data";
import { AddOnInfo } from "../data/addons";
import styles from "./Addons.module.css";
import { FormStep, StepProps } from "./FormStep";

function AddOnOption({
  addOnInfo,
  isSelected,
  setIsSelected,
  selectedFrequency,
}: {
  addOnInfo: AddOnInfo;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  selectedFrequency: PlanFrequency;
}) {
  return (
    <label
      className={`${styles["addon-option"]} ${
        isSelected ? styles["selected"] : ""
      }`}
    >
      <input
        type="checkbox"
        name={`addon-${addOnInfo.machineLabel}`}
        checked={isSelected}
        onChange={(event) => setIsSelected(event.target.checked)}
      />
      <span className={styles["addon-info-wrapper"]}>
        <span className={styles["addon-title"]}>{addOnInfo.userLabel}</span>
        <span className={styles["addon-description"]}>
          {addOnInfo.description}
        </span>
      </span>
      <span className={styles["addon-pricing"]}>
        {`+${formatPrice(addOnInfo.pricing, selectedFrequency)}`}
      </span>
    </label>
  );
}

export function AddOns({
  availableAddOns,
  selectedAddOns,
  setSelectedAddOns,
  selectedFrequency,
  ...stepProps
}: {
  availableAddOns: AddOnInfo[];
  selectedAddOns: AddOnInfo[];
  setSelectedAddOns: (selectedAddOns: AddOnInfo[]) => void;
  selectedFrequency: PlanFrequency;
} & StepProps) {
  function toggleAddOn(addOnInfo: AddOnInfo, isSelected: boolean) {
    console.log({ addOnInfo, isSelected, selectedAddOns });
    if (isSelected) {
      setSelectedAddOns([...selectedAddOns, addOnInfo]);
    } else {
      setSelectedAddOns(
        selectedAddOns.filter(
          (otherAddOnInfo) =>
            addOnInfo.machineLabel !== otherAddOnInfo.machineLabel,
        ),
      );
    }
  }
  return (
    <FormStep
      title="Add-ons"
      summary="Add-ons help enhance your gaming experience"
      isValid={true /* All fields on this page are optional */}
      {...stepProps}
    >
      <ul className={styles["addon-list"]}>
        {availableAddOns.map((addOnInfo) => (
          <li>
            <AddOnOption
              addOnInfo={addOnInfo}
              isSelected={selectedAddOns.some(
                (otherAddOnInfo) =>
                  otherAddOnInfo.machineLabel === addOnInfo.machineLabel,
              )}
              setIsSelected={(isSelected) => toggleAddOn(addOnInfo, isSelected)}
              selectedFrequency={selectedFrequency}
            />
          </li>
        ))}
      </ul>
    </FormStep>
  );
}
