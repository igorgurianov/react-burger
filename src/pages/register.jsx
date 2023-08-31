import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { SuggestLink } from "../UI/suggest-link/suggest-link";
import { useDispatch } from "react-redux";
import { registration } from "../services/actions/user";

export const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", pass: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registration(form));
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "480px",
          margin: "180px auto 0 auto",
        }}
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h3
          style={{ textAlign: "center" }}
          className="text text_type_main-medium"
        >
          Регистрация
        </h3>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInput}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mt-6"
          required
        />
        <EmailInput
          placeholder={"E-mail"}
          onChange={handleInput}
          value={form.email}
          name={"email"}
          errorText={"Укажите корректный email"}
          extraClass="mt-6"
          required
        />
        <PasswordInput
          placeholder={"Пароль"}
          onChange={handleInput}
          value={form.pass}
          name={"pass"}
          extraClass="mt-6"
          errorText={"Не меньше 6 символов"}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
          style={{ alignSelf: "center" }}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div
        className="mt-20"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p className="text text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </p>
        <SuggestLink buttonText="Войти" to={"/login"} />
      </div>
    </div>
  );
};
