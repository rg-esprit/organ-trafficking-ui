import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import InventoryPanel from "./components/InventoryPanel";
import "./styles/custom.css";
import React from "react";

function App() {
  const inventory = [
    { name: "Heart", state: 1 },
    { name: "Lung", state: 2 },
    { name: "FirstKidney", state: 1 },
    { name: "SecondKidney", state: 2 },
  ];
  const handleDragStart = (
    e: React.DragEvent,
    item: { name: string; state: number },
  ) => {
    console.log(`Dragging ${item.name} from body panel`);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...item, source: "body" }),
    );
  };
  const handleDrop = (e: React.DragEvent) => {
    console.log("Dropped into inventory");
    let data = e.dataTransfer.getData("text/plain");
    data = JSON.parse(data);
    console.log(data);
  };
  return (
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
              />
            </div>
            <div className="col-4 d-flex align-items-center border border-danger border-4">
              <InventoryPanel inventory={inventory} handleDrop={handleDrop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
