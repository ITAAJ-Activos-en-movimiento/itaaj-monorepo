"use client";

import styles from "./Stepper.module.css";

interface StepperProps {
  steps: { id: number; label: string }[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>
        {steps.find((step) => step.id == currentStep)?.label}
      </span>
      <div className={styles.steps}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className={styles.step}>
              <div
                className={[
                  styles.bullet,
                  isActive ? styles.bulletActive : "",
                  isCompleted ? styles.bulletCompleted : "",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
