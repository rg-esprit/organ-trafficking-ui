import { rgba } from "polished";
import emptyImage from "../assets/organs/empty.png";
import heartImage from "../assets/organs/heart.png";
import firstKidneyImage from "../assets/organs/FirstKidney.png";
import lungImage from "../assets/organs/lung.png";
import secondKidneyImage from "../assets/organs/SecondKidney.png";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ORGAN: "organ",
};

interface Organ {
  name: string;
  state: number;
  onDrop: (item: { name: string; state: number }, targetName: string) => void;
}

const Organs = ({ name, state, onDrop }: Organ) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ORGAN,
    item: { name, state },
    canDrag: state !== 0,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ORGAN,
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

  const imageMap: Record<string, string> = {
    empty: emptyImage,
    Heart: heartImage,
    FirstKidney: firstKidneyImage,
    Lung: lungImage,
    SecondKidney: secondKidneyImage,
  };

  const ref = state === 0 ? drop : drag;

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
        src={state === 0 ? imageMap["empty"] : imageMap[name]}
        alt={name}
        style={{ maxWidth: "4rem" }}
      />
    </div>
  );
};

export default Organs;
