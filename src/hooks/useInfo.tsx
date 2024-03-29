import { useSelector } from "react-redux";
import { useAppSelector } from ".";
import { TIngredient } from "../services/types/data";

type TIngredientCount = TIngredient & {
  count?: number;
};

export type TCountedIngredient = {
  count: number;
  price: number;
  _id: string;
};

export function useInfo() {
  const { allItems } = useAppSelector((store) => store.ingridients);

  const itemExists = (id: string) =>
    allItems.find((item: TIngredient) => {
      if (item._id === id) {
        return item;
      }
    });

  const findImgUrl = (id: string) => {
    const item = itemExists(id);
    if (item) {
      return item.image;
    }
  };

  const findIngredientName = (id: string) => {
    const item = itemExists(id);
    if (item) {
      return item.name;
    }
  };

  const findIngredientPrice = (id: string): number => {
    const item = itemExists(id);
    if (item) {
      return item.price;
    } else return 0;
  };

  const orderPrice = (ingredients: string[]) => {
    return ingredients.reduce((total, item) => {
      const matchedItem = allItems.find((i: TIngredient) => i._id === item);
      if (matchedItem) {
        total += matchedItem.price;
      }
      return total;
    }, 0);
  };

  const countIngredients = (ingredients: string[]) => {
    return ingredients.reduce(
      (result: TCountedIngredient[], ingredient: string) => {
        const existingIngredient = result.find(
          (item: TCountedIngredient) => item._id === ingredient
        );
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
      },
      []
    );
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
