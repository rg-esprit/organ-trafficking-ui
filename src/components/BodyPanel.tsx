import NotificationBar from "./NotificationBar.tsx";
import Organs from "./Organs.tsx";

interface Props {
  FirstKidneyState: number;
  SecondKidneyState: number;
  HeartState: number;
  LungState: number;
}

const BodyPanel = ({
  FirstKidneyState,
  SecondKidneyState,
  HeartState,
  LungState,
}: Props) => {
  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* First Card */}
          <div className="col">
            <img
              src="src/assets/body-outline.png"
              className="img-fluid"
              alt="..."
            />
          </div>

          {/* Second Card */}
          <div className="col">
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
            <Organs />
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyPanel;
