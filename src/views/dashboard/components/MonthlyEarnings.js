import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const MonthlyEarnings = () => {
  const theme = useTheme();

  const [currentStage, setCurrentStage] = useState('1A');

  const students = {
    '1A': Math.floor(Math.random() * 50),
    '2A-1': Math.floor(Math.random() * 50),
    '2A-2': Math.floor(Math.random() * 50),
    '3A-1': Math.floor(Math.random() * 50),
    '3A-2': Math.floor(Math.random() * 50),
  };

  const stageColors = {
    '1A': '#FF6F61',
    '2A-1': '#6B5B95',
    '2A-2': '#88B04B',
    '3A-1': '#F7CAC9',
    '3A-2': '#92A8D1',
  };

  const handleStageChange = (event) => {
    setCurrentStage(event.target.value);
  };

  return (
    <DashboardCard title={`Stage de Type ${currentStage}`}>
      <>
        <Stack spacing={2} alignItems="center">
          {/* Liste déroulante pour choisir le type de stage */}
          <FormControl style={{ width: '80%' }}>
            <Select value={currentStage} onChange={handleStageChange}>
              {Object.keys(students).map((stage) => (
                <MenuItem key={stage} value={stage}>
                  {stage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Affichage de la bulle pour le type de stage sélectionné */}
          <Box
            border={1}
            borderColor={stageColors[currentStage]}
            borderRadius={4}
            p={2}
            bgcolor={stageColors[currentStage]}
            width="80%"
            textAlign="center"
          >
            <Typography variant="subtitle2" fontWeight="600" color="white">
              {students[currentStage]} Etudiants
            </Typography>
          </Box>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
