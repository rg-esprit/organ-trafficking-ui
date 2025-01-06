import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import InventoryPanel from "./components/InventoryPanel";
import "./styles/custom.css";
import ConfirmationModal from "./components/ConfirmationModal";
import { useState } from "react";
import { onMessage } from "./utils/fivemNUI";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import React from "react";
import DragPreview from "./components/DragPreview";

interface Item {
  name: string;
  state: number;
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

  // Handler for both inventory and body drops
  const handleDrop = (item: Item, targetPlace: string) => {
    setPendingDrop({ data: item, targetPlace });
    setIsModalOpen(true);
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
    setIsModalOpen(false);
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
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="Owner">
        <DragPreview /> {/* Add this line */}
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
                  onDrop={handleDrop}
                />
              </div>
              <div className="col-4 d-flex align-items-center border border-danger border-4">
                <InventoryPanel inventory={inventory} onDrop={handleDrop} />
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
    </DndProvider>
  ) : null;
}

export default App;
