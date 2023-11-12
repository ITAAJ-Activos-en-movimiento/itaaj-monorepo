import { ChangeEvent, useState } from "react";

type FormState<T> = T;

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialState);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFormState((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey as keyof typeof prev],
          [innerKey]: value,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return {
    formState,
    handleChange,
  };
};