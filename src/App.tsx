import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import InventoryPanel from "./components/InventoryPanel";
import "./styles/custom.css";
import ConfirmationModal from "./components/ConfirmationModal";
import { useState } from "react";
import { onMessage, sendToClient } from "./utils/fivemNUI";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import React from "react";
import DragPreview from "./components/DragPreview";

interface Item {
  name: string;
  state: number;
  source?: string;
}

interface PendingDrop {
  data: Item | null;
  targetPlace?: string;
  source?: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDrop, setPendingDrop] = useState<PendingDrop>({ data: null });
  const [isVisible, setIsVisible] = useState(false);
  const [inventory, setInventory] = useState<Item[]>([]); // Changed from const to state

  // Add new state variables for organs
  const [firstKidneyState, setFirstKidneyState] = useState(1);
  const [heartState, setHeartState] = useState(2);
  const [lungState, setLungState] = useState(0);
  const [secondKidneyState, setSecondKidneyState] = useState(2);

  // Handler for both inventory and body drops
  const handleDrop = (item: Item, targetPlace: string) => {
    if (item.source === targetPlace) {
      console.log("Cannot drop into the same place");
      return;
    }
    if (targetPlace !== item.name && targetPlace !== "inventory") {
      console.log("Cannot drop into the wrong place");
      return;
    }
    setPendingDrop({
      data: item,
      targetPlace,
      source: item.source,
    });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (pendingDrop.data) {
      if (pendingDrop.targetPlace === "inventory") {
        console.log(`Dropped into inventory from ${pendingDrop.source}`);
        sendToClient("moveItem", pendingDrop.data);
      } else {
        console.log(
          `Dropped into ${pendingDrop.targetPlace} from ${pendingDrop.source}`
        );
      }
      console.log(pendingDrop.data);
      setPendingDrop({ data: null });
    }
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const cleanup = onMessage(
      "showui",
      (data: { show: boolean; inventory?: Item[] }) => {
        setIsVisible(data.show);
        if (data.inventory) {
          setInventory(data.inventory);
        }
      }
    );
    const RemovedFromBody = onMessage("RemovedFromBody", (data: string) => {
      if (!data) return;
      // Update organ states based on the removed item name
      switch (data.toLowerCase()) {
        case "firstkidney":
          setFirstKidneyState(0);
          break;
        case "heart":
          setHeartState(0);
          break;
        case "lung":
          setLungState(0);
          break;
        case "secondkidney":
          setSecondKidneyState(0);
          break;
      }
    });

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "k" || event.key === "K") {
        setIsVisible(true);
      } else if (event.key === "Escape") {
        setIsVisible(false);
        sendToClient("closeUI");
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
                  FirstKidneyState={firstKidneyState}
                  HeartState={heartState}
                  LungState={lungState}
                  SecondKidneyState={secondKidneyState}
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
          body={`Are you sure you want to move ${pendingDrop.data?.name || "this item"} from ${pendingDrop.source || "unknown"} to ${
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
