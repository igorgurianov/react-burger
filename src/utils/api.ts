import { IRegisterUser } from "../services/types/data";
const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const ORDER_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
export const ORDER_HISTORY_URL = "wss://norma.nomoreparties.space/orders";

const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint: string, options?: any) => {
  return fetch(`${BURGER_API_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

//refreshToken
const refreshToken = () =>
  request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

const requestWithRefresh = async (endpoint: string, options: any) => {
  try {
    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

// Запросить ингридиенты
const getIngredients = () => request("/ingredients");

// Запросить информаци о конкретном заказе
const getOrderInfo = (order: any) => request(`/orders/${order}`);
// Разместить заказ
const placeOrder = (requestData: any) => {
  return requestWithRefresh("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients: requestData,
    }),
  });
};

// Registration
const registration = (name: string, email: string, password: string) =>
  request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });

// Login
const login = (email: string, password: string) =>
  request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

// Check user authorization
const getUser = () => {
  return requestWithRefresh("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

// Change user info
const changeUserInfo = ({ email, password, name }: IRegisterUser) => {
  return requestWithRefresh("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

// Forgot password
const forgotPassword = ({ email }: IRegisterUser) =>
  request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

// Reset password
const resetPassword = ({ password, token }: IRegisterUser) =>
  request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });

// Logout
const logout = () => {
  return requestWithRefresh("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const api = {
  getIngredients,
  placeOrder,
  registration,
  forgotPassword,
  resetPassword,
  login,
  getUser,
  changeUserInfo,
  logout,
  getOrderInfo,
  ORDER_FEED_URL,
};
