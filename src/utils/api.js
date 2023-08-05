const url = "https://norma.nomoreparties.space/api/ingredients";
const postUrl = "https://norma.nomoreparties.space/api/orders";

export const api = () => {
  return fetch(`${url}`).then((res) => {
    return res.ok
      ? res.json()
      : res.json().then((err) => Promise.reject(`Ошибка: ${err.status} `));
  });
};

export const placeOrder = (requestData) => {
  return fetch(`${postUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: requestData,
    }),
  })
    .then((res) => {
      return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(`Ошибка: ${err.status} `));
    })
    .catch((err) =>
      console.log(`"Произошла ошибка при создании заказа" - ${err}`)
    );
};
