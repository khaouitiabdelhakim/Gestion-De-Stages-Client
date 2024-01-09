import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Profile Admin" description="this is profile admin page">

      <DashboardCard title="Sample Page">
        <Typography>
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
