import { useState, type ReactNode } from "react";
import type { DropdownTableItemRenderProps } from "./dropdown-table";

interface Props {
  renderTrigger: (props: DropdownTableItemRenderProps) => ReactNode;
  renderContent: () => ReactNode;
  defaultOpen?: boolean;
}

const DropdownTableItem = ({ renderTrigger, renderContent, defaultOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className="w-full">
      {renderTrigger({ isOpen, toggle })}
      {isOpen && renderContent()}
    </div>
  );
};

export default DropdownTableItem;
