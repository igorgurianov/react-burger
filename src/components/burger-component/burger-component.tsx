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
import type { Identifier, XYCoord } from "dnd-core";

interface IBurgerComponent {
  isLocked?: boolean;
  data: any;
  uniqueId?: string;
  index: string;
  _id?: string;
  moveCard: (dragIndex: number, hoverIndex: any) => void;
}

interface DragItem {
  index: any;
  id: number;
  type: number;
  item: any;
}

const BurgerComponent: FC<IBurgerComponent> = ({
  isLocked,
  data,
  uniqueId,
  index,
  _id,
  moveCard,
}) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement | null>(null);
  const handleRemoveButton = () => {
    dispatch({ type: REMOVE_FILLING, payload: uniqueId });
  };

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "filling",
    hover: (item: DragItem, monitor) => {
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
      const clientOffset: any = monitor.getClientOffset();
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
      console.log(typeof dragIndex);
      console.log(typeof hoverIndex);
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
