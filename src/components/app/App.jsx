import { useEffect } from "react";
import AppHeader from "../header/header";
import { getItems } from "../../services/actions";
import { useDispatch } from "react-redux";
import { Home } from "../../pages/home";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { REMOVE_INGRIDIENT_DETAILS } from "../../services/actions/details";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import OrderHistory from "../order-history/order-history";
import EditProfile from "../edit-profile/edit-profile";
import { checkUserAuth } from "../../services/actions/user";
import { useSelector } from "react-redux";
import Orders from "../../pages/orders/orders";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const { orderRequest } = useSelector((store) => store.order);

  const handleModalClose = () => {
    dispatch({ type: REMOVE_INGRIDIENT_DETAILS, payload: {} });
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const loading = orderRequest ? { cursor: "wait" } : { cursor: "auto" };

  return (
    <div style={loading}>
      <AppHeader className="mb-4" />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />

        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />

        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="" element={<EditProfile />} />
          <Route path="orders" element={<OrderHistory />} />
        </Route>

        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails style="page" />}
        />
        <Route path="/orders" element={<Orders />} />
        {/* <Route path="*" element={<NotFound404 />} /> */}
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails onClose={handleModalClose} style="popup" />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
