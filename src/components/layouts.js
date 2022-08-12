import React from "react";

export const DataLayout = ({ children, label }) => {
  return (
    <div className="space-y-3">
      <p className="font-bold">{label}</p>
      <div className="input-primary">{children}</div>
    </div>
  );
};
