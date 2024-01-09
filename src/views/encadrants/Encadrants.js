import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AllEncadrants from './AllEncadrants';


const Encadrants = () => {
  return (
    <PageContainer title="Students Page" description="this is Students page">

      <DashboardCard title="">
        <Typography></Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <AllEncadrants/>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>

  );
};

export default Encadrants;
