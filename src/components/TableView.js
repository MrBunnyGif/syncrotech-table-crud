import React, { useEffect, useMemo, useState } from "react";

const TableView = ({
  selectedTable,
  isEditing,
  onEditTable,
  onConfirmEdit,
  onDiscardEdit,
}) => {
  const [editData, setEditData] = useState([]);
  const columns = useMemo(() => {
    if (!selectedTable?.data?.[0]) return [];
    return Object.keys(selectedTable.data[0]);
  }, [selectedTable]);

  useEffect(() => {
    if (selectedTable) {
      setEditData([...selectedTable.data]);
    }
  }, [selectedTable]);

  const handleInputChange = (rowIndex, column, value) => {
    setEditData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [column]: value } : row
      )
    );
  };

  const handleAddRow = () => {
    const emptyRow = {};
    columns.forEach((col) => {
      emptyRow[col] = "";
    });
    setEditData([...editData, emptyRow]);
  };

  const discardChanges = () => {
    setEditData([...selectedTable.data]);
    onDiscardEdit();
  };

  if (!selectedTable) {
    return <div>Select a table</div>;
  }

  return (
    <div className="table-view">
      <h3>{selectedTable.name}</h3>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder={column}
                      value={row[column]}
                      onChange={(e) =>
                        handleInputChange(rowIndex, column, e.target.value)
                      }
                    />
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing ? (
        <>
          <button onClick={() => onConfirmEdit(editData)}>Confirm</button>
          <button onClick={discardChanges}>Cancel</button>
          <button onClick={handleAddRow}>Add Row</button>
        </>
      ) : (
        <button onClick={onEditTable}>Edit</button>
      )}
    </div>
  );
};

export default TableView;
