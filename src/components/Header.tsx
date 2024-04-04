import React, { useState } from "react";
import "../css/Header.css";

function Header() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleAddClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header-container mb-5">
      <div className="content">
        <div className="title">
          <h1>Dashboard / SRE Team</h1>
        </div>
        <div className="button-container">
          {isEditing ? (
            <>
              <button
                className="btn-style"
                type="button"
                onClick={handleAddClick}
              >
                Add
              </button>
              <button
                className="btn-style"
                type="button"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="btn-style"
              type="button"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}

          {isEditing && isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr className="horizontal-line" />
    </div>
  );
}

export default Header;
