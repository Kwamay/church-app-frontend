import React from "react";
import Button from "./Button";

const FieldContainer = ({ icon, title, number }) => {
  return (
    <div className="field-container">
      <div className="dashboard-field-container">
        <p className="dashboard-field-text">{title}</p>
        {icon}
      </div>
      <h3 className="counter">{number}</h3>
      {title === "buy sms" && (
        <Button className={"dashboard-btn"} label="login" />
      )}
    </div>
  );
};

export default FieldContainer;
