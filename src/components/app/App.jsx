import { useEffect } from "react";
import AppHeader from "../header/header";
import { getItems } from "../../services/actions";
import { useDispatch } from "react-redux";
import { Home } from "../../pages/home";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import EditProfile from "../edit-profile/edit-profile";
import { checkUserAuth } from "../../services/actions/user";
import { useSelector } from "react-redux";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../../pages/order-info/order-info";
import PersonalHistory from "../personal-history/personal-history";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  const orderFeed = useSelector((store) => store.orderFeed.orders);
  const orderHistory = useSelector((store) => store.orderHistory.orders);

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div>
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
          <Route path="orders" element={<PersonalHistory />} />
        </Route>

        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<OrderInfo style="page" />} />}
        />

        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails style="page" />}
        />

        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/feed/:id" element={<OrderInfo style="page" />} />
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
      {background && orderFeed && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo onClose={handleModalClose} style="popup" />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && orderHistory && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo onClose={handleModalClose} style="popup" />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
