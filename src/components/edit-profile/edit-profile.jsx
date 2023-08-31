import { useState, useEffect } from "react";
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo } from "../../services/actions/user";

const EditProfile = () => {
  const profile = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState();

  useEffect(() => {
    setForm({
      name: profile.name,
      email: profile.email,
      pass: "",
    });
  }, [profile]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changeInfo(form));
  };

  return (
    <div>
      {form && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "480px",
            margin: "0",
          }}
        >
          <Input
            onChange={handleInput}
            type="text"
            value={form.name}
            name={"name"}
            placeholder="Имя"
            extraClass="mb-2"
            icon={"EditIcon"}
            required
          />
          <EmailInput
            onChange={handleInput}
            value={form.email}
            name={"email"}
            placeholder="Логин"
            extraClass="mb-2"
            icon={"EditIcon"}
            required
          />
          <PasswordInput
            onChange={handleInput}
            value={form.pass}
            icon="ShowIcon"
            name={"pass"}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
            style={{ alignSelf: "center" }}
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
