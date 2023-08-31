import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { SuggestLink } from "../UI/suggest-link/suggest-link";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    api.resetPassword(pass, token).then((res) => {
      if (res && res.success) {
        localStorage.removeItem("forgot-password");
        navigate("/login");
      }
    });
  };

  if (!localStorage.getItem("forgot-password")) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "480px",
            margin: "180px auto 0 auto",
          }}
          onSubmit={(e) => {
            submitFormHandler(e);
          }}
        >
          <h3
            style={{ textAlign: "center" }}
            className="text text_type_main-medium"
          >
            Восстановление пароля
          </h3>
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            name={"password"}
            extraClass="mt-6"
            required
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6"
            style={{ alignSelf: "center" }}
          >
            Сохранить
          </Button>
        </form>
        <div
          className="mt-20"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вспомнили пароль?
          </p>
          <SuggestLink buttonText="Войти" />
        </div>
      </div>
    );
  }
};
