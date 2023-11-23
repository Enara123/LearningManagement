import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
  },
  {
    title: "Modules",
    icon: <ArticleIcon />,
    link: "/modules",
  },
  {
    title: "Report",
    icon: <AssessmentOutlinedIcon />,
    link: "/report",
  },
];
