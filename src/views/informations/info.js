import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDialog from './addDialog';
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


import {
    Typography, Select, FormControl, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };

    
    const [associations, setAssocierData] = useState([]);
    const [exigences, setExigerData] = useState([]);
    const [competences, setCompetenceData] = useState([]);

    useEffect(() => {
        // Fetch associerData
        axios.get('http://localhost:3500/associer')
            .then(response => setAssocierData(response.data))
            .catch(error => console.error('Error fetching associerData', error));

        // Fetch exigerData
        axios.get('http://localhost:3500/exiger')
            .then(response => setExigerData(response.data))
            .catch(error => console.error('Error fetching exigerData', error));

        // Fetch competenceData
        axios.get('http://localhost:3500/competence')
            .then(response => setCompetenceData(response.data))
            .catch(error => console.error('Error fetching competenceData', error));
    }, []);

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


    




    const [searchText, setSearchText] = useState('');
    const [promotionFilter, setPromotionFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [stageTypeFilter, setStageTypeFilter] = useState('');
    const [selectedStageIndex, setSelectedStageIndex] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);






    // adding new compentence
    const [addNewCompetenceDialogOpen, setAddNewCompetenceDialogOpen] = useState(false);
    const [newCompetence, setnewCompetence] = useState({
        id: '',
        libelleCompetence: '',
        descriptionCompetence: '',
    });

    const handleAddCompetence = () => {
        setAddNewCompetenceDialogOpen(true);
    };
    const handleAddNewCompetence = async (newCompetence) => {
        try {
            const competenceData = {
                no_competence: newCompetence.id,
                description: newCompetence.descriptionCompetence,
                libelle: newCompetence.libelleCompetence
            };

            console.log('Competence data sent to backend:', competenceData);

            // Now you can use competenceData in your API call
            fetch('http://localhost:3500/competence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(competenceData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from backend:', data);

                    // If needed, you can take other actions here
                    // For example, update the state or perform additional logic

                    // If needed, you can clear the form or take other actions here
                    // setAddDialogOpen(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };









    // adding new exigence
    const [addNewExigenceDialogOpen, setAddNewExigenceDialogOpen] = useState(false);
    const [newExigence, setNewExigence] = useState({
        type: '',
        competence: '',
        level: '',
    });

    const handleAddExigence = () => {
        setAddNewExigenceDialogOpen(true);
    };

    const handleAddNewExigence = async (newExigence) => {
        try {
            const exigenceData = {
                no_type: newExigence.type,
                no_competence: newExigence.competence,
                niveau_exige: newExigence.level
            };

            console.log('Exigence data sent to backend:', exigenceData);

            // Now you can use exigenceData in your API call
            fetch('http://localhost:3500/exiger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exigenceData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from backend:', data);

                    // If needed, you can take other actions here
                    // For example, update the state or perform additional logic

                    // If needed, you can clear the form or take other actions here
                    // setAddDialogOpen(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };





    // adding new stage
    const [addNewStageDialogOpen, setAddNewStageDialogOpen] = useState(false);
    const [newStage, setNewStage] = useState({
        no_type: '',
        duree: '',
    });

    const handleAddStage = () => {
        setAddNewStageDialogOpen(true);
    };

    const handleAddNewStage = async (newStage) => {
        try {
            const stageData = {
                no_type: newStage.no_type,
                duree: newStage.duree,
            };

            console.log('Stage data sent to backend:', stageData);

            // Now you can use stageData in your API call
            fetch('http://localhost:3500/type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stageData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from backend:', data);

                    // If needed, you can take other actions here
                    // For example, update the state or perform additional logic

                    // If needed, you can clear the form or take other actions here
                    // setAddDialogOpen(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };



    // adding new association
const [addNewAssociationDialogOpen, setAddNewAssociationDialogOpen] = useState(false);
const [newAssociation, setNewAssociation] = useState({
    annee: '',
    no_type: '',
    date_debut: '',
    date_fin: '',
});

const handleAddAssociation = () => {
    setAddNewAssociationDialogOpen(true);
};

const handleAddNewAssociation = async (newAssociation) => {
    try {
        const associationData = {
            annee: newAssociation.annee,
    no_type: newAssociation.no_type,
    date_debut: newAssociation.date_debut,
    date_fin: newAssociation.date_fin,
            
        };

        console.log('Association data sent to backend:', associationData);

        // Now you can use associationData in your API call
        fetch('http://localhost:3500/associer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(associationData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);

            // If needed, you can take other actions here
            // For example, update the state or perform additional logic

            // If needed, you can clear the form or take other actions here
            // setAddDialogOpen(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
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
                title="Dates des satges"
                action={
                    <Button onClick={handleAddAssociation} style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                        Ajouter
                    </Button>
                }
            >
                {/* Table for associations */}
                <Box backgroundColor="#f0f0f0">
                    <Table aria-label="associerData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                {/* Adjust the headers based on your associerData properties */}
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Année</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Type Stage</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Date Début</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Date Fin</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {associations.map((data, index) => (
                                <TableRow key={index}>
                                    {/* Adjust the cells based on your associerData properties */}
                                    <TableCell>{data.annee}</TableCell>
                                    <TableCell>{data.no_type}</TableCell>
                                    <TableCell>{formatDate(data.date_debut)}</TableCell>
                                    <TableCell>{formatDate(data.date_fin)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>

            {/* Box 2: Type Data */}
            <DashboardCard
                title="Durées des stages"
                action={
                    <Button onClick={handleAddStage} style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                        Ajouter
                    </Button>
                }
            >
                {/* Table for associations */}
                <Box backgroundColor="#c9c9c9">
                    <Table aria-label="typeData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                {/* Adjust the headers based on your typeData properties */}
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Type ID</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Duration</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {types.map((data, index) => (
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
                title="Exigences des  Stages"
                action={
                    <Button onClick={handleAddExigence} style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                        Ajouter
                    </Button>
                }
            >
                {/* Table for associations */}
                <Box backgroundColor="#f0f0f0">
                    <Table aria-label="exigerData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                {/* Adjust the headers based on your exigerData properties */}
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Type</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Competence</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Exigence</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exigences.map((data, index) => (
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
                title="Competences"
                action={
                    <Button onClick={handleAddCompetence} style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                        Ajouter
                    </Button>
                }
            >
                {/* Table for associations */}
                <Box backgroundColor="#c9c9c9">
                    <Table aria-label="competenceData table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Competence ID</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Libelle</Typography></TableCell>
                                <TableCell><Typography variant="subtitle1" fontWeight={600}>Description</Typography></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {competences.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{data.no_competence}</TableCell>
                                    <TableCell>{data.libelle}</TableCell>
                                    <TableCell>{data.description}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>




            <Dialog
                open={addNewAssociationDialogOpen}
                onClose={() => setAddNewAssociationDialogOpen(false)}
            >
                <DialogTitle>Ajouter une période des stages</DialogTitle>
                <DialogContent>


                <TextField
                        label="Année"
                        variant="outlined"
                        value={newAssociation.annee}
                        onChange={(e) => setNewAssociation({ ...newAssociation, annee: e.target.value })}
                        fullWidth
                        margin="normal"
                    />

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Type' mb="5px">
                            Type Stage
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Type Stage"
                                value={newAssociation.no_type}
                                onChange={(e) => setNewAssociation({ ...newAssociation, no_type: e.target.value })}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.no_type} value={type.no_type}>
                                        {type.no_type} - {type.duree} months
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
    <Typography variant="subtitle3" fontWeight={600} component="label" htmlFor='dateDebut' mb="5px">Date de Début</Typography>
    <CustomTextField 
        id="dateDebut" 
        type="date" 
        variant="outlined" 
        fullWidth 
        placeholder="Date de Début" 
        value={newAssociation.date_debut}
        onChange={(e) => setNewAssociation({ ...newAssociation, date_debut: e.target.value })} />
</Box>

<Box mt="25px">
    <Typography variant="subtitle3" fontWeight={600} component="label" htmlFor='dateFin' mb="5px">Date de Fin</Typography>
    <CustomTextField 
        id="dateFin" 
        type="date" 
        variant="outlined" 
        fullWidth 
        placeholder="Date de Fin" 
        value={newAssociation.date_fin}
        onChange={(e) => setNewAssociation({ ...newAssociation, date_fin: e.target.value })} />
</Box>



                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddNewAssociationDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleAddNewAssociation(newAssociation);
                        setAddNewAssociationDialogOpen(false);
                    }} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>




            <Dialog
                open={addNewCompetenceDialogOpen}
                onClose={() => setAddNewCompetenceDialogOpen(false)}
            >
                <DialogTitle>Ajouter une nouvelle competence</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Competence ID"
                        variant="outlined"
                        value={newCompetence.id}
                        onChange={(e) => setnewCompetence({ ...newCompetence, id: e.target.value })}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Libelle"
                        variant="outlined"
                        value={newCompetence.libelleCompetence}
                        onChange={(e) => setnewCompetence({ ...newCompetence, libelleCompetence: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={newCompetence.descriptionCompetence}
                        onChange={(e) => setnewCompetence({ ...newCompetence, descriptionCompetence: e.target.value })}
                        fullWidth
                        multiline  // Enables multiline input
                        rows={5}    // Specifies the number of rows
                        margin="normal"
                    />


                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setAddNewCompetenceDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleAddNewCompetence(newCompetence);
                        setAddNewCompetenceDialogOpen(false);
                    }} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>




            <Dialog
                open={addNewExigenceDialogOpen}
                onClose={() => setAddNewExigenceDialogOpen(false)}
            >
                <DialogTitle>Ajouter une nouvelle exigence</DialogTitle>
                <DialogContent>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Type' mb="5px">
                            Type Stage
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Type Stage"
                                value={newExigence.type}
                                onChange={(e) => setNewExigence({ ...newExigence, type: e.target.value })}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.no_type} value={type.no_type}>
                                        {type.no_type} - {type.duree} months
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='Competence' mb="5px">
                            Competence
                        </Typography>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <Select
                                label="Competence"
                                value={newExigence.competence}
                                onChange={(e) => setNewExigence({ ...newExigence, competence: e.target.value })}
                            >
                                {competences.map((type) => (
                                    <MenuItem key={type.no_competence} value={type.no_competence}>
                                        {type.no_competence}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <TextField
                        label="Niveau exigé"
                        variant="outlined"
                        value={newExigence.level}
                        onChange={(e) => setNewExigence({ ...newExigence, level: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddNewExigenceDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleAddNewExigence(newExigence);
                        setAddNewExigenceDialogOpen(false);
                    }} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={addNewStageDialogOpen}
                onClose={() => setAddNewStageDialogOpen(false)}
            >
                <DialogTitle>Ajouter un nouveau Type de stages</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Stage ID"
                        variant="outlined"
                        value={newStage.no_type}
                        onChange={(e) => setNewStage({ ...newStage, no_type: e.target.value })}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Durée"
                        variant="outlined"
                        value={newStage.duree}
                        onChange={(e) => setNewStage({ ...newStage, duree: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setAddNewStageDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        handleAddNewStage(newStage);
                        setAddNewStageDialogOpen(false);
                    }} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default Info;
