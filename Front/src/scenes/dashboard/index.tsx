// index.tsx
import { Box, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Row4 from './Row4';

const gridTemplateLargeScreens = `
  "a b c"
  "d e f"
`;

const gridTemplateSmallScreens = `
  "a"
  "b"
  "c"
  "d"
  "e"
  "f"
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

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        padding: isAboveMediumScreens ? "1.5rem" : "1rem",
        gridTemplateColumns: isAboveMediumScreens ? "repeat(3, 1fr)" : "1fr",
        gridTemplateRows: "auto",
        gridTemplateAreas: isAboveMediumScreens
          ? gridTemplateLargeScreens
          : gridTemplateSmallScreens,
      }}
    >
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </Box>
  );
};

export default Dashboard;
