import React, { FormEventHandler, useId, useState } from "react";
import { StepTracker } from "./step-tracker";
import { YourInfo } from "./form-steps";
import { StepInfo } from "./step-tracker/step-tracker";

import styles from "./App.module.css";
import { FormStep, StepProps } from "./form-steps/FormStep";
import { SelectPlan } from "./form-steps/SelectPlan";
import { PlanFrequency, getAvailablePlans } from "./data";
import { AddOns } from "./form-steps/Addons";
import { AddOnInfo, getAvailableAddOns } from "./data/addons";

function App() {
  // TODO add localization
  const availablePlans = getAvailablePlans();
  const [selectedPlan, setSelectedPlan] = useState(availablePlans[0]);
  const [frequency, setFrequency] = useState(PlanFrequency.Monthly);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnInfo[]>([]);

  const stepList: (StepInfo & {
    componentBuilder: (props: StepProps) => JSX.Element;
  })[] = [
    {
      label: "Your info",
      controlId: useId(),
      componentBuilder: YourInfo,
    },
    {
      label: "Select plan",
      controlId: useId(),
      componentBuilder: (props) =>
        SelectPlan({
          availablePlans: getAvailablePlans(),
          selectedPlan,
          frequency,
          setFrequency,
          setSelectedPlan,
          ...props,
        }),
    },
    {
      label: "Add-ons",
      controlId: useId(),
      componentBuilder: (props) =>
        AddOns({
          availableAddOns: getAvailableAddOns(),
          selectedAddOns,
          setSelectedAddOns,
          selectedFrequency: frequency,
          ...props,
        }),
    },
    {
      label: "Summary",
      controlId: useId(),
      componentBuilder: (props) =>
        FormStep({
          title: "Summary",
          summary: "",
          isLastStep: true,
          isValid: true,
          children: [],
          ...props,
        }),
    },
  ];

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    alert("Thanks for trying out the demo!");
  };

  const [currentStep, setStep] = useState(0);
  return (
    <main className={styles["app-wrapper"]}>
      <StepTracker
        currentStep={currentStep}
        setStep={setStep}
        stepList={stepList}
        className={styles["step-tracker"]}
      />
      <form className={styles["app-form"]} onSubmit={onSubmit}>
        {stepList.map(({ componentBuilder }, step) => (
          <div
            role="tabpanel"
            id={stepList[step].controlId}
            hidden={step !== currentStep}
            key={step}
          >
            {componentBuilder?.({ currentStep, setStep })}
          </div>
        ))}
      </form>
    </main>
  );
}

export default App;
