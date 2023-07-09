import React, { useId, useState } from "react";
import { StepTracker } from "./step-tracker";
import { YourInfo } from "./form-steps";
import { StepInfo } from "./step-tracker/step-tracker";

import styles from "./App.module.css";

function App() {
  // TODO add localization
  const stepList: (StepInfo & { component?: JSX.Element })[] = [
    { label: "Your info", controlId: useId(), component: <YourInfo /> },
    { label: "Select plan", controlId: useId() },
    { label: "Add-ons", controlId: useId() },
    { label: "Summary", controlId: useId() },
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
        {stepList.map(({ component }, step) => (
          <div
            role="tabpanel"
            id={stepList[step].controlId}
            hidden={step !== currentStep}
          >
            {component}
          </div>
        ))}
      </form>
    </main>
  );
}

export default App;
