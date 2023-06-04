const url = 'https://norma.nomoreparties.space/api/ingredients';

const api = () => {
  return fetch(`${url}`)
    .then((res) => {
      return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Ошибка: ${err.status} `))
    })
    .catch((err) =>
      console.log(`"Произошла ошибка при запросе ингридиентов" - ${err}`)
    );
};

export default api;
