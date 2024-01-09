import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Etudiants from './Etudiants';


const Students = () => {
  return (
    <PageContainer title="Students Page" description="this is Students page">
      <DashboardCard title="">
        <Typography></Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Etudiants/>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Students;
