import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
};

const BoxHeader = ({ title,  }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;