import { useState } from "react";

interface SelectionState {
  selectedRows: string[];
  selectAll: boolean;
}

interface ItemProps {
  id: string;
}

interface UseTableSelectionProps<T extends ItemProps> {
  initialSelectedRows?: string[];
  data: T[];
}

export function useTableSelection<T extends ItemProps>({ initialSelectedRows = [], data }: UseTableSelectionProps<T>): [SelectionState, (id: string) => void, () => void] {
  const [selectedRows, setSelectedRows] = useState<string[]>(initialSelectedRows);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const toggleRowSelect = (id: string) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = data.map((item: T) => item.id); 
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  return [{ selectedRows, selectAll }, toggleRowSelect, toggleSelectAll];
}