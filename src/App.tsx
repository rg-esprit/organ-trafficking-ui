import Header from "./components/Header";
import BodyPanel from "./components/BodyPanel";
import "./styles/custom.css";

function App() {
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
              Inventory Panel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
