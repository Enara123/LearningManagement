import React from "react";

const TextInput = ({
  type,
  placeholder,
  height,
  width,
  required,
  onChange,
}) => {
  const inputStyle = {
    height: height,
    width: width,
    padding: "10px",
    border: "none",
    borderBottom: "1px solid #000",
    fontSize: "16px",
    outline: "none",
    margin: "20px 0px",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={inputStyle}
      required={required}
      onChange={onChange}
    />
  );
};

export default TextInput;
