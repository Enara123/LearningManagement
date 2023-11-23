import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function DTPicker({ title }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker label={title} sx={{ borderRadius: "20px" }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
