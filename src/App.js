import "./App.css";
import Profile from "./pages/Profile";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./pages/MainContent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [tables, setTables] = useState([
    {
      id: 1,
      name: "Tabela de Clientes",
      data: [
        { name: "João", age: 30, email: "joao@example.com" },
        { name: "Maria", age: 25, email: "maria@example.com" },
      ],
    },
    {
      id: 2,
      name: "Tabela de Produtos",
      data: [
        { name: "Seguro Vida", price: 200, items: 50 },
        { name: "Seguro Auto", price: 150, items: 100 },
      ],
    },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectTable = (tableId) => {
    const table = tables.find((t) => t.id === parseInt(tableId));
    setSelectedTable(table);
    setIsEditing(false);
  };

  const handleEditTable = () => {
    setIsEditing(true);
  };

  const handleConfirmEdit = (newData) => {
    if (!selectedTable) return;
    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTable.id ? { ...table, data: newData } : table
      )
    );
    setIsEditing(false);
  };

  const handleDiscardEdit = () => {
    setIsEditing(false);
  };

  return (
    <Router>
      <div className="App">
        <Header tables={tables} onSelectTable={handleSelectTable} />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                selectedTable={selectedTable}
                isEditing={isEditing}
                onEditTable={handleEditTable}
                onConfirmEdit={handleConfirmEdit}
                onDiscardEdit={handleDiscardEdit}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
