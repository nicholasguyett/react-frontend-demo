import { InputHTMLAttributes, useRef, useState, useEffect } from "react";
import { FormStep, StepProps } from "./FormStep";
import styles from "./YourInfo.module.css";

function FormControl({
  label,
  type,
  className,
  isValid,
  setIsValid,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isValid?: boolean;
  setIsValid: (validity: boolean) => void;
}) {
  return (
    <label className={styles["form-control"]}>
      <span className={styles["form-label"]}>{label}</span>
      <input
        type={type || "text"}
        className={[
          className || "",
          styles["form-input"],
          isValid === false ? styles["invalid"] : "",
        ].join(" ")}
        onChange={(event) => {
          setIsValid(event.target.checkValidity());
          event.target.reportValidity();
        }}
        {...inputProps}
      />
    </label>
  );
}

export function YourInfo(stepProps: StepProps) {
  const [isValid, setIsValid] = useState(false);

  // TODO: Find a simpler way to aggregate validity, per-step
  // NOTE: validities are intentionally intialized as undefined so inputs start "clean"
  const [isNameValid, setIsNameValid] = useState<boolean>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>();

  useEffect(() => {
    // Aggregate the individual validities
    setIsValid((isNameValid && isEmailValid && isPhoneValid) || false);
  }, [isNameValid, isEmailValid, isPhoneValid]);

  return (
    <FormStep
      title="Personal Info"
      summary="Please provide your name, email address, and phone number."
      isFirstStep
      isValid={isValid}
      {...stepProps}
    >
      <FormControl
        label="Name"
        name="name"
        required
        isValid={isNameValid}
        setIsValid={setIsNameValid}
        placeholder="e.g. Stephen King"
      />
      <FormControl
        label="Email address"
        type="email"
        name="email"
        required
        isValid={isEmailValid}
        setIsValid={setIsEmailValid}
        placeholder="e.g. stephenking@lorem.com"
      />
      <FormControl
        label="Phone Number"
        type="tel"
        name="phonenumber"
        required
        isValid={isPhoneValid}
        setIsValid={setIsPhoneValid}
        placeholder="e.g. +1 234 567 890"
      />
    </FormStep>
  );
}
