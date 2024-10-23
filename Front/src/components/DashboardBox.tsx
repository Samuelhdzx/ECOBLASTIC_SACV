import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1 rem",
    boxShadow: "0.15rem 0.5rem 0.5rem 0.1rem rgba(0, 0, 0, 80)",
}));

export default DashboardBox;