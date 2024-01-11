  import React, { useState,useEffect } from 'react';
  import axios from 'axios';
  import AddDialog from './addDialog';


  import {
    Typography, Select, FormControl,Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
    Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
  } from '@mui/material';
  import DashboardCard from '../../components/shared/DashboardCard';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';

 

  const Info = () => {

   

  // Fetch data for exigerData and types

  const handleAddNewExigerData = (newExigerData) => {
    // Logic to add new exigerData
  };

  const exigerDataFields = [
    { name: 'type', label: 'Type', itemKey: 'no_type', itemValue: 'duree' },
    // Add other additional fields as needed
  ];

    const [associerData, setAssocierData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [exigerData, setExigerData] = useState([]);
  const [competenceData, setCompetenceData] = useState([]);

  useEffect(() => {
    // Fetch associerData
    axios.get('http://localhost:3500/associerData')
      .then(response => setAssocierData(response.data))
      .catch(error => console.error('Error fetching associerData', error));

    // Fetch typeData
    axios.get('http://localhost:3500/typeData')
      .then(response => setTypeData(response.data))
      .catch(error => console.error('Error fetching typeData', error));

    // Fetch exigerData
    axios.get('http://localhost:3500/exigerData')
      .then(response => setExigerData(response.data))
      .catch(error => console.error('Error fetching exigerData', error));

    // Fetch competenceData
    axios.get('http://localhost:3500/competenceData')
      .then(response => setCompetenceData(response.data))
      .catch(error => console.error('Error fetching competenceData', error));
  }, []);

    const [stages, change_stages]  = useState([]) ;

    useEffect(() => {
        axios.get('http://localhost:3500/stage')
          .then(response => { change_stages(response.data)
            console.log('stages',response.data) })
          .catch(error => console.error('Error fetching notes', error));
          
      }, []);

    //all the data
    const [encadrants, change_encadrants]  = useState([]) ;

    useEffect(() => {
        axios.get('http://localhost:3500/encadrant')
          .then(response => change_encadrants(response.data))
          .catch(error => console.error('Error fetching notes', error));
      }, []);


      const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3500/etudiant');
                setEtudiants(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const [entreprises, change_entreprises]  = useState([]) ;

    useEffect(() => {
      axios.get('http://localhost:3500/entreprise')
        .then(response => change_entreprises(response.data))
        .catch(error => console.error('Error fetching notes', error));
    }, []);


    const [promotions, change_promotions]  = useState([]) ;

    useEffect(() => {
      axios.get('http://localhost:3500/promotion')
        .then(response => change_promotions(response.data))
        .catch(error => console.error('Error fetching notes', error));
    }, []);

    const [types, change_types]  = useState([]) ;

    useEffect(() => {
      axios.get('http://localhost:3500/type')
        .then(response => change_types(response.data))
        .catch(error => console.error('Error fetching notes', error));
    }, []);


    const [professeurs, change_professeurs]  = useState([]) ;

    useEffect(() => {
        axios.get('http://localhost:3500/professeur')
          .then(response => {
            change_professeurs(response.data)
            console.log(response.data)
          })
          .catch(error => console.error('Error fetching notes', error));
      }, []);


      const formatDate = (dateString) => {
        const options = { year: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
      };




      const [searchText, setSearchText] = useState('');
      const [promotionFilter, setPromotionFilter] = useState('');
      const [yearFilter, setYearFilter] = useState('');
      const [stageTypeFilter, setStageTypeFilter] = useState('');
      const [selectedStageIndex, setSelectedStageIndex] = useState(null);
      const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const [selectedStage, setSelectedStage] = useState(null);
      const [addDialogOpen, setAddDialogOpen] = useState(false);
      const [newStage, setNewStage] = useState({
        promotion: '',
        nomEtudiant: '',
        // Ajoute les autres champs ici avec leurs valeurs initiales
      });

      const handleAddStage = () => {
        setSelectedStage(null);
        setAddDialogOpen(true);
    };
    const handleAddNewStage = async (newStage) => {
      try {
        const stageData = {
          appreciation_stage: newStage.compteRendu,
          annee_de_stage: new Date(newStage.annee, 0, 1), // Assuming you want the beginning of the year
          no_etudiant: newStage.etudiant,
          no_professeur: newStage.professeur,
          no_encadrant: newStage.encadrant,
          no_type: newStage.type,
          no_entreprise: newStage.entreprise
      };

      console.log('Response sent to backend:', stageData);
      
      // Now you can use stageData in your API call
      fetch('http://localhost:3500/stage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(stageData),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Response from backend:', data);
      
          // If needed, you can clear the form or take other actions here
          setAddDialogOpen(false);
      })
      .catch(error => {
          console.error('Error:', error);
      });
      
      
          
     
      
          
      } catch (error) {
          console.error('Error adding new stage:', error);
      }
  };
  
      const handleEditClick = (index) => {
        setSelectedStage(stages[index]);
        setSelectedStageIndex(index);
        setEditDialogOpen(true);
      };
      const handleEditStage = (updatedStage) => {
        const updatedStages = [...stages];
        updatedStages[selectedStageIndex] = updatedStage;
        // Mettre à jour l'état des stages avec les informations modifiées
        // setStages(updatedStages);
      };

    

      const handleDeleteClick = (index) => {
        setSelectedStageIndex(index);
        setConfirmationDialogOpen(true);
    };
    const handleConfirmation = (confirmed) => {
      if (confirmed && selectedStageIndex !== null) {
          // Supprimer le stage du tableau ici
          const updatedStages = [...stages];
          updatedStages.splice(selectedStageIndex, 1);
          // Mise à jour de l'état des stages
          // setStages(updatedStages);
      }

      setConfirmationDialogOpen(false);
      setSelectedStageIndex(null);
  };
  const filteredStages = stages.filter(stage => {
    const yearMatch = !yearFilter || (stage.annee && stage.annee_de_stage.toString().toLowerCase().includes(yearFilter.toLowerCase()));
    const stageTypeMatch = !stageTypeFilter || (stage.no_type && stage.no_type.toString().toLowerCase().includes(stageTypeFilter.toLowerCase()));

    return  yearMatch && stageTypeMatch;
});

      const promotionOptions = [];
      for (let year = 2003; year <= 2025; year++) {
          promotionOptions.push(year.toString());
      }

      const yearOptions = [];
      for (let year = 2000; year <= 2023; year++) {
          yearOptions.push(year.toString());
      }

      return (
        <Box sx={{ overflow: 'auto', width: '100%' }}>
      {/* Box 1: Associations */}
      <DashboardCard
        title="Associations"
        action={
          <Button variant="outlined" onClick={handleAddStage} style={{ backgroundColor: 'green', color: 'white' }}>
            Ajouter
          </Button>
        }
      >
        {/* Table for associations */}
        <Box>
        <Table aria-label="associerData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
      <TableHead>
        <TableRow>
          {/* Adjust the headers based on your associerData properties */}
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Année</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Type</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Date Début</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Date Fin</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {associerData.map((data, index) => (
          <TableRow key={index}>
            {/* Adjust the cells based on your associerData properties */}
            <TableCell>{data.annee}</TableCell>
            <TableCell>{data.no_type}</TableCell>
            <TableCell>{data.date_debut}</TableCell>
            <TableCell>{data.date_fin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Box>
      </DashboardCard>

      {/* Box 2: Type Data */}
      <DashboardCard
        title="Type Data"
        action={
          <Button variant="outlined" onClick={handleAddStage} style={{ backgroundColor: 'green', color: 'white' }}>
            Ajouter
          </Button>
        }
      >
        {/* Table for typeData */}
        <Box>
        <Table aria-label="typeData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
      <TableHead>
        <TableRow>
          {/* Adjust the headers based on your typeData properties */}
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Type ID</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Duration</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {typeData.map((data, index) => (
          <TableRow key={index}>
            {/* Adjust the cells based on your typeData properties */}
            <TableCell>{data.no_type}</TableCell>
            <TableCell>{data.duree}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Box>
      </DashboardCard>

      {/* Box 3: Exiger Data */}
      <DashboardCard
        title="Exiger Data"
        action={
          <Button variant="outlined" onClick={handleAddStage} style={{ backgroundColor: 'green', color: 'white' }}>
            Ajouter
          </Button>
        }
      >
        {/* Table for exigerData */}
        <Box>
        <Table aria-label="exigerData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
      <TableHead>
        <TableRow>
          {/* Adjust the headers based on your exigerData properties */}
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Type ID</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Competence ID</Typography></TableCell>
          <TableCell><Typography variant="subtitle1" fontWeight={600}>Exigence Level</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {exigerData.map((data, index) => (
          <TableRow key={index}>
            {/* Adjust the cells based on your exigerData properties */}
            <TableCell>{data.no_type}</TableCell>
            <TableCell>{data.no_competence}</TableCell>
            <TableCell>{data.niveau_exige}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Box>
      </DashboardCard>

      {/* Box 4: Competence Data */}
      <DashboardCard
        title="Competence Data"
        action={
          <Button variant="outlined" onClick={handleAddStage} style={{ backgroundColor: 'green', color: 'white' }}>
            Ajouter
          </Button>
        }
      >
        {/* Table for competenceData */}
        <Box>
    <Table aria-label="competenceData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
        <TableHead>
            <TableRow>
                <TableCell><Typography variant="subtitle1" fontWeight={600}>Competence ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight={600}>Description</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight={600}>Libelle</Typography></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {competenceData.map((data, index) => (
                <TableRow key={index}>
                    <TableCell>{data.no_competence}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.libelle}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</Box>
      </DashboardCard>

      <AddDialog
        open={addDialogOpen}
        handleClose={() => setAddDialogOpen(false)}
        handleAddNewData={handleAddNewExigerData}
        data={exigerData}
        setData={setExigerData}
        fetchDataEndpoint="http://localhost:3500/exigerData" // Replace with the actual endpoint
        label="Exiger Data"
        itemKey="no_type"
        itemValue="duree"
        additionalFields={exigerDataFields}
      />
   
    </Box>
      );
  };

  export default Info;
