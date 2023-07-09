import { InputHTMLAttributes } from "react";
import { FormStep, StepProps } from "./FormStep";
import styles from "./YourInfo.module.css";

function FormControl({
  label,
  type,
  className,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={styles["form-control"]}>
      <span className={styles["form-label"]}>{label}</span>
      <input
        type={type || "text"}
        className={(className || "") + styles["form-input"]}
        {...inputProps}
      />
    </label>
  );
}

export function YourInfo(stepProps: StepProps) {
  return (
    <FormStep
      title="Personal Info"
      summary="Please provide your name, email address, and phone number."
      isFirstStep
      {...stepProps}
    >
      <FormControl label="Name" name="name" placeholder="e.g. Stephen King" />
      <FormControl
        label="Email address"
        type="email"
        name="email"
        placeholder="e.g. stephenking@lorem.com"
      />
      <FormControl
        label="Phone Number"
        type="tel"
        name="phonenumber"
        placeholder="e.g. +1 234 567 890"
      />
    </FormStep>
  );
}
