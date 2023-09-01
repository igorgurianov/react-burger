import { useState } from "react";

export function useForm(defaultValues = { email: "", name: "", password: "" }) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
