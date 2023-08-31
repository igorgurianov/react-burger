const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Запросить ингридиенты
const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`).then(checkReponse);
};

// Разместить заказ
const placeOrder = (requestData) => {
  return fetchWithRefresh(`${BURGER_API_URL}/orders`, {
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
const registration = (name, email, pass) => {
  return fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name,
    }),
  }).then(checkReponse);
};

// Login
const login = (email, pass) => {
  return fetch(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  }).then(checkReponse);
};

// Check user authorization

const getUser = () => {
  return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

// Change user info
const changeUserInfo = ({ email, pass, name }) => {
  return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name,
    }),
  });
};

const logout = () => {
  return fetchWithRefresh(`${BURGER_API_URL}/auth/logout`, {
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

// Forgot password
const forgotPassword = (email) => {
  return fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkReponse);
};

// Reset password

const resetPassword = (pass, token) => {
  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: pass,
      token: token,
    }),
  }).then(checkReponse);
};

//refreshToken

export const refreshToken = () => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
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
