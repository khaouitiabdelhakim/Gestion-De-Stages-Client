import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, RadioGroup, TextField, Radio, Select, MenuItem } from "@mui/material";
import axios from 'axios';
  

const UpdateEtudiant = ({etudiant}) => {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const convertToISOString = (formattedDateString) => {
        // Parse the formatted date string
        const parsedDate = new Date(formattedDateString);
      
        // Check if the parsing was successful
        if (!isNaN(parsedDate.getTime())) {
          // Convert the parsed date to ISO string format
          return parsedDate.toISOString();
        } else {
          // Handle invalid date strings (returning null in this case)
          console.error(`Invalid date string: ${formattedDateString}`);
          return null;
        }
      };
      

        const [nom, setNom] = useState(etudiant ? etudiant.nom : "");
        const [prenom, setPrenom] = useState(etudiant ? etudiant.prenom : "");
        const [dateNaissance, setDateNaissance] = useState(etudiant ? etudiant.dateNaissance : "");
        const [sexe, setSexe] = useState(etudiant ? etudiant.sexe : true);
        const [adresse, setAdresse] = useState(etudiant ? etudiant.adresse : "");
        const [telephone, setTelephone] = useState(etudiant ? etudiant.telephone : "");
        const [email, setEmail] = useState(etudiant ? etudiant.email : "");
        const [anneePromotion, setAnneePromotion] = useState(etudiant ? etudiant.anneePromotion : "");
        const [mention, setMention] = useState(etudiant ? etudiant.mention : "");
      

const ModifierEtudiant = async () => {
  const apiEndpoint = 'http://localhost:3500'; // Replace with your actual API endpoint
  const etudiantId = etudiant.no_etudiant;

  try {
    // Prepare the data for the PUT request
    const updatedStudentData = {
      nom_etudiant: nom,
      prenom_etudiant: prenom,
      date_naissance_etudiant: dateNaissance,
      sexe_etudiant: sexe,
      adresse_etudiant: adresse,
      telephone_etudiant: telephone,
      email_etudiant: email,
      annee_promotion: anneePromotion,
      mention_etudiant: mention,
    };

    // Log the updated data
    console.log('Données mises à jour :', updatedStudentData);

    // Send a PUT request to update the student data
    const putResponse = await axios.put(`${apiEndpoint}/etudiant/${etudiantId}`, updatedStudentData);

    if (putResponse.status === 200) {
      // Reset the state variables after the update
      setNom("");
      setPrenom("");
      setDateNaissance("");
      setSexe("");
      setAdresse("");
      setTelephone("");
      setEmail("");
      setAnneePromotion("");
      setMention("");

      handleClose();

      window.location.href = "/Students"
    } else {
      console.error('Erreur lors de la mise à jour :', putResponse.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error.message);
  }
};


    useEffect(() => {
        // Mettez à jour les champs lorsque l'étudiant change
        setNom(etudiant ? etudiant.nom_etudiant : "");
        setPrenom(etudiant ? etudiant.prenom_etudiant : "");
        setDateNaissance(etudiant ? etudiant.date_naissance_etudiant : "");
        setSexe(etudiant ? etudiant.sexe_etudiant : "");
        setAdresse(etudiant ? etudiant.adresse_etudiant : "");
        setTelephone(etudiant ? etudiant.telephone_etudiant : "");
        setEmail(etudiant ? etudiant.email_etudiant : "");
        setAnneePromotion(etudiant ? etudiant.annee_promotion : "");
        setMention(etudiant ? etudiant.mention_etudiant : "");
    }, [etudiant]);

    return (
        <>
            <Box>
                <Button
                    size="small"
                    onClick={handleShow}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#00FF00" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>                
                </Button>

            </Box>
              
            <Dialog open={showModal} onClose={handleClose}>
                <DialogTitle>Modifier un étudiant</DialogTitle>
                <DialogContent>
                    <Form>
                        <TextField
                            id="nom"
                            type="text"
                            variant="outlined"
                            fullWidth
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            label="Nom d'étudiant"
                            margin="normal"
                            className="mt-4"
                        />

                        <TextField
                            id="prenom"
                            type="text"
                            variant="outlined"
                            fullWidth
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            label="Prénom d'étudiant"
                            margin="normal"
                        />

                        <TextField
                            id="dateNaissance"
                            type="date"
                            variant="outlined"
                            fullWidth
                            placeholder="Date de Naissance"
                            value={dateNaissance}
                            onChange={(e) => setDateNaissance(e.target.value)}
                            label="Date de Naissance"
                            margin="normal"
                        />

                        <Box mt="13px" >
                            <label htmlFor="sexe" style={{ fontWeight: 600, marginRight: '5px', marginBottom: '5px' }}>
                                Sexe
                            </label>
                            <RadioGroup row value={sexe} onChange={(e) => setSexe(parseInt(e.target.value))}>
                                <FormControlLabel value={0} control={<Radio />} label="F" />
                                <FormControlLabel value={1} control={<Radio />} label="M" />
                            </RadioGroup>
                        </Box>

                        <TextField
                            id="adresse"
                            type="text"
                            variant="outlined"
                            fullWidth
                            placeholder="Adresse"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            label="Adresse"
                            margin="normal"
                        />

                        <TextField
                            id="telephone"
                            type="tel"
                            variant="outlined"
                            fullWidth
                            placeholder="05 00 00 00 00"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            label="Téléphone d'étudiant"
                            margin="normal"
                        />

                        <TextField
                            id="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            placeholder="xyz@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email d'étudiant"
                            margin="normal"
                        />

                        <TextField
                            id="anneePromotion"
                            type="number"
                            variant="outlined"
                            fullWidth
                            placeholder="Année de promotion"
                            value={anneePromotion}
                            onChange={(e) => setAnneePromotion(e.target.value)}
                            label="Année de promotion"
                            margin="normal"
                        />

                        <Box mt="10px">
                            <label htmlFor="mention" style={{ fontWeight: 600, marginBottom: '5px' }}>
                                Mention
                            </label>
                            <Select
                                id="mention"
                                value={mention}
                                onChange={(e) => setMention(e.target.value)}
                                displayEmpty
                                label="Mention"
                                margin="normal"
                                fullWidth
                            >
                                <MenuItem disabled>Choisir la Mention</MenuItem>
                                <MenuItem value="Assez-Bien">Assez-Bien</MenuItem>
                                <MenuItem value="Bien">Bien</MenuItem>
                                <MenuItem value="Très Bien">Très Bien</MenuItem>
                                <MenuItem value="Excellent">Excellent</MenuItem>
                            </Select>  
                        </Box>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button
                    color="primary"
                    variant="contained"
                    size="medium"
                    onClick={ModifierEtudiant}
                    >
                        Modifier
                    </Button>

                    <Button
                        color="warning"
                        variant="contained"
                        size="medium"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>       
        </>
    )
};

export default UpdateEtudiant;