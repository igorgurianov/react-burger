import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SuggestLink } from "../../UI/suggest-link/suggest-link";
import { registration } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import styles from "./register.module.css";
import { useAppDispatch } from "../../hooks";
import { FormEvent } from "react";

export const Register = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registration(values));
  };

  return (
    <div>
      <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
        <h3 className={`${styles.header} text text_type_main-medium`}>
          Регистрация
        </h3>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name || ""}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
          required
        />
        <EmailInput
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          //errorText={"Укажите корректный email"}
          extraClass="mt-6"
          required
        />
        <PasswordInput
          placeholder={"Пароль"}
          onChange={handleChange}
          value={values.password || ""}
          name={"password"}
          extraClass="mt-6"
          //errorText={"Не меньше 6 символов"}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.submit} mt-6`}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={`${styles.suggest} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </p>
        <SuggestLink buttonText="Войти" to={"/login"} />
      </div>
    </div>
  );
};
