import React, { useId, useState } from "react";
import { StepTracker } from "./step-tracker";
import { YourInfo } from "./form-steps";
import { StepInfo } from "./step-tracker/step-tracker";

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
    <main>
      <StepTracker
        currentStep={currentStep}
        setStep={setStep}
        stepList={stepList}
      />
      <ul>
        {stepList.map(({ component }, step) => (
          <div
            role="tabpanel"
            id={stepList[step].controlId}
            hidden={step !== currentStep}
          >
            {component}
          </div>
        ))}
      </ul>
    </main>
  );
}

export default App;
