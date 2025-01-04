import React, { useState } from "react";
import Organs from "./Organs";

interface Organ {
  name: string;
  state: number;
}

interface InventoryPanelProps {
  inventory: Organ[];
  handleDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, item: Organ) => void;
}

const InventoryPanel = ({
  inventory,
  handleDrop,
  onDragStart,
}: InventoryPanelProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div
      className="d-inline-flex flex-wrap justify-content-center gap-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDrop(e);
        setIsDraggingOver(false);
      }}
      style={{
        backgroundColor: isDraggingOver ? "lightblue" : "transparent",
      }}
    >
      {inventory.map((organ) => (
        <Organs
          key={organ.name}
          name={organ.name}
          state={organ.state}
          onDragStart={onDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default InventoryPanel;
