import { Grid } from '@mui/material';
// ... imports

const MoldDetailSection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Rendimiento por Molde" />
        {/* Gráficos de rendimiento por molde */}
      </DashboardBox>
    </Grid>
    {/* Más gráficos de moldes */}
  </>
);

export default MoldDetailSection;
