import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import InventoryPanel from "./components/InventoryPanel";
import "./styles/custom.css";

function App() {
  const inventory = [
    { name: "Heart", state: 1 },
    { name: "Lung", state: 2 },
    { name: "FirstKidney", state: 1 },
    { name: "SecondKidney", state: 2 },
    { name: "Lung", state: 1 },
    { name: "Heart", state: 2 },
    { name: "SecondKidney", state: 1 },
    { name: "FirstKidney", state: 2 },
    { name: "Heart", state: 1 },
    { name: "Lung", state: 2 },
    { name: "FirstKidney", state: 2 },
    { name: "SecondKidney", state: 1 },
    { name: "Lung", state: 1 },
    { name: "Heart", state: 2 },
    { name: "SecondKidney", state: 2 },
    { name: "FirstKidney", state: 1 },
  ];

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
              />
            </div>
            <div className="col-4 border border-danger border-4">
              <InventoryPanel inventory={inventory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
