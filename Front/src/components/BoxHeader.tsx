import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sideText?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  
  return (
    <FlexBetween
      color={palette.grey[400]}
      margin="1.5rem 1rem 0 1rem"
      sx={{
        "& > div": { display: "flex", alignItems: "center", gap: "0.5rem" },
      }}
    >
      <Box>
        {icon && (
          <Box
            sx={{
              background: "linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)",
              borderRadius: "50%",
              padding: "0.5rem",
              marginRight: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: palette.grey[100],
              fontWeight: "600",
              fontSize: "1.1rem"
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" sx={{ color: palette.grey[400] }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {sideText && (
        <Typography
          variant="h6"
          sx={{ color: palette.grey[400], fontWeight: "500" }}
        >
          {sideText}
        </Typography>
      )}
    </FlexBetween>
  );
};

export default BoxHeader;