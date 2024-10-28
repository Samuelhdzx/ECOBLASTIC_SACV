import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import logo from "/img/logo.png";

type Props = {};

const Navbar = (props: Props) => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return (
    <FlexBetween mb="0.25rem" p="2rem 0rem" color={palette.grey[300]}>
        {/* LEFT  */}
        <FlexBetween gap="1rem">
        <img src={logo} alt="Company Logo" style={{ height: '30px'}} /> {/* Adjust height as needed */}
        <Typography variant="h4" fontSize="25px" color="white">ECOBLASTIC</Typography>
        </FlexBetween>

        {/* RIGHT SIDE */}
        
        <FlexBetween gap="2rem">

            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/inicio"
               onClick={() => setSelected("inicio")}
               style={{
                color: selected === "inicio" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Inicio
              </Link>
            </Box>

            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/"
               onClick={() => setSelected("dashboard")}
               style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Monitoreo 
              </Link>
            </Box>
            
            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/predictions"
               onClick={() => setSelected("predictions")}
               style={{
                color: selected === "predictions" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Prediccion
              </Link>
            </Box>

            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/registers"
               onClick={() => setSelected("registers")}
               style={{
                color: selected === "registers" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Registos
              </Link>
            </Box>

            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/manuals"
               onClick={() => setSelected("manuals")}
               style={{
                color: selected === "manuals" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Manuales
              </Link>
            </Box>

            <Box sx={{ "&:hover": {color: palette.primary[100]} }}>
              <Link to="/plastics"
               onClick={() => setSelected("plastics")}
               style={{
                color: selected === "plastics" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                fontSize: "18px",
              }}
              >
              Plásticos
              </Link>
            </Box>

        </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;