import { rgba } from "polished";
const Organs = () => {
  return (
    <div className="d-inline-block">
      <img
        src="src/assets/organs/heart.png"
        className="p-0"
        alt="Heart"
        style={{ maxWidth: "5rem", backgroundColor: rgba(255, 99, 0, 1) }}
      />
    </div>
  );
};

export default Organs;
