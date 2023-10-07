import React, { createContext, useContext, useState } from "react";

export const ClickAway = createContext(null);
export default function ClickAwayProvider({ children }) {
  const [openFilter, setFilterState] = useState(false);
  const [openGrid, setGridState] = useState(false);
  const [openSort, setSortState] = useState(false);
  const handleFilterClick = () => {
    setFilterState((prev) => !prev);
  };
  const handleGridClick = () => {
    setGridState((prev) => !prev);
  };
  const handleSortClick = () => {
    setSortState((prev) => !prev);
    console.log(1);
  };

  const handleClickAway = () => {
    setFilterState(false);
    setGridState(false);
    setSortState(false);
  };

  return (
    <ClickAway.Provider
      value={{
        openFilter,
        handleFilterClick,
        openGrid,
        handleGridClick,
        openSort,
        handleSortClick,
        handleClickAway,
      }}
    >
      {children}
    </ClickAway.Provider>
  );
}
export function useClickAway() {
  return useContext(ClickAway);
}
