import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { SuggestLink } from "../UI/suggest-link/suggest-link";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    api
      .forgotPassword(email)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("forgot-password", true);
          navigate("/reset-password");
        }
      })
      .then();
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
        onSubmit={handleFormSubmit}
      >
        <h3
          style={{ textAlign: "center" }}
          className="text text_type_main-medium"
        >
          Восстановление пароля
        </h3>
        <EmailInput
          placeholder={"Укажите e-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          errorText={"Укажите корректный email"}
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
          Восстановить
        </Button>
      </form>
      <div
        className="mt-20"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </p>
        <SuggestLink buttonText="Войти" to={"/login"} />
      </div>
    </div>
  );
};
