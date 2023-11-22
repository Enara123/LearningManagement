import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const CreateModule = () => {
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [noOfAssessments, setNoOfAssessments] = useState("");
  const [expectedStudyHours, setExpectedStudyHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Module created:", {
      moduleName,
      moduleDescription,
      noOfAssessments,
      expectedStudyHours,
    });
  };

  return (
    <div className="CreateModule">
      <p className="headingSpan">
        <p className="Moduleheading">Modules</p>
        <p className="Moduleheading">{">"}</p>
        <p className="Moduleheading">Create Module</p>
      </p>

      <div className="CreateFormDiv">
        <form onSubmit={handleSubmit}>
          <div>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <label>Module Name:</label>
              <TextField
                required
                fullWidth
                id="fullWidth"
                label="Module Name"
                variant="outlined"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
            </Box>
          </div>

          <div>
            <label>Module Description:</label>
            <input
              type="text"
              value={moduleDescription}
              onChange={(e) => setModuleDescription(e.target.value)}
            />
          </div>
          <div>
            <label>No. Of Assessments:</label>
            <input
              type="number"
              value={noOfAssessments}
              onChange={(e) => setNoOfAssessments(e.target.value)}
            />
          </div>
          <div>
            <label>Expected Study Hours:</label>
            <input
              type="number"
              value={expectedStudyHours}
              onChange={(e) => setExpectedStudyHours(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateModule;
