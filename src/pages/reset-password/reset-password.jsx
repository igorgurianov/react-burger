import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SuggestLink } from "../../UI/suggest-link/suggest-link";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { useForm } from "../../hooks/useForm";
import styles from "./reset-password.module.css";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();

  const submitFormHandler = (e) => {
    e.preventDefault();
    api.resetPassword(values).then((res) => {
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
          className={styles.form}
          onSubmit={(e) => {
            submitFormHandler(e);
          }}
        >
          <h3 className={`${styles.header} text text_type_main-medium`}>
            Восстановление пароля
          </h3>
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            value={values.password}
            name={"password"}
            extraClass="mt-6"
            required
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
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
            extraClass={`${styles.submit} mt-6`}
          >
            Сохранить
          </Button>
        </form>
        <div className={`${styles.suggest} mt-20`}>
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вспомнили пароль?
          </p>
          <SuggestLink buttonText="Войти" />
        </div>
      </div>
    );
  }
};
