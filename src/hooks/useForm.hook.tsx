import { useEffect, useState } from "react";
export interface FormData<T> {
  value: T;
  touched: boolean;
}

export function useForm<TData, TErrors>(defaultValue: TData, validate: (data: TData) => TErrors): Form<TData, TErrors> {
  const [data, setData] = useState<TData>(defaultValue);
  const [errors, setErrors] = useState<TErrors>();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const errors: any = validate(data);
    setErrors(errors);
    setIsFormValid(!hasErrors(errors));
  }, [data]);

  return {
    data,
    errors,
    isFormValid,
    setData,
  };
}

function hasErrors(errors: any): boolean {
  let hasErrors = false;
  const keys = Object.keys(errors);

  for (let key of keys) {
    hasErrors = hasErrors || errors[key] != null || errors[key] != undefined;
  }

  return hasErrors;
}

export interface Form<TData, TErrors> {
  data: TData;
  errors: TErrors | undefined;
  isFormValid: boolean;
  setData: (data: TData) => void;
}
