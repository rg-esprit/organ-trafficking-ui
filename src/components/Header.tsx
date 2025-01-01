import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-dark text-light py-3 shadow">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Operation Menu</h1>
          <div className="stats">
            <span className="me-3">Credits: $0</span>
            <span>Inventory: 0/10</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
