import React from "react";
import "../../assets/ui.scss";

export const Input = ({ value, onChange }) => (
  <input className="customInput" value={value} onChange={onChange} />
);

export const FolderInput = ({ value, onClick }) => (
  <input className="customInputFolder" value={value} onClick={onClick} />
);

export const Button = ({ children, disabled, onClick }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
