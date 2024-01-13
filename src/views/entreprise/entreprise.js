import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


  
  
  
  


  const EntrepriseList = () => {


    const [entreprises, change]  = useState([]) ;

    useEffect(() => {
      axios.get('http://localhost:3500/entreprise')
        .then(response => change(response.data))
        .catch(error => console.error('Error fetching notes', error));
    }, []);

    const [searchText, setSearchText] = useState('');
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
    

 

const handleAddNewentreprise = async (newentreprise) => {
  try {
    // Create a new JSON object from the form data
    const entrepriseData = {
      nom_entreprise: newentreprise.nom,
      forme_juridique: newentreprise.formeJuridique,
      telephone_contact_entreprise: newentreprise.telephoneContact,
      adresse_entreprise: newentreprise.adresse,
      telephone_entreprise: newentreprise.telephone,
      fax_entreprise: newentreprise.fax,
      contact_entreprise: newentreprise.contact,
    };

    // Send a POST request to create a new enterprise
    const response = await axios.post('http://localhost:3500/entreprise', entrepriseData);

    // Assuming the server returns the created enterprise
    const createdEnterprise = response.data;

    // Update the state with the created enterprise
    change([...entreprises, createdEnterprise]);

    // Close the add dialog
    setAddDialogOpen(false);

    window.location.href = "/entreprise"
  } catch (error) {
    console.error('Error creating new enterprise', error);
    // Handle error, show a message to the user, etc.
  }
};


const handleEditClick = (index) => {
  setSelectedentreprise(entreprises[index]);
  setSelectedentrepriseIndex(index);
  setEditDialogOpen(true);
};

const handleEditentreprise = async (updatedentreprise) => {
  try {
    console.log('Updated Enterprise Object:', updatedentreprise);
    const updatedEnterpriseData = updatedentreprise

    // Send a PUT request to update the enterprise on the server
    await axios.put(`http://localhost:3500/entreprise/${updatedentreprise.no_entreprise}`, updatedEnterpriseData);

    // Update the state with the modified enterprise
    const updatedentreprises = [...entreprises];
    updatedentreprises[selectedentrepriseIndex] = updatedentreprise;
    change(updatedentreprises);

    // Close the edit dialog
    setEditDialogOpen(false);
    window.location.href = "/entreprise"
  } catch (error) {
    console.error('Error updating enterprise', error);
    // Handle error, show a message to the user, etc.
  }
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
            entreprise.nom_entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.forme_juridique.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.telephone_entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.adresse_entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.fax_entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.contact_entreprise.toLowerCase().includes(searchText.toLowerCase()) ||
            entreprise.telephone_contact_entreprise.toLowerCase().includes(searchText.toLowerCase())
        );

        return searchMatch ;
    });
    

    return (
      <DashboardCard
            title="Liste des entreprises"
            action={
                <Button variant="outlined" onClick={handleAddentreprise} color='primary'>
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
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>fax</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>contact</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>telephone Contact</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" fontWeight={600}>Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredentreprises.map((entreprise, index) => (
                            <TableRow key={index}>
                                <TableCell>{entreprise.nom_entreprise}</TableCell>
                                <TableCell>{entreprise.forme_juridique}</TableCell>
                                <TableCell>{entreprise.telephone_entreprise}</TableCell>
                                <TableCell>{entreprise.adresse_entreprise}</TableCell>
                                <TableCell>{entreprise.fax_entreprise}</TableCell>
                                <TableCell>{entreprise.contact_entreprise}</TableCell>
                                <TableCell>{entreprise.telephone_contact_entreprise}</TableCell>
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
      value={selectedentreprise ? selectedentreprise.nom_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, nom_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Forme Juridique"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.forme_juridique : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, forme_juridique: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Téléphone"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.telephone_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, telephone_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Adresse"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.adresse_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, adresse_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Fax"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.fax_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, fax_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Contact"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.contact_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, contact_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Téléphone de Contact"
      variant="outlined"
      value={selectedentreprise ? selectedentreprise.telephone_contact_entreprise : ''}
      onChange={(e) => setSelectedentreprise({ ...selectedentreprise, telephone_contact_entreprise: e.target.value })}
      fullWidth
      margin="normal"
    />
    {/* Add other fields if necessary */}
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
