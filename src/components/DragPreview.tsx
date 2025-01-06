import { useDragLayer } from "react-dnd";

const DragPreview = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: currentOffset.x,
        top: currentOffset.y,
      }}
    >
      <img
        src={item.previewSrc}
        alt="Dragging"
        style={{ width: "4rem", opacity: 0.8 }}
      />
    </div>
  );
};

export default DragPreview;
