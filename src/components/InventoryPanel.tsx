import Organs from "./Organs";

interface Organ {
  name: string;
  state: number;
}

interface InventoryPanelProps {
  inventory: Organ[];
}

const InventoryPanel = ({ inventory }: InventoryPanelProps) => {
  return (
    <div className="d-inline-flex flex-wrap justify-content-center gap-4">
      {inventory.map((organ) => (
        <Organs key={organ.name} name={organ.name} state={organ.state} />
      ))}
    </div>
  );
};

export default InventoryPanel;
