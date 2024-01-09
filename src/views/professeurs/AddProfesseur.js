import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


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
        // API : fetch('/api/ajouterEtudiant', { method: 'POST', body: { nom, prenom, ... } })
        console.log("Données à ajouter :", {
            nom_professeur: nom,
            prenom_professeur: prenom,
            date_naissance_professeur: dateNaissance,
            sexe_professeur: sexe,
            date_embauche_professeur: dateEmbauche,
            date_depart_professeur: dateDepart,
            email_professeur: email,
            telephone_professeur: telephone,
            adresse_professeur: adresse,
        }); 

        // Réinitialiser les champs après l'ajout
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
    };

    //Add function
    return(
        <>
            <Box style={{ textAlign: 'right' }}>
                <Button
                    color="primary"
                    style={{ backgroundColor: '#4570EA', color: 'white' }}
                    variant="contained"
                    size="large"
                    onClick={handleShow}
                    primary
                >
                    Ajouter Professeur
                </Button>
            </Box>

            {/* Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter un Professeur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Box mt="25px">
                            <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='nom' mb="5px" >Nom Professeur
                            </Typography>
                            <CustomTextField id="nom" type="text" variant="outlined" fullWidth  placeholder="Nom Professeur" value={nom} onChange={(e) => setNom(e.target.value)}/>
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle2"
                                fontWeight={600} component="label" htmlFor='prenom' mb="5px">Prénom Professeur 
                            </Typography>
                            <CustomTextField id="prenom" type="text" variant="outlined" fullWidth placeholder="Prénom Professeur" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle3" fontWeight={600} component="label" htmlFor='dateNaissance' mb="5px">Date de Naissance</Typography>
                            <CustomTextField id="dateNaissance" type="date" variant="outlined" fullWidth placeholder="Date de Naissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle4" fontWeight={600} component="label" htmlFor='sexe' mb="5px"><span className="me-5">Sexe</span></Typography>
                            <Form.Check
                                inline
                                label="F"
                                type="radio"
                                id="Feminin"
                                value="0"
                                checked={!sexe}
                                onChange={() => setSexe(0)}
                            />
                            <Form.Check
                                inline
                                label="M"
                                type="radio"
                                id="Masculin"
                                value="1"
                                checked={sexe}
                                onChange={() => setSexe(1)}
                            />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle8" fontWeight={600} component="label" htmlFor='dateEmbauche' mb="5px">Date d'embauche</Typography>
                            <CustomTextField id="dateEmbauche" type="date" variant="outlined" fullWidth placeholder="Date d'embauche" value={dateEmbauche} onChange={(e) => setDateEmbauche(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor='dateDepart' mb="5px">Date de départ</Typography>
                            <CustomTextField id="dateDepart" type="date" variant="outlined" fullWidth placeholder="Date de départ" value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle7" fontWeight={600} component="label" htmlFor='email' mb="5px">Email</Typography>
                            <CustomTextField id="email" type="email" variant="outlined" fullWidth placeholder="xyz@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle6" fontWeight={600} component="label" htmlFor='telephone' mb="5px">Téléphone</Typography>
                            <CustomTextField id="telephone" type="number" variant="outlined" fullWidth placeholder="0500000000" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle5" fontWeight={600} component="label" htmlFor='adresse' mb="5px">Adresse</Typography>
                            <CustomTextField id="adresse" type="text" variant="outlined" fullWidth placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        </Box>
                </Form>
                </Modal.Body>
                <Modal.Footer>

                <Button
                color="primary"
                style={{ backgroundColor: '#774ef2', color: 'white' }} 
                variant="contained"
                size="large"
                fullWidth
                onClick={ajouterProfesseur}
                >
                    Ajouter 
                </Button>

                <Button
                    color="primary"
                    style={{ backgroundColor: '#f0737d', color: 'white' }} 
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleClose}
                >
                    Annuler
                </Button>

                </Modal.Footer>
            </Modal>

        </>
    )


}


export default AddProfesseur;