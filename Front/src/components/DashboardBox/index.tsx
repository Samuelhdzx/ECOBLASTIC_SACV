import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface BoxHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  sideText?: string;
}

export const BoxHeader = ({ icon, title, subtitle, sideText }: BoxHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon}
        <Box>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {sideText && (
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {sideText}
        </Typography>
      )}
    </Box>
  );
};

export const DashboardBox = ({ children, gridArea }: { children: ReactNode; gridArea?: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        gridArea: gridArea,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        minHeight: '300px',
      }}
    >
      {children}
    </Box>
  );
};
