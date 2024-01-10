import React, { useState } from 'react';
import { Box, Button, Fade, Grid, Modal } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Backdrop from '@mui/material/Backdrop';
import { CardContent, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
  
} from '@mui/lab';
import { Link } from '@mui/material';
import AdminForm from './AdminForm';



const SamplePage = () => {
  // Données de l'administrateur (à remplacer par les vraies données)
  const Data = {
    "nom_admin": 'Mehdi',
    "prenom_admin": 'Elargoubi',
    "email_admin": 'admin@example.com',
    "telephone_admin": '1234567890',
    "login_admin": 'admin',
    "password_admin": '********' ,
  };

  const [editing, setEditing] = useState(false);
  const [adminData, setAdminData] = useState(Data);

  const handleToggleEditing = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleSave = (updatedAdminData) => {
    setAdminData(updatedAdminData);
    setEditing(false);
  };

  const handleModify = () => {
    setEditing(true);
  };
  
  return (
    <PageContainer title="Profile Admin" description="this is profile admin page">
      {/*  */}


    <DashboardCard title="Informations d'Administrateur">
      <PageContainer>
      <Box container>
        <Grid container lg={12}>
          <Grid item xs={11} lg={6}>
            <CardContent>
              {/* <Timeline
                className="theme-timeline"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                sx={{
                  p: 0,
                  mb: '-40px',
                  '& .MuiTimelineConnector-root': {
                    width: '1px',
                    backgroundColor: '#efefef',
                  },
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.5,
                    paddingLeft: 0,
                  },
                }}
              >
                {Object.entries(Data).map(([key, value]) => (
                  <TimelineItem key={key}>
                    <TimelineOppositeContent fontWeight="500">{key}</TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent fontWeight="900">{value}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline> */}

              <Timeline
                className="theme-timeline"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                sx={{
                  p: 0,
                  mb: '-40px',
                  '& .MuiTimelineConnector-root': {
                    width: '1px',
                    backgroundColor: '#efefef'
                  },
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.5,
                    paddingLeft: 0,
                  },
                }}
              >
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Nom</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent fontWeight="600"> {Data.nom_admin} </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Prénom</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="secondary" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography fontWeight="600"> {Data.prenom_admin} </Typography>{' '}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Email</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="success" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent> {Data.email_admin} </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Téléphone</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="warning" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography> {Data.telephone_admin} </Typography>{' '}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Login</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="error" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography fontWeight="600"> {Data.login_admin} </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent fontWeight="500">Mot de passe</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="success" variant="outlined" />
                  </TimelineSeparator >
                  <TimelineContent fontWeight="600"> {Data.password_admin} </TimelineContent>
                </TimelineItem>
              </Timeline>
            </CardContent>
          </Grid>

          <Grid xs={1} lg={6}>
            {editing ? (
              <Button variant="outlined" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button color="primary" onClick={handleModify}>
                <svg xmlns="http://www.w3.org/2000/svg" color="primary" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      </PageContainer>
    </DashboardCard>

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editing}
        onClose={handleToggleEditing}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editing}>
          <AdminForm Data={Data} onSave={handleSave} />
        </Fade>
      </Modal>
      {/*  */}






    </PageContainer>
  );

};

export default SamplePage;


