import { React } from "react";
import { Box, Typography, Radio } from "@mui/material";
import PaperBg from "./PaperBg";
import { useState } from "react";

// const AnswerProp = ({ answer }) => {
//   const [selectedValue, setSelectedValue] = useState("a");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };
//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       sx={{
//         border: "1px solid #A0AAB4",
//         borderRadius: "10px",
//         padding: "10px",
//         marginTop: "20px",
//       }}
//     >
//       <Box>
//         <Radio
//           checked={selectedValue === "a"}
//           onChange={handleChange}
//           value="a"
//           name="radio-buttons"
//           inputProps={{ "aria-label": "A" }}
//         />
//       </Box>
//       <Typography>{answer}</Typography>
//     </Box>
//   );
// };

const QuestionCard = ({ question }) => {
  return (
    <Box>
      <PaperBg customWidth={1020} customHeight={466}>
        <Box sx={{ padding: "30px" }}>
          <Typography variant="h4">Question Number</Typography>
          <Typography variant="body1" mt="10px">
            Which of the following is the correct syntax of including a user
            defined header files in C++?
          </Typography>
          <AnswerProp />
        </Box>
      </PaperBg>
    </Box>
  );
};

export default QuestionCard;
