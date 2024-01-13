import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
    Typography, Select, FormControl, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
    Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';



const StageList = () => {

    const [stages, change_stages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/stage')
            .then(response => {
                change_stages(response.data)
                console.log('stages', response.data)
            })
            .catch(error => console.error('Error fetching notes', error));

    }, []);

    //all the data
    const [encadrants, change_encadrants] = useState([]);

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

    const [entreprises, change_entreprises] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/entreprise')
            .then(response => change_entreprises(response.data))
            .catch(error => console.error('Error fetching notes', error));
    }, []);


    const [promotions, change_promotions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/promotion')
            .then(response => change_promotions(response.data))
            .catch(error => console.error('Error fetching notes', error));
    }, []);

    const [types, change_types] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/type')
            .then(response => change_types(response.data))
            .catch(error => console.error('Error fetching notes', error));
    }, []);


    const [professeurs, change_professeurs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/professeur')
            .then(response => {
                change_professeurs(response.data)
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching notes', error));
    }, []);


    const formatDate = (dateString) => {
        const options = { year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };




    const [searchText, setSearchText] = useState('');

    const [promotionFilter, setPromotionFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [stageTypeFilter, setStageTypeFilter] = useState('');
    const [selectedStageIndex, setSelectedStageIndex] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState({});

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newStage, setNewStage] = useState({
        promotion: '',
        nomEtudiant: '',
        // Ajoute les autres champs ici avec leurs valeurs initiales
    });

    const handleAddStage = () => {
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

                    window.location.href = "/stage"
                })
                .catch(error => {
                    console.error('Error:', error);
                });






        } catch (error) {
            console.error('Error adding new stage:', error);
        }
    };


   
    const handleEditClick = (index) => {
        setSelectedStage({ ...stages[index] }); // Use spread operator to create a new object
        setSelectedStageIndex(index);
        setEditDialogOpen(true);
        console.log(selectedStage)
    };
    

    const handleEditStage = async (updatedStage) => {
        updatedStage = selectedStage
        try {
          // Prepare the data for the PUT request
          const updatedStageData = {
            appreciation_stage: updatedStage.appreciation_stage,
            annee_de_stage: updatedStage.annee_de_stage,
            no_etudiant: updatedStage.no_etudiant,
            no_professeur: updatedStage.no_professeur,
            no_encadrant: updatedStage.no_encadrant,
            no_type: updatedStage.no_type,
            no_entreprise: updatedStage.no_entreprise
            // Add other fields as needed
          };
      
          // Log the updated data
          console.log('Updated Stage Data:', updatedStageData);
      
          // Send a PUT request to update the stage data
          const putResponse = await axios.put(`http://localhost:3500/stage/${updatedStage.no_stage}`, updatedStageData);
      
          if (putResponse.status === 200) {
            // If the update is successful, you can perform additional actions here
            console.log('Stage updated successfully');
      
            // Close the edit dialog or perform other actions if needed
            setEditDialogOpen(false);
            window.location.href = "/stage"
          } else {
            console.error('Error updating stage:', putResponse.statusText);
          }
        } catch (error) {
          console.error('Error updating stage:', error.message);
        }
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


    const getFilteredItems = (query, stages) => {
        if (!query) {
            return stages;
        }
        const lowerCaseQuery = query.toLowerCase();
        return stages.filter(stage => stage.nom_etudiantr.toLowerCase().includes(lowerCaseQuery))
    }


    const filteredStages = stages.filter(stage => {

        const yearMatch = !yearFilter || (stage.annee_de_stage && stage.annee_de_stage.toString().toLowerCase().includes(yearFilter.toLowerCase()));
        const stageTypeMatch = !stageTypeFilter || (stage.no_type && stage.no_type.toString().toLowerCase().includes(stageTypeFilter.toLowerCase()));

        return yearMatch && stageTypeMatch;
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
        <DashboardCard
            title="Liste des Stages"
            action={
                <Button variant="outlined" onClick={handleAddStage} >
                    Ajouter stage
                </Button>
            }>


            <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
                    
                    <TextField
                        select
                        label="Année"
                        variant="outlined"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        sx={{ width: '20%', mr: 2 }}
                    >
                        {yearOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}

                    </TextField>
                    <TextField
                        select
                        label="Type"
                        variant="outlined"
                        value={stageTypeFilter}
                        onChange={(e) => setStageTypeFilter(e.target.value)}
                        sx={{ width: '20%', mr: 2 }}
                    >
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="21">21</MenuItem>
                        <MenuItem value="22">22</MenuItem>
                        <MenuItem value="31">31</MenuItem>
                        <MenuItem value="32">32</MenuItem>
                    </TextField>
                </Box>
            </Box>

            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>

                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Étudiant</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Professeur</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Encadrant</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Entreprise</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Type</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Année</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Compte Rendu</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStages.map((stage, index) => (
                            <TableRow key={index}>
                                <TableCell>{stage.nom_etudiant} {stage.prenom_etudiant}</TableCell>
                                <TableCell>{stage.nom_professeur} {stage.prenom_professeur}</TableCell>
                                <TableCell>{stage.nom_encadrant} {stage.prenom_encadrant}</TableCell>
                                <TableCell>{stage.nom_entreprise} </TableCell>

                                <TableCell>
                                    {stage.no_type === 11 && (
                                        <Chip label="11" color="primary" />
                                    )}
                                    {stage.no_type === 21 && (
                                        <Chip label="21" color="secondary" />
                                    )}
                                    {stage.no_type === 22 && (
                                        <Chip label="22" color="error" />
                                    )}
                                    {stage.no_type === 31 && (
                                        <Chip label="31" color="success" />
                                    )}
                                    {stage.no_type === 32 && (
                                        <Chip label="32" color="warning" />
                                    )}
                                </TableCell>
                                <TableCell>{formatDate(stage.annee_de_stage)}</TableCell>
                                <TableCell>{stage.appreciation_stage}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(index)}>
                                        <EditIcon style={{ color: 'green' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Dialog
                open={confirmationDialogOpen}
                onClose={() => handleConfirmation(false)}
            >
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    <Typography>Êtes-vous sûr de vouloir supprimer ce stage ?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirmation(false)} style={{ color: 'green' }}>Annuler</Button>
                    <Button onClick={() => handleConfirmation(true)} style={{ color: 'red' }}>Supprimer</Button>
                </DialogActions>
            </Dialog>




            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            >
                <DialogTitle>Modifier les informations du stage</DialogTitle>
                <DialogContent>
                    
                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Etudiant' mb="5px">
                            Étudiant
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Étudiant"
                                value={selectedStage.no_etudiant}
                                onChange={(e) => setSelectedStage({ ...selectedStage, no_etudiant: e.target.value })}
                            >
                                {etudiants.map((etudiant) => (
                                    <MenuItem key={etudiant.no_etudiant} value={etudiant.no_etudiant}>
                                        {etudiant.nom_etudiant} {etudiant.prenom_etudiant}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Professeur' mb="5px">
                            Professeur
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Professeur"
                                value={selectedStage.no_professeur}
                                onChange={(e) => setSelectedStage({ ...selectedStage, no_professeur: e.target.value })}
                            >
                                {professeurs.map((professeur) => (
                                    <MenuItem key={professeur.no_professeur} value={professeur.no_professeur}>
                                        {professeur.nom_professeur} {professeur.prenom_professeur}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>



                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Encadrant' mb="5px">
                            Encadrant
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Encadrant"
                                value={selectedStage.no_encadrant}
                                onChange={(e) => setSelectedStage({ ...selectedStage, no_encadrant: e.target.value })}
                            >
                                {encadrants.map((encadrant) => (
                                    <MenuItem key={encadrant.no_encadrant} value={encadrant.no_encadrant}>
                                        {encadrant.nom_encadrant} {encadrant.prenom_encadrant}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='entreprise' mb="5px">
                            Entreprise
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Entreprise"
                                value={selectedStage.no_entreprise}
                                onChange={(e) => setSelectedStage({ ...selectedStage, no_entreprise: e.target.value })}
                            >
                                {entreprises.map((entreprise) => (
                                    <MenuItem key={entreprise.no_entreprise} value={entreprise.no_entreprise}>
                                        {entreprise.nom_entreprise}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Type' mb="5px">
                            Type
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Type"
                                value={selectedStage.no_type}
                                onChange={(e) => setSelectedStage({ ...selectedStage, no_type: e.target.value })}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.no_type} value={type.no_type}>
                                        {type.no_type} - Durée: {type.duree} months
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        label="Année"
                        variant="outlined"
                        value={formatDate(selectedStage.annee_de_stage)}
                        onChange={(e) => setSelectedStage({ ...selectedStage, annee_de_stage: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Compte Rendu"
                        variant="outlined"
                        value={selectedStage.appreciation_stage}
                        onChange={(e) => setSelectedStage({ ...selectedStage, appreciation_stage: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleEditStage(newStage);
                        setEditDialogOpen(false);
                    }} color="primary">
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>





            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
            >
                <DialogTitle>Ajouter un nouveau stage</DialogTitle>
                <DialogContent>
                

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Etudiant' mb="5px">
                            Étudiant
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Étudiant"
                                value={newStage.etudiant}
                                onChange={(e) => setNewStage({ ...newStage, etudiant: e.target.value })}
                            >
                                {etudiants.map((etudiant) => (
                                    <MenuItem key={etudiant.no_etudiant} value={etudiant.no_etudiant}>
                                        {etudiant.nom_etudiant} {etudiant.prenom_etudiant}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Professeur' mb="5px">
                            Professeur
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Professeur"
                                value={newStage.professeur}
                                onChange={(e) => setNewStage({ ...newStage, professeur: e.target.value })}
                            >
                                {professeurs.map((professeur) => (
                                    <MenuItem key={professeur.no_professeur} value={professeur.no_professeur}>
                                        {professeur.nom_professeur} {professeur.prenom_professeur}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>



                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Encadrant' mb="5px">
                            Encadrant
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Encadrant"
                                value={newStage.encadrant}
                                onChange={(e) => setNewStage({ ...newStage, encadrant: e.target.value })}
                            >
                                {encadrants.map((encadrant) => (
                                    <MenuItem key={encadrant.no_encadrant} value={encadrant.no_encadrant}>
                                        {encadrant.nom_encadrant} {encadrant.prenom_encadrant}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='entreprise' mb="5px">
                            Entreprise
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Entreprise"
                                value={newStage.entreprise}
                                onChange={(e) => setNewStage({ ...newStage, entreprise: e.target.value })}
                            >
                                {entreprises.map((entreprise) => (
                                    <MenuItem key={entreprise.no_entreprise} value={entreprise.no_entreprise}>
                                        {entreprise.nom_entreprise}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Type' mb="5px">
                            Type
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Type"
                                value={newStage.type}
                                onChange={(e) => setNewStage({ ...newStage, type: e.target.value })}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.no_type} value={type.no_type}>
                                        {type.no_type} - Durée: {type.duree} months
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        label="Année"
                        variant="outlined"
                        value={newStage.annee}
                        onChange={(e) => setNewStage({ ...newStage, annee: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Compte Rendu"
                        variant="outlined"
                        value={newStage.compteRendu}
                        onChange={(e) => setNewStage({ ...newStage, compteRendu: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleAddNewStage(newStage);
                        setAddDialogOpen(false);
                    }} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>


        </DashboardCard>
    );
};

export default StageList;
