import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const LMSButton = styled(Button)(
  ({ theme, customHeight, customWidth, customFontSize }) => ({
    color: "#000000",
    backgroundColor: "#0BE2E2",
    padding: "10px 20px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: customFontSize || "20px",
    margin: "20px 0px",
    height: customHeight || "50px",
    width: customWidth || "192px",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#EFEFEF",
    },
  })
);

export default LMSButton;
