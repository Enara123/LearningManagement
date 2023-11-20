import React from "react";
import PropTypes from "prop-types";

const ButtonCustom = ({ label, onClick, height, width }) => {
  return (
    <input
      type="button"
      style={{
        backgroundColor: "#0BE2E2",
        color: "#000000",
        padding: "10px 20px",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "20px",
        margin: "50px 0px",
        height: height,
        width: width,
        fontFamily: "Montserrat",
      }}
      onClick={onClick}
      value={label}
      required
    />
  );
};

ButtonCustom.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonCustom;
