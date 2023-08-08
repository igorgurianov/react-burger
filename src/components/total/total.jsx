import { useSelector } from "react-redux";

const Total = () => {
  const selectedFillings = useSelector(
    (store) => store.burgerConstructor.selectedFillings
  );
  const selectedBun = useSelector(
    (store) => store.burgerConstructor.selectedBun
  );

  const totalPrice = () => {
    return (
      selectedFillings.reduce((acc, item) => acc + item.price, 0) +
      (selectedBun ? selectedBun.price * 2 : 0)
    );
  };

  return (
    <div>
      <p className="text text_type_digits-medium mr-3">{totalPrice()}</p>
    </div>
  );
};

export default Total;
