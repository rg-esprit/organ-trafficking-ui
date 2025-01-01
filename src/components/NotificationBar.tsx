interface NotificationProps {
  type: "primary" | "success" | "warning" | "danger";
  message: string;
}

const NotificationBar = ({ type, message }: NotificationProps) => {
  const iconMap = {
    primary: "#info-fill",
    success: "#check-circle-fill",
    warning: "#exclamation-triangle-fill",
    danger: "#exclamation-triangle-fill",
  };

  return (
    <div
      className={`alert alert-${type} d-flex align-items-center py-1 px-2 fs-6`}
      role="alert"
      style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}
    >
      <svg
        className="bi flex-shrink-0 me-2"
        role="img"
        aria-label={type}
        style={{ width: "1rem", height: "1rem" }}
      >
        <use xlinkHref={iconMap[type]} />
      </svg>
      <div>{message}</div>
    </div>
  );
};

export default NotificationBar;
