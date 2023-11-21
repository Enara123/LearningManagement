import React from "react";

const Heading = ({ text, style }) => {
  return (
    <h1
      style={{
        ...style,
        color: "#000",
        textAlign: "center",
        fontFamily: "Montserrat",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        margin: "26px 0px",
        marginTop: "26px",
      }}
    >
      {text}
    </h1>
  );
};

export default Heading;
