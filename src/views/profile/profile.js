import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Profile = () => {
  return (
    <PageContainer title="Profile Admin" description="this is profile admin page">

      <DashboardCard title="Sample Page">
        <Typography>Profile</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;
