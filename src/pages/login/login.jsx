import {
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SuggestLink } from "../../UI/suggest-link/suggest-link";
import { userLogin } from "../../services/actions/user";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import styles from "./login.module.css";

export const Login = () => {
  const { values, handleChange } = useForm();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(values));
  };
  return (
    <div>
      <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
        <h3 className={`${styles.header} text text_type_main-medium`}>Вход</h3>
        <EmailInput
          placeholder={"E-mail"}
          onChange={handleChange}
          value={values.email}
          name={"email"}
          errorText={"Укажите корректный email"}
          extraClass="mt-6"
          required
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
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
          extraClass={`${styles.submit} mt-6`}
        >
          Войти
        </Button>
      </form>
      <div className={`${styles.suggest} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вы — новый пользователь?
        </p>
        <SuggestLink buttonText="Зарегистрироваться" to={"/register"} />
      </div>
      <div className={`${styles.suggest} mt-4`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </p>
        <SuggestLink buttonText="Восстановить пароль" to={"/forgot-password"} />
      </div>
    </div>
  );
};
