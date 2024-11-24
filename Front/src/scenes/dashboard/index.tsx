import { Box, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "d b c"
  "d h i"
  "d h i"
  "d h i"
  "d h i"
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
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    return(
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.7rem"
            sx={
                isAboveMediumScreens
                    ? {
                        gridTemplateColumns: "repeat(3, minmax(500px, 1fr))",
                        gridTemplateRows: "repeat(10, minmax(70px, 1fr))",
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
