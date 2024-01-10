import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




const StageList = () => {

  const [stages, change_stages]  = useState([]) ;

    useEffect(() => {
        axios.get('http://localhost:3500/stage/recent')
          .then(response => { change_stages(response.data)
            console.log('recent stages',response.data) })
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
    const [newStage, setNewStage] = useState({
      promotion: '',
      nomEtudiant: '',
      // Ajoute les autres champs ici avec leurs valeurs initiales
    });

    
    const handleAddNewStage = (newStage) => {
      // Ajouter la logique pour ajouter le nouveau stage à votre tableau de stages
      // newStage contiendra les informations du nouveau stage provenant du formulaire
      // setStages([...stages, newStage]);
      setAddDialogOpen(false);
  };
  const handleSeeMore = () => {
    // Action à exécuter lorsque l'utilisateur veut voir plus de stages
    // Vous pouvez implémenter la logique pour charger plus de stages ici
    // Par exemple, vous pouvez paginer les données et afficher la page suivante ou charger plus de données depuis une API, etc.
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

  
    const formatDate = (dateString) => {
      const options = { year: 'numeric'};
      return new Date(dateString).toLocaleDateString('en-US', options);
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



  const handleVoirPlusClick = () => {
    // Redirect to the /stage route
  
  };
    

    const yearOptions = [];
    for (let year = 2000; year <= 2023; year++) {
        yearOptions.push(year.toString());
    }

    return (
      <DashboardCard
            title="Nouveaux Stages"
            action={
                <Button variant="outlined" onClick={handleVoirPlusClick} style={{ backgroundColor: 'blue', color: 'white' }}>
                    Voir plus
                </Button>
            }> 

      

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
    <TextField
      label="Promotion"
      variant="outlined"
      value={selectedStage ? selectedStage.promotion : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, promotion: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nom de l'Étudiant"
      variant="outlined"
      value={selectedStage ? selectedStage.nomEtudiant : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, nomEtudiant: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Professeur"
      variant="outlined"
      value={selectedStage ? selectedStage.professeur : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, professeur: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Encadrant"
      variant="outlined"
      value={selectedStage ? selectedStage.encadrant : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, encadrant: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Entreprise"
      variant="outlined"
      value={selectedStage ? selectedStage.entreprise : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Type"
      variant="outlined"
      value={selectedStage ? selectedStage.type : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, type: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Année"
      variant="outlined"
      value={selectedStage ? selectedStage.annee : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, annee: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Compte Rendu"
      variant="outlined"
      value={selectedStage ? selectedStage.compteRendu : ''}
      onChange={(e) => setSelectedStage({ ...selectedStage, compteRendu: e.target.value })}
      fullWidth
      margin="normal"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditDialogOpen(false)} color="primary">
      Annuler
    </Button>
    <Button onClick={() => {
      handleEditStage(selectedStage);
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
    <TextField
      label="Promotion"
      variant="outlined"
      value={newStage.promotion}
      onChange={(e) => setNewStage({ ...newStage, promotion: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nom de l'Étudiant"
      variant="outlined"
      value={newStage.nomEtudiant}
      onChange={(e) => setNewStage({ ...newStage, nomEtudiant: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Professeur"
      variant="outlined"
      value={newStage.professeur}
      onChange={(e) => setNewStage({ ...newStage, professeur: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Encadrant"
      variant="outlined"
      value={newStage.encadrant}
      onChange={(e) => setNewStage({ ...newStage, encadrant: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Entreprise"
      variant="outlined"
      value={newStage.entreprise}
      onChange={(e) => setNewStage({ ...newStage, entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Type"
      variant="outlined"
      value={newStage.type}
      onChange={(e) => setNewStage({ ...newStage, type: e.target.value })}
      fullWidth
      margin="normal"
    />
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
