import { rgba } from "polished";
import emptyImage from "../assets/organs/empty.png";
import heartImage from "../assets/organs/heart.png";
import firstKidneyImage from "../assets/organs/FirstKidney.png";
import lungImage from "../assets/organs/lung.png";
import secondKidneyImage from "../assets/organs/SecondKidney.png";
import { useState } from "react";

interface Organ {
  name: string; // Organ name, e.g., "Heart", "FirstKidney"
  state: number; // State: 0 (red), 1 (orange), 2 (green)
  onDragStart: (
    e: React.DragEvent,
    item: { name: string; state: number }
  ) => void;
  onDrop: (e: React.DragEvent, PlaceName: string) => void;
}

const Organs = ({ name, state, onDragStart, onDrop }: Organ) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const stateColors: Record<number, string> = {
    0: rgba(255, 0, 0, 0.5), // Red-transparent
    1: rgba(255, 165, 0, 0.5), // Orange-transparent
    2: rgba(0, 255, 0, 0.5), // Greeen-transparent
  };

  const imageMap: Record<string, string> = {
    empty: emptyImage,
    Heart: heartImage,
    FirstKidney: firstKidneyImage,
    Lung: lungImage,
    SecondKidney: secondKidneyImage,
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (state === 0) {
      e.preventDefault();
      return;
    }
    onDragStart(e, { name, state });
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (state === 0) {
      e.preventDefault();
      setIsDraggedOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (state === 0) {
      e.preventDefault();
      setIsDraggedOver(false);
      onDrop(e, name);
    }
  };

  return (
    <div
      draggable={state !== 0}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`d-inline-block m-0 ${isDraggedOver && state === 0 ? "border border-light border-3" : ""}`}
      style={{
        backgroundColor: stateColors[state],
        borderRadius: "0.5rem",
        cursor: state === 0 ? "not-allowed" : "grab",
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
