import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ tables, onSelectTable }) => {
  const location = useLocation();

  return (
    <header>
      <div>
        <Link to="/">
          <h2>Logo</h2>
        </Link>
      </div>
      <div>
        {location.pathname !== "/profile" && (
          <select onChange={(e) => onSelectTable(e.target.value)}>
            <option value="">Select a table</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default Header;
