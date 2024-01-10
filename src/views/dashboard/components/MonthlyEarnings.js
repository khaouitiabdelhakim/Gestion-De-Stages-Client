import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const MonthlyEarnings = () => {
  const theme = useTheme();

  const [currentStage, setCurrentStage] = useState('11');

  const [students,updateStudents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3500/stage/types')
      .then(response => {
        updateStudents(response.data)
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching notes', error));
  }, []);

  const stageColors = {
    '11': '#FF6F61',
    '12': '#6B5B95',
    '22': '#88B04B',
    '31': '#F7CAC9',
    '32': '#92A8D1',
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
