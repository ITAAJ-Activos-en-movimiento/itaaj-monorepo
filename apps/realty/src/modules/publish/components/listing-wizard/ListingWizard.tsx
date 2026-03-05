"use client";

import { ListingFormData } from "../../lib/schema";
import { Stepper } from "./Stepper";
import { StepBasicData } from "./steps/StepBasicData";
import { StepAddress } from "./steps/StepAddress";
import { StepPhotos } from "./steps/StepPhotos";
import { StepDetails } from "./steps/StepDetails";
import { StepContact } from "./steps/StepContact";

interface Props {
  step: number;
  totalSteps: number;
  data: ListingFormData;
  onChange: (partial: Partial<ListingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ListingWizard: React.FC<Props> = ({
  step,
  totalSteps,
  data,
  onChange,
  onNext,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const renderStep = () => {
    switch (step) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      // Si quisieras un 6º paso de contacto separado
      // case 6: return <StepContact ... />
      default:
        return null;
    }
  };

  const isLastStep = step === totalSteps;

  return <section className="rounded-2xl bg-white p-6 shadow-sm"></section>;
};
