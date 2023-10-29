import { ChangeEvent, useState } from "react";

type FormState<T> = T;

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialState);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event?.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formState,
    handleChange,
  };
};