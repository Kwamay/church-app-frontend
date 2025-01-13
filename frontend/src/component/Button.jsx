import React from "react";
import PropTypes from "prop-types";
import { Button as PrimeButton } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css";

const Button = ({
  label,
  icon,
  className,
  onClick,
  type = "button",
  disabled = false,
  tooltip,
}) => {
  return (
    <PrimeButton
      label={label}
      icon={icon}
      className={`custom-button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      tooltip={tooltip}
    />
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // Button text
  icon: PropTypes.string, // PrimeReact icon class (e.g., "pi pi-check")
  className: PropTypes.string, // Additional CSS classes
  onClick: PropTypes.func, // Click handler function
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Button type
  disabled: PropTypes.bool, // Disable the button
  tooltip: PropTypes.string, // Tooltip text
};

export default Button;
