const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
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

const requestWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
  } catch (err) {
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

// Разместить заказ
const placeOrder = (requestData) => {
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
const registration = ({ name, email, password }) =>
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
const login = ({ email, password }) =>
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
const changeUserInfo = ({ email, password, name }) => {
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
const forgotPassword = ({ email }) =>
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
const resetPassword = ({ password, token }) =>
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
};
