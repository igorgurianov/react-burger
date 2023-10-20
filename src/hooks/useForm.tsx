import { useState, ChangeEvent } from "react";

export interface FormValues {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
}

export function useForm(
  defaultValues: FormValues = { email: "", name: "", password: "" }
) {
  const [values, setValues] = useState<FormValues>(defaultValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
