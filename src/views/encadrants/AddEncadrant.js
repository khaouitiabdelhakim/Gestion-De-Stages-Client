import React, { useState } from "react";

// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
  
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


function AddEncadrants(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nomEncadrant, setNomEncadrant] = useState('');
    const [prenomEncadrant, setPrenomEncadrant] = useState('');
    const [emailEncadrant, setEmailEncadrant] = useState('');
    const [telephoneEncadrant, setTelephoneEncadrant] = useState('');

    const ajouterEncadrant  = () => {
        // API : fetch('/api/ajouterEtudiant', { method: 'POST', body: { nom, prenom, ... } })
        console.log("Données à ajouter :", {
            nom_encadrant: nomEncadrant,
            prenom_encadrant: prenomEncadrant,
            email_encadrant: emailEncadrant,
            telephone_encadrant: telephoneEncadrant,
        }); 

        // Réinitialiser les champs après l'ajout
        setNomEncadrant('');
        setPrenomEncadrant('');
        setEmailEncadrant('');
        setTelephoneEncadrant('');

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
                    // fullWidth
                    // component={Link}
                    // to="/"
                    // type="submit"
                >
                    Ajouter encadrant
                </Button>
            </Box>

            {/* Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter un Encadrant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Box mt="25px">
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='nom' mb="5px" >Nom Encadrant
                        </Typography>
                        <CustomTextField id="nomEncadrant" type="text" variant="outlined" fullWidth  placeholder="Nom Encadrant" value={nomEncadrant} onChange={(e) => setNomEncadrant(e.target.value)}/>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle2"
                            fontWeight={600} component="label" htmlFor='prenomEncadrant' mb="5px">Prénom Encadrant 
                        </Typography>
                        <CustomTextField id="prenomEncadrant" type="text" variant="outlined" fullWidth placeholder="Prénom Encadrant" value={prenomEncadrant} onChange={(e) => setPrenomEncadrant(e.target.value)}/>
                    </Box>
                    <Box mt="25px">
                        <Typography variant="subtitle6"
                            fontWeight={600} component="label" htmlFor='telephoneEncadrant' mb="5px">Téléphone Encadrant
                        </Typography>
                        <CustomTextField id="telephoneEncadrant" type="number" variant="outlined" fullWidth placeholder="05 22 33 44 55" value={telephoneEncadrant} onChange={(e) => setTelephoneEncadrant(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle7"
                            fontWeight={600} component="label" htmlFor='emailEncadrant' mb="5px">Email Encadrant
                        </Typography>
                        <CustomTextField id="emailEncadrant" type="email" variant="outlined" fullWidth placeholder="xyz@email.com" value={emailEncadrant} onChange={(e) => setEmailEncadrant(e.target.value)} />
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
                onClick={ajouterEncadrant}
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


export default AddEncadrants;