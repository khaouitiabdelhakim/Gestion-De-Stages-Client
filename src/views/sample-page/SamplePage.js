import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SamplePage = () => {
  // Données de l'administrateur (à remplacer par les vraies données)
  const adminData = {
    nom: 'NomAdmin',
    prenom: 'PrenomAdmin',
    email: 'admin@example.com',
    telephone: '1234567890',
    login: 'admin',
    password: '********',
  };

  return (
    <PageContainer title="Profile Admin" description="this is profile admin page">

      <DashboardCard title="Profile Admin">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribut</TableCell>
                <TableCell>Valeur</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(adminData).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
