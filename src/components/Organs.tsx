import { rgba } from "polished";

interface Organ {
  name: string; // Organ name, e.g., "Heart", "FirstKidney"
  state: number; // State: 0 (red), 1 (orange), 2 (green)
}

const Organs = ({ name, state }: Organ) => {
  const stateColors: Record<number, string> = {
    0: rgba(255, 0, 0, 0.5), // Red-transparent
    1: rgba(255, 165, 0, 0.5), // Orange-transparent
    2: rgba(0, 255, 0, 0.5), // Green-transparent
  };

  return (
    <div
      className="d-inline-block m-0 p-0"
      style={{
        backgroundColor: stateColors[state],
        borderRadius: "0.5rem", // Optional: rounded corners for better appearance
      }}
    >
      <img
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
