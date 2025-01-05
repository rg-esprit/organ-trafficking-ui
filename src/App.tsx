import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import InventoryPanel from "./components/InventoryPanel";
import "./styles/custom.css";
import ConfirmationModal from "./components/ConfirmationModal";
import { useState } from "react";
import { onMessage } from "./utils/fivemNUI";
import React from "react";

interface Item {
  name: string;
  state: number;
  source?: string;
}

interface PendingDrop {
  data: Item | null;
  targetPlace?: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDrop, setPendingDrop] = useState<PendingDrop>({ data: null });
  const [isVisible, setIsVisible] = useState(false);
  const inventory = [
    { name: "Heart", state: 1 },
    { name: "Lung", state: 2 },
    { name: "FirstKidney", state: 1 },
    { name: "SecondKidney", state: 2 },
  ];
  const handleDragStart = (
    e: React.DragEvent,
    item: { name: string; state: number }
  ) => {
    console.log(`Dragging ${item.name} from body panel`);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...item, source: "body" })
    );
  };
  const handleDragInventory = (
    e: React.DragEvent,
    item: { name: string; state: number }
  ) => {
    console.log(`Dragging ${item.name} from inventory`);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...item, source: "inventory" })
    );
  };
  // inventory
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      setPendingDrop({ data, targetPlace: "inventory" });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  };
  // body
  const handleDropBody = (e: React.DragEvent, PlaceName: string) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      setPendingDrop({ data, targetPlace: PlaceName });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  };

  const handleConfirm = () => {
    if (pendingDrop.data) {
      if (pendingDrop.targetPlace === "inventory") {
        console.log("Dropped into inventory");
      } else {
        console.log("Dropped into " + pendingDrop.targetPlace);
      }
      console.log(pendingDrop.data);
      setPendingDrop({ data: null });
    }
  };
  React.useEffect(() => {
    const cleanup = onMessage("showui", (data: { show: boolean }) => {
      setIsVisible(data.show);
    });

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "k" || event.key === "K") {
        setIsVisible(true);
      } else if (event.key === "l" || event.key === "L") {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      cleanup();
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return isVisible ? (
    <div className="Owner">
      <div className="bg-dark MainWindow">
        <Header />
        <div className="content-container">
          <div className="row full-height">
            <div className="col-8 d-flex align-items-center">
              <BodyPanel
                FirstKidneyState={1}
                HeartState={2}
                LungState={0}
                SecondKidneyState={2}
                onDragStart={handleDragStart}
                onDrop={handleDropBody}
              />
            </div>
            <div className="col-4 d-flex align-items-center border border-danger border-4">
              <InventoryPanel
                inventory={inventory}
                handleDrop={handleDrop}
                onDragStart={handleDragInventory}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPendingDrop({ data: null });
        }}
        onConfirm={handleConfirm}
        title="Confirm Transfer"
        body={`Are you sure you want to move ${pendingDrop.data?.name || "this item"} to ${
          pendingDrop.targetPlace === "inventory"
            ? "inventory"
            : pendingDrop.targetPlace
        }?`}
        confirmText="Transfer"
        cancelText="Cancel"
      />
    </div>
  ) : null;
}

export default App;
