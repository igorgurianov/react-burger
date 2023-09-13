import { useSelector } from "react-redux";

export function useInfo() {
  const { allItems } = useSelector((store) => store.ingridients);

  const itemExists = (id) =>
    allItems.find((item) => {
      if (item._id === id) {
        return item;
      }
    });

  const findImgUrl = (id) => {
    const item = itemExists(id);
    if (item) {
      return item.image;
    }
  };

  const findIngredientName = (id) => {
    const item = itemExists(id);
    if (item) {
      return item.name;
    }
  };

  const findIngredientPrice = (id) => {
    const item = itemExists(id);
    if (item) {
      return item.price;
    }
  };

  const orderPrice = (ingredients) => {
    return ingredients.reduce((total, item) => {
      const matchedItem = allItems.find((i) => i._id === item);
      if (matchedItem) {
        total += matchedItem.price;
      }
      return total;
    }, 0);
  };

  const countIngredients = (ingredients) => {
    return ingredients.reduce((result, ingredient) => {
      const existingIngredient = result.find((item) => item._id === ingredient);
      if (existingIngredient) {
        existingIngredient.count++;
      } else {
        result.push({
          _id: ingredient,
          count: 1,
          price: findIngredientPrice(ingredient),
        });
      }

      return result;
    }, []);
  };

  return {
    findImgUrl,
    findIngredientName,
    countIngredients,
    findIngredientPrice,
    orderPrice,
  };

  // const [values, setValues] = useState(defaultValues);

  // const handleChange = (event) => {
  //   const { value, name } = event.target;
  //   setValues({ ...values, [name]: value });
  // };
  // return { values, handleChange, setValues };
}
