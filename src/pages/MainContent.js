import React from "react";
import TableView from "../components/TableView";

const MainContent = ({
  selectedTable,
  isEditing,
  onEditTable,
  onConfirmEdit,
  onDiscardEdit,
}) => {
  return (
    <main>
      <TableView
        selectedTable={selectedTable}
        isEditing={isEditing}
        onEditTable={onEditTable}
        onConfirmEdit={onConfirmEdit}
        onDiscardEdit={onDiscardEdit}
      />
    </main>
  );
};

export default MainContent;
