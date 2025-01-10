import NotificationBar from "./NotificationBar.tsx";
import Organs from "./Organs.tsx";

const bodyOutlineUrl = "./assets/body-outline.png";

interface Props {
  FirstKidneyState: number;
  SecondKidneyState: number;
  HeartState: number;
  LungState: number;
  onDrop: (
    item: { name: string; state: number; source: string },
    targetPlace: string
  ) => void;
}

const BodyPanel = ({
  FirstKidneyState,
  SecondKidneyState,
  HeartState,
  LungState,
  onDrop,
}: Props) => {
  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col position-relative">
            <img src={bodyOutlineUrl} className="img-fluid" alt="..." />
            <div
              className="position-absolute"
              style={{
                top: "42%",
                left: "52%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Organs name="Heart" state={HeartState} onDrop={onDrop} />
            </div>
            <div
              className="position-absolute"
              style={{
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Organs name="Lung" state={LungState} onDrop={onDrop} />
            </div>
            <div
              className="position-absolute"
              style={{
                top: "73%",
                left: "42%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Organs
                name="FirstKidney"
                state={FirstKidneyState}
                onDrop={onDrop}
              />
            </div>
            <div
              className="position-absolute"
              style={{
                top: "73%",
                left: "58%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Organs
                name="SecondKidney"
                state={SecondKidneyState}
                onDrop={onDrop}
              />
            </div>
          </div>

          <div className="col">
            <NotificationBar
              type={
                HeartState === 1
                  ? "warning"
                  : HeartState === 2
                    ? "success"
                    : "danger"
              }
              message={
                HeartState === 0
                  ? "Heart is non-existent."
                  : HeartState === 1
                    ? "Heart has issues."
                    : "Heart is healthy."
              }
            />
            <NotificationBar
              type={
                LungState === 1
                  ? "warning"
                  : LungState === 2
                    ? "success"
                    : "danger"
              }
              message={
                LungState === 0
                  ? "Lung is non-existent."
                  : LungState === 1
                    ? "Lung has issues."
                    : "Lung is healthy."
              }
            />
            <NotificationBar
              type={
                FirstKidneyState === 1
                  ? "warning"
                  : FirstKidneyState === 2
                    ? "success"
                    : "danger"
              }
              message={
                FirstKidneyState === 0
                  ? "First Kidney is non-existent."
                  : FirstKidneyState === 1
                    ? "First Kidney has issues."
                    : "First Kidney is healthy."
              }
            />
            <NotificationBar
              type={
                SecondKidneyState === 1
                  ? "warning"
                  : SecondKidneyState === 2
                    ? "success"
                    : "danger"
              }
              message={
                SecondKidneyState === 0
                  ? "Second Kidney is non-existent."
                  : SecondKidneyState === 1
                    ? "Second Kidney has issues."
                    : "Second Kidney is healthy."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyPanel;
