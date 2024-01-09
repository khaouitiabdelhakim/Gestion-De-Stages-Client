import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";  

const DeleteEncadrant = () => {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [encadrant, setEncadrant] = useState({});

    const SupprimerEncadrant  = async(id) => {
          //  Supprimer l'étudiant via une API
          try {
            // Envoyez une requête DELETE à votre API avec l'ID de l'étudiant à supprimer
            // const deleteEncadrant  = await fetch(`http://localhost:5000/Encadrants/${id}`, {
            //     method: 'DELETE',
            // });
            // setEncadrant(encadrant.filter(encadrant => encadrant.id !== id));

            window.location = "/Encadrants";
            console.log("Encadrant  supprimé");

        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <>
            <Box>
                <Button
                    color="secondary"
                    // style={{ backgroundColor: '#774ef2', color: 'white' }}
                    variant="contained"
                    size="small"
                    onClick={handleShow}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </Button>
            </Box>         
        
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Box mt="25px">
                            <Typography variant="body1" fontWeight={600} component="label" htmlFor="nom" mb="5px">
                            Êtes-vous sûr de vouloir supprimer l'encadrant <b>{encadrant.nomEncadrant} {encadrant.prenomEncadrant}</b> ?
                            </Typography>
                        </Box>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    color="primary"
                    style={{ backgroundColor: '#774ef2', color: 'white' }} // Set the background color and text color  
                    variant="contained"
                    size="large"
                    fullWidth
                    //onClick={SupprimerEtudiant(etudiant.id)}
                    onClick={() => SupprimerEncadrant(encadrant.id)}                    >
                        Supprimer
                    </Button>

                    <Button
                        color="primary"
                        style={{ backgroundColor: '#f0737d', color: 'white' }} // Set the background color and text color  
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
};

export default DeleteEncadrant;