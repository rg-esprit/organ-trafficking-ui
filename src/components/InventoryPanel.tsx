import React from "react";
import Organs from "./Organs";
import { useDrop } from "react-dnd";

interface Organ {
  name: string;
  state: number;
}

interface InventoryPanelProps {
  inventory: Organ[];
  onDrop: (item: { name: string; state: number }, targetPlace: string) => void;
}

const InventoryPanel = ({ inventory, onDrop }: InventoryPanelProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "organ",
    drop: (item: { name: string; state: number }) => onDrop(item, "inventory"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="d-inline-flex flex-wrap justify-content-center gap-4"
      style={{
        backgroundColor: isOver ? "rgba(173, 216, 230, 0.5)" : "transparent",
      }}
    >
      {inventory.map((organ) => (
        <Organs
          key={organ.name}
          name={organ.name}
          state={organ.state}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default InventoryPanel;
