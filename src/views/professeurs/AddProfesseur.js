import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";


function AddProfesseur(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [sexe, setSexe] = useState();
    const [dateEmbauche, setDateEmbauche] = useState("");
    const [dateDepart, setDateDepart] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");

    const ajouterProfesseur = () => {
        const professeurData = {
            nom_professeur: nom,
            prenom_professeur: prenom,
            date_naissance_professeur: dateNaissance || null,
            sexe_professeur: sexe,
            date_embauche_professeur: dateEmbauche || null,
            date_depart_professeur: dateDepart || null,
            email_professeur: email,
            telephone_professeur: telephone,
            adresse_professeur: adresse,
        };
    
        fetch('http://localhost:3500/professeur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(professeurData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
    
            setNom("");
            setPrenom("");
            setDateNaissance("");
            setSexe(true);
            setDateEmbauche("");
            setDateDepart("");
            setEmail("");
            setTelephone("");
            setAdresse("");
            handleClose();

            window.location.href = "/Professeurs"
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    
    //Add function
    return(
        <>
            <Box style={{ textAlign: 'right' }}>
                <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    onClick={handleShow}
                    primary
                >
                    Ajouter Professeur
                </Button>
            </Box>


            {/* Modal */}

            <Dialog open={show} onClose={handleClose} fullWidth>
                <DialogTitle>Ajouter un Professeur</DialogTitle>
                <DialogContent>
                    <Form>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="nom"
                            label="Nom de professeur"
                            variant="outlined"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            mb={2}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="prenom"
                            label="Prénom de professeur"
                            variant="outlined"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            mb={2}
                        />

                        <Box className="mt-3">
                            <Typography
                                variant="subtitle3"
                                fontWeight={600}
                                component="label"
                                htmlFor="dateNaissance"
                                mb="5px"
                            >
                                Date de Naissance
                            </Typography>
                            <TextField
                                fullWidth
                                id="dateNaissance"
                                type="date"
                                variant="outlined"
                                value={dateNaissance}
                                onChange={(e) => setDateNaissance(e.target.value)}
                                mb={2}
                            />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle4" fontWeight={600} component="label" htmlFor='sexe' mb="5px"><span className="me-5">Sexe</span></Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row value={sexe} onChange={(e) => setSexe(parseInt(e.target.value))}>
                                    <FormControlLabel value={0} control={<Radio />} label="F" />
                                    <FormControlLabel value={1} control={<Radio />} label="M" />
                                </RadioGroup>
                            </FormControl>                        
                        </Box>
                    
                        <Box mt="20px">
                            <Typography variant="subtitle8" fontWeight={600} component="label" htmlFor='dateEmbauche' mb="5px">Date d'embauche</Typography>
                            <TextField
                                margin="normal"
                                className="mt-0"
                                fullWidth
                                id="dateEmbauche"
                                type="date"
                                variant="outlined"
                                value={dateEmbauche}
                                onChange={(e) => setDateEmbauche(e.target.value)}
                                mb={2}
                            />
                        </Box>
                        
                        <Box mt="25px">
                            <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='dateDepart' mb="5px">Date de départ</Typography>
                            <TextField
                                margin="normal"
                                className="mt-0"
                                fullWidth
                                id="dateDepart"
                                type="date"
                                variant="outlined"
                                value={dateDepart}
                                onChange={(e) => setDateDepart(e.target.value)}
                            />
                        </Box>

                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            placeholder="xyz@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            mb={2}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="telephone"
                            label="Téléphone"
                            type="tel"
                            variant="outlined"
                            placeholder="06 11 22 33 44"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            mb={2}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="adresse"
                            label="Adresse"
                            type="text"
                            variant="outlined"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            mb={2}
                        />
                </Form>
                </DialogContent>
                <DialogActions>
                    <Button
                    color="warning"
                    // style={{ backgroundColor: '#774ef2', color: 'white' }} 
                    variant="contained"
                    size="large"
                    onClick={ajouterProfesseur}
                    >
                        Ajouter 
                    </Button>
                    <Button
                        color="warning"
                        // style={{ backgroundColor: '#f0737d', color: 'white' }} 
                        variant="contained"
                        size="large"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>



        </>
    )


}


export default AddProfesseur;