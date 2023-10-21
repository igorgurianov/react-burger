import React, { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { TIngredient } from "../../services/types/data";
import { useAppDispatch } from "../../hooks";
import { removeIngridient } from "../../services/actions/constructor";

interface IBurgerComponent {
  isLocked?: boolean;
  data: TIngredient;
  uniqueId: string;
  index: number;
  _id?: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: number;
}

const BurgerComponent: FC<IBurgerComponent> = ({
  isLocked,
  data,
  uniqueId,
  index,
  _id,
  moveCard,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement | null>(null);

  const handleRemoveButton = () => {
    dispatch(removeIngridient(uniqueId));
  };

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
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

export default BurgerComponent;
