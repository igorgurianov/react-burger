import styles from "./edit-profile.module.css";
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";

const EditProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.user.user);
  const { values, handleChange } = useForm({
    name: profile.name,
    email: profile.email,
    pass: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changeInfo(values));
  };

  return (
    <div>
      {values && (
        <form className={styles.container}>
          <Input
            onChange={handleChange}
            type="text"
            value={values.name}
            name={"name"}
            placeholder="Имя"
            extraClass="mb-2"
            icon={"EditIcon"}
            required
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            placeholder="Логин"
            extraClass="mb-2"
            icon={"EditIcon"}
            required
          />
          <PasswordInput
            onChange={handleChange}
            value={values.pass}
            icon="ShowIcon"
            name={"password"}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
            onClick={(e) => handleFormSubmit(e)}
          >
            Сохранить
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
