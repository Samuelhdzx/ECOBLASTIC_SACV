import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sideText?: string;
}

const BoxHeader = ({ title, subtitle, icon, sideText }: Props) => {
  const { palette } = useTheme();
  
  return (
    <FlexBetween 
      color={palette.grey[400]} 
      margin="0 0 1rem 0" 
      padding="0 1rem"
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        paddingBottom: "0.75rem",
      }}
    >
      <Box display="flex" alignItems="center" gap="0.5rem">
        {icon && (
          <Box sx={{ 
            color: palette.secondary.main,
            fontSize: "1.5rem",
            marginRight: "0.5rem"
          }}>
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "600",
              fontSize: "1.2rem",
              backgroundImage: "linear-gradient(90deg, #3a86ff, #8338ec)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2" 
              color={palette.grey[500]}
              sx={{
                fontSize: "0.85rem",
                opacity: 0.9
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {sideText && (
        <Typography 
          variant="h6" 
          color={palette.secondary.main}
          sx={{
            fontWeight: "600",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            backgroundColor: "rgba(131, 56, 236, 0.1)",
            border: "1px solid rgba(131, 56, 236, 0.2)"
          }}
        >
          {sideText}
        </Typography>
      )}
    </FlexBetween>
  );
};

export default BoxHeader;