import React, { useId, useState } from "react";
import { StepTracker } from "./step-tracker";
import { YourInfo } from "./form-steps";
import { StepInfo } from "./step-tracker/step-tracker";

import styles from "./App.module.css";
import { FormStep, StepProps } from "./form-steps/FormStep";

function App() {
  // TODO add localization
  const stepList: (StepInfo & {
    componentBuilder: (props: StepProps) => JSX.Element;
  })[] = [
    {
      label: "Your info",
      controlId: useId(),
      componentBuilder: (props) => YourInfo(props),
    },
    {
      label: "Select plan",
      controlId: useId(),
      componentBuilder: (props) =>
        FormStep({ title: "Plan", summary: "", children: [], ...props }),
    },
    {
      label: "Add-ons",
      controlId: useId(),
      componentBuilder: (props) =>
        FormStep({ title: "Add-ons", summary: "", children: [], ...props }),
    },
    {
      label: "Summary",
      controlId: useId(),
      componentBuilder: (props) =>
        FormStep({
          title: "Summary",
          summary: "",
          isLastStep: true,
          children: [],
          ...props,
        }),
    },
  ];

  const [currentStep, setStep] = useState(0);
  return (
    <main className={styles["app-wrapper"]}>
      <StepTracker
        currentStep={currentStep}
        setStep={setStep}
        stepList={stepList}
        className={styles["step-tracker"]}
      />
      <form className={styles["app-form"]}>
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
