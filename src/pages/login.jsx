import {
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { SuggestLink } from "../UI/suggest-link/suggest-link";
import { userLogin } from "../services/actions/user";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, pass));
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
        onSubmit={(e) => submitHandler(e)}
      >
        <h3
          style={{ textAlign: "center" }}
          className="text text_type_main-medium"
        >
          Вход
        </h3>
        <EmailInput
          placeholder={"E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          errorText={"Укажите корректный email"}
          extraClass="mt-6"
          required
        />
        <PasswordInput
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          name={"password"}
          errorText={"Не меньше 6 символов"}
          extraClass="mt-6"
          required
          icon="ShowIcon"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
          style={{ alignSelf: "center" }}
        >
          Войти
        </Button>
      </form>
      <div
        className="mt-20"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вы — новый пользователь?
        </p>
        <SuggestLink buttonText="Зарегистрироваться" to={"/register"} />
      </div>
      <div
        className="mt-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p className="text text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </p>
        <SuggestLink buttonText="Восстановить пароль" to={"/forgot-password"} />
      </div>
    </div>
  );
};
