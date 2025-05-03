import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  padding: "1rem",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column"
}));

export default DashboardBox;