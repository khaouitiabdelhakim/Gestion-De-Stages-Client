import React, { useState } from 'react';
import {
  Typography, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
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
    compteRendu: "Disponible",
},
{
    promotion: "2023",
    nomEtudiant: "Fatima Zahra Toufik",
    professeur: "Younes Berrada",
    encadrant: "Sara El Fassi",
    entreprise: "InnovMaroc",
    type: "2A-1",
    annee: "2023",
    compteRendu: "En attente",
},
{
    promotion: "2023",
    nomEtudiant: "Youssef Benali",
    professeur: "Nadia Amrani",
    encadrant: "Omar Mansouri",
    entreprise: "TechMaroc",
    type: "2A-2",
    annee: "2023",
    compteRendu: "En attente",
},
{
    promotion: "2023",
    nomEtudiant: "Khadija Mansouri",
    professeur: "Karim El Kadiri",
    encadrant: "Nora Cherif",
    entreprise: "InnoTechMaroc",
    type: "3A-1",
    annee: "2023",
    compteRendu: "Disponible",
},
{
    promotion: "2023",
    nomEtudiant: "Mohamed Bouzidi",
    professeur: "Loubna Fassi",
    encadrant: "Said El Mernissi",
    entreprise: "MarocInnov",
    type: "3A-2",
    annee: "2023",
    compteRendu: "En attente",
},
{
    promotion: "2023",
    nomEtudiant: "Amina El Hamidi",
    professeur: "Hicham Daoudi",
    encadrant: "Amal Abbassi",
    entreprise: "MarocSoft",
    type: "1A",
    annee: "2023",
    compteRendu: "Disponible",
},
{
    promotion: "2023",
    nomEtudiant: "Bilal Fassi",
    professeur: "Samira Ben Mansour",
    encadrant: "Karima El Gharbaoui",
    entreprise: "TechMaroc",
    type: "2A-1",
    annee: "2023",
    compteRendu: "En attente",
},
{
    promotion: "2023",
    nomEtudiant: "Safa Chakir",
    professeur: "Khalid El Alaoui",
    encadrant: "Fadwa Bouazza",
    entreprise: "InnovMaroc",
    type: "2A-2",
    annee: "2023",
    compteRendu: "En attente",
},
{
    promotion: "2023",
    nomEtudiant: "Mehdi Zerouali",
    professeur: "Rachid El Mounir",
    encadrant: "Leila El Mokhtar",
    entreprise: "MarocSoft",
    type: "3A-1",
    annee: "2023",
    compteRendu: "Disponible",
},
{
    promotion: "2023",
    nomEtudiant: "Houda Kabbaj",
    professeur: "Abdelali El Mansouri",
    encadrant: "Naima El Khattabi",
    entreprise: "InnoTechMaroc",
    type: "3A-2",
    annee: "2023",
    compteRendu: "En attente",
},
];

const StageList = () => {
    const [searchText, setSearchText] = useState('');
    const [promotionFilter, setPromotionFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [stageTypeFilter, setStageTypeFilter] = useState('');
    const [selectedStageIndex, setSelectedStageIndex] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const handleEditClick = (index) => {
        console.log("Modification pour l'index :", index);
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
        <DashboardCard title="Liste des Stages">
                      <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' , mb: 2 }}>
                <TextField
                    label="Rechercher"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: '30%', mr: 2 }}
                />
                <TextField
                    select
                    label="Promotion"
                    variant="outlined"
                    value={promotionFilter}
                    onChange={(e) => setPromotionFilter(e.target.value)}
                    sx={{ width: '20%' , mr: 2 }}
                >
                     {promotionOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Année"
                    variant="outlined"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    sx={{ width: '20%' , mr: 2 }}
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
                    sx={{ width: '20%'  , mr: 2}}
                >
                   <MenuItem value="1A">1A</MenuItem>
                    <MenuItem value="2A-1">2A-1</MenuItem>
                    <MenuItem value="2A-2">2A-2</MenuItem>
                    <MenuItem value="3A-1">3A-1</MenuItem>
                    <MenuItem value="3A-2">3A-2</MenuItem>
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
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Promotion</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Nom de l'Étudiant</Typography></TableCell>
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
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(index)}>
                                        <EditIcon style={{ color: 'green' }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(index)}>
                                        <DeleteIcon style={{ color: 'red' }} />
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
        </DashboardCard>
    );
};

export default StageList;
