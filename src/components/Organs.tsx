import { rgba } from "polished";

interface Organ {
  name: string; // Organ name, e.g., "Heart", "FirstKidney"
  state: number; // State: 0 (red), 1 (orange), 2 (green)
  onDragStart: (
    e: React.DragEvent,
    item: { name: string; state: number },
  ) => void;
}

const Organs = ({ name, state, onDragStart }: Organ) => {
  const stateColors: Record<number, string> = {
    0: rgba(255, 0, 0, 0.5), // Red-transparent
    1: rgba(255, 165, 0, 0.5), // Orange-transparent
    2: rgba(0, 255, 0, 0.5), // Greeen-transparent
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (state === 0) {
      e.preventDefault();
      return;
    }
    onDragStart(e, { name, state });
  };

  return (
    <div
      draggable={state !== 0}
      onDragStart={handleDragStart}
      className="d-inline-block m-0 p-0"
      style={{
        backgroundColor: stateColors[state],
        borderRadius: "0.5rem", // Optional: rounded corners for better appearance
        cursor: state === 0 ? "not-allowed" : "grab", // Visual feedback
      }}
    >
      <img
        draggable={false} // Prevent the image itself from being draggable
        src={
          state === 0
            ? "src/assets/organs/empty.png"
            : `src/assets/organs/${name}.png`
        }
        alt={name}
        style={{ maxWidth: "4rem" }}
      />
    </div>
  );
};

export default Organs;
