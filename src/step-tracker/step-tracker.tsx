import React, { AriaAttributes, HTMLAttributes } from "react";
import styles from "./step-tracker.module.css";

export interface StepInfo {
  label: string;
  controlId: string;
}

export function StepTracker({
  currentStep,
  setStep,
  stepList,
  className,
}: {
  currentStep: number;
  setStep: (step: number) => void;
  stepList: StepInfo[];
} & { className?: string }) {
  return (
    <nav className={className}>
      <ul className={styles["tab-list"]} role="tablist">
        {stepList.map(({ label, controlId }, step) => (
          <li
            key={controlId}
            className={styles["step-tab"]}
            role="tab"
            aria-selected={step === currentStep || undefined}
            aria-controls={controlId}
            aria-labelledby={`${controlId}--label`}
            onClick={() => setStep(step)}
          >
            {/* TODO: Clean up this html */}
            <div className={styles["step-text"]}>
              <div className={styles["tab-step-number"]}>
                Step {step + 1 /* Display step as 1-based */}
              </div>
              <div className={styles["tab-label"]} id={`${controlId}--label`}>
                {label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
