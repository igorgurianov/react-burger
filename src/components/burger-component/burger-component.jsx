import React, { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";
import PropTypes from "prop-types";
import { REMOVE_FILLING } from "../../services/actions/constructor";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../services/types/data";
// const burgerComponentPropTypes = {
//   text: PropTypes.string.isRequired,
//   thumbnail: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };

// interface IBurgerComponent {
//   isLocked: boolean;
//   data: any;
//   uniqueId: string;
//   index: string;
//   _id: string;
//   moveCard: () => void;
// }

// interface IUseDrop {
//   type: any;
//   index: any;
// }

const BurgerComponent = ({
  isLocked,
  data,
  uniqueId,
  index,
  _id,
  moveCard,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleRemoveButton = () => {
    dispatch({ type: REMOVE_FILLING, payload: uniqueId });
  };

  const [, drop] = useDrop({
    accept: "filling",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "filling",
    item: () => {
      return { _id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li className={styles.wrapper} draggable ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleRemoveButton()}
      />
    </li>
  );
};

//BurgerComponent.propTypes = burgerComponentPropTypes.isRequired;

export default BurgerComponent;
