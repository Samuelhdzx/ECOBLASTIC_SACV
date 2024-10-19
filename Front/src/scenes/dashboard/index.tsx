import { Box, useMediaQuery } from '@mui/material';
import Row1 from './row1';
import Row2 from './row2';
import Row3 from './row3';



const gridTemplateLargeScreens = `
    "a b c d"
    "a b c d"
    "a b c d"
    "a b c d"
    "a b c d"
    "a h i d"
    "a h i d"
    "a h i d"
    "a h i d"
    "a h i d"
`;

const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "h"
    "h"
    "h"
    "c"
    "c"
    "c"
`;

    const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
    return(
      <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(4, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    ); 
};

export default Dashboard;