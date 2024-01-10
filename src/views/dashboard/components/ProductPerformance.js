import React, { useState } from 'react';
import {
  Typography, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const stages = [
  {
    promotion: "2023",
    nomEtudiant: "Ahmed El Amrani",
    professeur: "Hassan Moussaoui",
    encadrant: "Amina Zidane",
    entreprise: "MarocTech",
    type: "1A",
    annee: "2023",
    compteRendu: "Bien",
},
{
    promotion: "2023",
    nomEtudiant: "Fatima Zahra Toufik",
    professeur: "Younes Berrada",
    encadrant: "Sara El Fassi",
    entreprise: "InnovMaroc",
    type: "2A-1",
    annee: "2023",
    compteRendu: "Trés Bien",
},
{
    promotion: "2023",
    nomEtudiant: "Youssef Benali",
    professeur: "Nadia Amrani",
    encadrant: "Omar Mansouri",
    entreprise: "TechMaroc",
    type: "2A-2",
    annee: "2023",
    compteRendu: "Bien",
},

];

const StageList = () => {
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
        const searchMatch = (
            stage.promotion.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.nomEtudiant.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.professeur.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.encadrant.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.type.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.annee.toLowerCase().includes(searchText.toLowerCase()) ||
            stage.compteRendu.toLowerCase().includes(searchText.toLowerCase())
        );

        const promotionMatch = !promotionFilter || stage.promotion === promotionFilter;
        const yearMatch = !yearFilter || stage.annee === yearFilter;
        const stageTypeMatch = !stageTypeFilter || stage.type === stageTypeFilter;

        return searchMatch && promotionMatch && yearMatch && stageTypeMatch;
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
            title="Nouveaux Stages"
            action={
                <Button variant="outlined" onClick={handleAddStage} style={{ backgroundColor: 'blue', color: 'white' }}>
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
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Promotion</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Nom de l'Étudiant</Typography></TableCell>
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
                                <TableCell>{stage.promotion}</TableCell>
                                <TableCell>{stage.nomEtudiant}</TableCell>
                                <TableCell>{stage.professeur}</TableCell>
                                <TableCell>{stage.encadrant}</TableCell>
                                <TableCell>{stage.entreprise}</TableCell>
                                <TableCell>
                                    {stage.type === "1A" && (
                                        <Chip label="1A" color="primary" />
                                    )}
                                    {stage.type === "2A-1" && (
                                        <Chip label="2A-1" color="secondary" />
                                    )}
                                    {stage.type === "2A-2" && (
                                        <Chip label="2A-2" color="error" />
                                    )}
                                    {stage.type === "3A-1" && (
                                        <Chip label="3A-1" color="success" />
                                    )}
                                    {stage.type === "3A-2" && (
                                        <Chip label="3A-2" color="warning" />
                                    )}
                                </TableCell>
                                <TableCell>{stage.annee}</TableCell>
                                <TableCell>{stage.compteRendu}</TableCell>
                                
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
