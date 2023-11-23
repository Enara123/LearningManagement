import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  return (
    <Box mb="20px">
      <Typography
        variant="h4"
        color={colors.primary[800]}
        fontWeight="bold"
        sx={{ mb: "2px" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={colors.primary[700]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
