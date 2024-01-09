import React, { useState } from 'react';
import {
  Typography, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const entreprises = [
  
    {
      nom: "MarocTech",
      formeJuridique: "SARL",
      telephone: "0521123456",
      adresse: "Rue Technologique, Casablanca",
      ville: "Casablanca",
      fax: "0521123457",
      contact: "Ahmed Zouhir",
      telephoneContact: "0654321098"
    },
    {
      nom: "InnovMaroc",
      formeJuridique: "SA",
      telephone: "0532123456",
      adresse: "Avenue de l'Innovation, Rabat",
      ville: "Rabat",
      fax: "0532123457",
      contact: "Fatima Zara",
      telephoneContact: "0665321098"
    },
    {
      nom: "TechMaroc",
      formeJuridique: "SARL",
      telephone: "0523323456",
      adresse: "Route Technologique, Tanger",
      ville: "Tanger",
      fax: "0523323457",
      contact: "Youssef Rahimi",
      telephoneContact: "0678321098"
    },
    {
      nom: "InnoTechMaroc",
      formeJuridique: "SA",
      telephone: "0534323456",
      adresse: "Boulevard de l'Innovation, Marrakech",
      ville: "Marrakech",
      fax: "0534323457",
      contact: "Sara El Mansouri",
      telephoneContact: "0654321898"
    },
    {
      nom: "MarocInnov",
      formeJuridique: "SARL",
      telephone: "0525323456",
      adresse: "Avenue de l'Innovation, Fès",
      ville: "Fès",
      fax: "0525323457",
      contact: "Karim Ait Baha",
      telephoneContact: "0612321098"
    },
    {
      nom: "InnoMarocTech",
      formeJuridique: "SA",
      telephone: "0536323456",
      adresse: "Route Technologique, Agadir",
      ville: "Agadir",
      fax: "0536323457",
      contact: "Nadia El Ghazali",
      telephoneContact: "0698321098"
    },
    {
      nom: "MarocSoft",
      formeJuridique: "SARL",
      telephone: "0527323456",
      adresse: "Avenue SoftTech, Témara",
      ville: "Témara",
      fax: "0527323457",
      contact: "Ali Chaoui",
      telephoneContact: "0678321098"
    },
    {
      nom: "SoftMaroc",
      formeJuridique: "SA",
      telephone: "0537323456",
      adresse: "Boulevard SoftTech, El Jadida",
      ville: "El Jadida",
      fax: "0537323457",
      contact: "Saida El Kabbaj",
      telephoneContact: "0618321098"
    },
    {
      nom: "MarocInnoSoft",
      formeJuridique: "SARL",
      telephone: "0528323456",
      adresse: "Rue de l'Innovation, Oujda",
      ville: "Oujda",
      fax: "0528323457",
      contact: "Yassine El Hamdi",
      telephoneContact: "0691321098"
    },
    {
      nom: "SoftInnovMaroc",
      formeJuridique: "SA",
      telephone: "0538323456",
      adresse: "Avenue de l'Innovation, Meknès",
      ville: "Meknès",
      fax: "0538323457",
      contact: "Samira El Kadiri",
      telephoneContact: "0619321098"
    }
  ];
  
  


  const EntrepriseList = () => {
    const [searchText, setSearchText] = useState('');
    const [entrepriseVilleFilter, setentrepriseVilleFilter] = useState('');
    const [selectedentrepriseIndex, setSelectedentrepriseIndex] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedentreprise, setSelectedentreprise] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newentreprise, setNewentreprise] = useState({
      nom: '',
      formeJuridique: '',
      telephone: '',
      adresse: '',
      ville: '',
      fax: '',
      contact: '',
      telephoneContact: ''
    });

    const handleAddentreprise = () => {
      setSelectedentreprise(null);
      setAddDialogOpen(true);
  };
    const handleAddNewentreprise = (newentreprise) => {
      // Ajouter la logique pour ajouter le nouveau entreprise à votre tableau de entreprises
      // newentreprise contiendra les informations du nouveau entreprise provenant du formulaire
      // setentreprises([...entreprises, newentreprise]);
      setAddDialogOpen(false);
  };

    const handleEditClick = (index) => {
      setSelectedentreprise(entreprises[index]);
      setSelectedentrepriseIndex(index);
      setEditDialogOpen(true);
    };
    const handleEditentreprise = (updatedentreprise) => {
      const updatedentreprises = [...entreprises];
      updatedentreprises[selectedentrepriseIndex] = updatedentreprise;
      // Mettre à jour l'état des entreprises avec les informations modifiées
      // setentreprises(updatedentreprises);
    };

  

    const handleDeleteClick = (index) => {
      setSelectedentrepriseIndex(index);
      setConfirmationDialogOpen(true);
  };
  const handleConfirmation = (confirmed) => {
    if (confirmed && selectedentrepriseIndex !== null) {
        // Supprimer le entreprise du tableau ici
        const updatedentreprises = [...entreprises];
        updatedentreprises.splice(selectedentrepriseIndex, 1);
        // Mise à jour de l'état des entreprises
        // setentreprises(updatedentreprises);
    }

    setConfirmationDialogOpen(false);
    setSelectedentrepriseIndex(null);
};
    const filteredentreprises = entreprises.filter(entreprise => {
        const searchMatch = (
            entreprise.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.formeJuridique.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.telephone.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.adresse.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.ville.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.fax.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.telephoneContact.toLowerCase().includes(searchText.toLowerCase())
        );

        
        const entrepriseVilleMatch = !entrepriseVilleFilter || entreprise.ville === entrepriseVilleFilter;

        return searchMatch && entrepriseVilleMatch;
    });
    

    return (
      <DashboardCard
            title="Liste des entreprises"
            action={
                <Button variant="outlined" onClick={handleAddentreprise} style={{ backgroundColor: 'green', color: 'white' }}>
                    Ajouter entreprise
                </Button>
            }> 

      
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
                    label="Ville"
                    variant="outlined"
                    value={entrepriseVilleFilter}
                    onChange={(e) => setentrepriseVilleFilter(e.target.value)}
                    sx={{ width: '20%'  , mr: 2}}
                >
                    <MenuItem key="Casablanca" value="Casablanca">Casablanca</MenuItem>
                    <MenuItem key="Rabat" value="Rabat">Rabat</MenuItem>
                    <MenuItem key="Fès" value="Fès">Fès</MenuItem>
                    <MenuItem key="Marrakech" value="Marrakech">Marrakech</MenuItem>
                    <MenuItem key="Tanger" value="Tanger">Tanger</MenuItem>
                    <MenuItem key="Agadir" value="Agadir">Agadir</MenuItem>
                    <MenuItem key="Meknès" value="Meknès">Meknès</MenuItem>
                    <MenuItem key="Oujda" value="Oujda">Oujda</MenuItem>
                    <MenuItem key="El Jadida" value="El Jadida">El Jadida</MenuItem>
                    <MenuItem key="Témara" value="Témara">Témara</MenuItem>
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
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>nom</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>forme Juridique</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>telephone</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>adresse</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>ville</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>fax</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>contact</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>telephone Contact</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredentreprises.map((entreprise, index) => (
                            <TableRow key={index}>
                                <TableCell>{entreprise.nom}</TableCell>
                                <TableCell>{entreprise.formeJuridique}</TableCell>
                                <TableCell>{entreprise.telephone}</TableCell>
                                <TableCell>{entreprise.adresse}</TableCell>
                                <TableCell>{entreprise.ville}</TableCell>
                                <TableCell>{entreprise.fax}</TableCell>
                                <TableCell>{entreprise.contact}</TableCell>
                                <TableCell>{entreprise.telephoneContact}</TableCell>
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
                    <Typography>Êtes-vous sûr de vouloir supprimer ce entreprise ?</Typography>
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
    <DialogTitle>Modifier les informations de l'entreprise</DialogTitle>
    <DialogContent>
      <TextField
        label="Nom"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.nom : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, nom: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Forme Juridique"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.formeJuridique : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, formeJuridique: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Téléphone"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.telephone : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, telephone: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Adresse"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.adresse : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, adresse: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ville"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.ville : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, ville: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fax"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.fax : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, fax: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.contact : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, contact: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Téléphone de Contact"
        variant="outlined"
        value={selectedentreprise ? selectedentreprise.telephoneContact : ''}
        onChange={(e) => setSelectedentreprise({ ...selectedentreprise, telephoneContact: e.target.value })}
        fullWidth
        margin="normal"
      />
      {/* Ajoute d'autres champs si nécessaire */}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setEditDialogOpen(false)} color="primary">
        Annuler
      </Button>
      <Button onClick={() => {
        handleEditentreprise(selectedentreprise);
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
    <DialogTitle>Ajouter une nouvelle entreprise</DialogTitle>
    <DialogContent>
      <TextField
        label="Nom"
        variant="outlined"
        value={newentreprise.nom}
        onChange={(e) => setNewentreprise({ ...newentreprise, nom: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Forme Juridique"
        variant="outlined"
        value={newentreprise.formeJuridique}
        onChange={(e) => setNewentreprise({ ...newentreprise, formeJuridique: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Téléphone"
        variant="outlined"
        value={newentreprise.telephone}
        onChange={(e) => setNewentreprise({ ...newentreprise, telephone: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Adresse"
        variant="outlined"
        value={newentreprise.adresse}
        onChange={(e) => setNewentreprise({ ...newentreprise, adresse: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ville"
        variant="outlined"
        value={newentreprise.ville}
        onChange={(e) => setNewentreprise({ ...newentreprise, ville: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fax"
        variant="outlined"
        value={newentreprise.fax}
        onChange={(e) => setNewentreprise({ ...newentreprise, fax: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact"
        variant="outlined"
        value={newentreprise.contact}
        onChange={(e) => setNewentreprise({ ...newentreprise, contact: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Téléphone de Contact"
        variant="outlined"
        value={newentreprise.telephoneContact}
        onChange={(e) => setNewentreprise({ ...newentreprise, telephoneContact: e.target.value })}
        fullWidth
        margin="normal"
      />
      {/* Ajoute d'autres champs si nécessaire */}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setAddDialogOpen(false)} color="primary">
        Annuler
      </Button>
      <Button onClick={() => {
        handleAddNewentreprise(newentreprise);
        setAddDialogOpen(false);
      }} color="primary">
        Ajouter
      </Button>
    </DialogActions>
  </Dialog>



        </DashboardCard>
    );
};

export default EntrepriseList;
