import { Grid } from '@mui/material';
// ... imports

const OperatorDetailSection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Rendimiento por Operario" />
        {/* Gráficos de rendimiento por operario */}
      </DashboardBox>
    </Grid>
    {/* Más gráficos de operarios */}
  </>
);

export default OperatorDetailSection;
