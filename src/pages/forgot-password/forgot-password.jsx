import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SuggestLink } from "../../UI/suggest-link/suggest-link";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    api
      .forgotPassword(values)
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
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h3 className={`${styles.header} text text_type_main-medium`}>
          Восстановление пароля
        </h3>
        <EmailInput
          placeholder={"Укажите e-mail"}
          onChange={handleChange}
          value={values.email}
          name={"email"}
          errorText={"Укажите корректный email"}
          extraClass="mt-6"
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`${styles.submit} mt-6`}
        >
          Восстановить
        </Button>
      </form>
      <div className={`${styles.suggest} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </p>
        <SuggestLink buttonText="Войти" to={"/login"} />
      </div>
    </div>
  );
};
