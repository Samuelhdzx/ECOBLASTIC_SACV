import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(17, 25, 40, 0.8)",
  borderRadius: "1rem",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "1rem",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "none",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #3a86ff, #8338ec)",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.4)",
    "&::before": {
      opacity: 0.8,
    },
  },
}));

export default DashboardBox;