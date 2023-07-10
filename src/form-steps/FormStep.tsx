import { ReactNode } from "react";
import styles from "./FormStep.module.css";

export interface StepProps {
  currentStep: number;
  setStep: (step: number) => void;
}

export function FormStep({
  title,
  summary,
  isValid,
  isFirstStep,
  isLastStep,
  currentStep,
  setStep,
  children,
}: {
  title: string;
  summary: string;
  isValid: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  children: ReactNode | ReactNode[];
} & StepProps) {
  return (
    <section className={styles["form-group"]}>
      <header>
        <h1 className={styles["step-title"]}>{title}</h1>
        <p className={styles["step-summary"]}>{summary}</p>
      </header>

      {children}

      <footer className={styles["button-group"]}>
        {!isFirstStep && (
          <button
            type="button"
            className={styles["back-button"]}
            onClick={() => setStep(currentStep - 1)}
          >
            Go Back
          </button>
        )}
        <span>
          {/* Placeholder so next button is always aligned correctly.  TODO: remove need for placeholder */}
        </span>
        {!isLastStep && (
          <button
            type="button"
            className={styles["next-button"]}
            onClick={() => setStep(currentStep + 1)}
            disabled={!isValid}
          >
            Next Step
          </button>
        )}
      </footer>
    </section>
  );
}
