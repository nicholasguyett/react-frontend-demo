import { ReactNode } from "react";
import styles from "./FormStep.module.css";

export function FormStep({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode[];
  isFirstStep?: boolean;
  isLastStep?: boolean;
}) {
  return (
    <section className={styles["form-group"]}>
      <header>
        <h1 className={styles["step-title"]}>{title}</h1>
        <p className={styles["step-summary"]}>{summary}</p>
      </header>

      {children}

      <footer></footer>
    </section>
  );
}
