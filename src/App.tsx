import React, { useState } from "react";
import { StepTracker } from "./step-tracker";

function App() {
  // TODO add localization
  const stepList = ["Your info", "Select plan", "Add-ons", "Summary"].map(
    (label, id) => ({
      label,
      controlId: `form-step-${id}`,
    }),
  );

  const [currentStep, setStep] = useState(0);
  return (
    <main>
      <StepTracker
        currentStep={currentStep}
        setStep={setStep}
        stepList={stepList}
      />
      <ul>
        {stepList.map(({ label, controlId }, step) => (
          <li id={controlId} aria-role="tabpanel" hidden={step !== currentStep}>
            {/* TODO: Replace placeholder content with actual components */}
            <fieldset>
              <legend>{label}</legend>
            </fieldset>
          </li>
        ))}
        ,
      </ul>
    </main>
  );
}

export default App;
