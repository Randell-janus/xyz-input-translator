import React from "react";

export const Input = ({ label, className, ...props }) => {
  return (
    <div className="space-y-3">
      <p className="font-bold">{label}</p>
      <input className={`input-primary ${className}`} {...props} />
    </div>
  );
};

export const Select = ({ label, options, ...props }) => {
  return (
    <div className="space-y-3">
      <p className="font-bold">{label}</p>
      <select className="input-primary" {...props}>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
