import { rgba } from "polished";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useState } from "react";

interface Organ {
  name: string;
  state: number;
  onDrop: (item: { name: string; state: number }, targetName: string) => void;
}

const imageMap: Record<string, string> = {
  empty: "./assets/organs/empty.png",
  Heart: "./assets/organs/heart.png",
  FirstKidney: "./assets/organs/FirstKidney.png",
  Lung: "./assets/organs/lung.png",
  SecondKidney: "./assets/organs/SecondKidney.png",
};

const Organs = ({ name, state, onDrop }: Organ) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "organ",
    item: {
      name,
      state,
      previewSrc: state === 0 ? imageMap["empty"] : imageMap[name],
    },
    canDrag: state !== 0,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "organ",
    canDrop: () => state === 0,
    drop: (item: { name: string; state: number }) => onDrop(item, name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver() && state === 0,
    }),
  }));

  const stateColors: Record<number, string> = {
    0: rgba(255, 0, 0, 0.5),
    1: rgba(255, 165, 0, 0.5),
    2: rgba(0, 255, 0, 0.5),
  };

  const ref = state === 0 ? drop : drag;
  const previewSrc = state === 0 ? imageMap["empty"] : imageMap[name];

  return (
    <div
      ref={ref}
      className={`d-inline-block m-0 ${isOver ? "border border-light border-3" : ""}`}
      style={{
        backgroundColor: stateColors[state],
        borderRadius: "0.5rem",
        cursor: state === 0 ? "not-allowed" : "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img
        draggable={false}
        src={previewSrc}
        alt={name}
        style={{ maxWidth: "4rem" }}
      />
    </div>
  );
};

export default Organs;
