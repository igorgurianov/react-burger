import style from "./status-tableau.module.css";

const StatusTableau = () => {
  return (
    <div>
      <div className={style.boards}>
        <div className={style.board}>
          <h4 className="text text_type_main-medium">Готовы:</h4>
          <ul className={style.board__list}>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
            <li
              className={`${style.number_ready} text text_type_digits-default`}
            >
              034533
            </li>
          </ul>
        </div>
        <div className={style.board}>
          <h4 className="text text_type_main-medium">В работе:</h4>
          <ul className={style.board__list}>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
          </ul>
        </div>
      </div>
      <div className="mt-15">
        <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
        <span className={`${style.glow} text text_type_digits-large`}>
          28 752
        </span>
      </div>
      <div className="mt-15">
        <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
        <span className={`${style.glow} text text_type_digits-large`}>138</span>
      </div>
    </div>
  );
};

export default StatusTableau;
