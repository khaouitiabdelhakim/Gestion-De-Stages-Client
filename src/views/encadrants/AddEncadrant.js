import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function AddEncadrants(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nomEncadrant, setNomEncadrant] = useState('');
    const [prenomEncadrant, setPrenomEncadrant] = useState('');
    const [emailEncadrant, setEmailEncadrant] = useState('');
    const [telephoneEncadrant, setTelephoneEncadrant] = useState('');

    const ajouterEncadrant = () => {
        // Create an object with the encadrant data
        const encadrantData = {
            nom_encadrant: nomEncadrant,
            prenom_encadrant: prenomEncadrant,
            email_encadrant: emailEncadrant,
            telephone_encadrant: telephoneEncadrant,
        };
    
        // Make an HTTP POST request to the backend API
        fetch('http://localhost:3500/encadrant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encadrantData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend (if needed)
            console.log('Response from backend:', data);
    
            // Reset form fields and close the modal
            setNomEncadrant('');
            setPrenomEncadrant('');
            setEmailEncadrant('');
            setTelephoneEncadrant('');
            handleClose();

            window.location.href = "/Encadrants"
            
        })
        .catch(error => {
            // Handle errors if any
            console.error('Error:', error);
        });
    };
    
    //Add function
    return(
        <>
            <Box style={{ textAlign: 'right' }}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleShow}
                    primary
                >
                    Ajouter encadrant
                </Button>
            </Box>

            {/* Modal */}

            <Dialog open={show} onClose={handleClose} fullWidth >
                <DialogTitle>
                    Ajouter un Encadrant
                </DialogTitle>
                <DialogContent>
                <Form>
                    <TextField
                        label="Nom d'encadrant"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nomEncadrant}
                        onChange={(e) => setNomEncadrant(e.target.value)}
                    />

                    <TextField
                        label="Prénom d'encadrant"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={prenomEncadrant}
                        onChange={(e) => setPrenomEncadrant(e.target.value)}
                    />

                    <TextField
                        label="Téléphone d'encadrant"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="tel"
                        value={telephoneEncadrant}
                        onChange={(e) => setTelephoneEncadrant(e.target.value)}
                    />

                    <TextField
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        label="Email d'encadrant"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={emailEncadrant}
                        onChange={(e) => setEmailEncadrant(e.target.value)}
                    />

                </Form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={ajouterEncadrant}
                    >
                        Ajouter
                    </Button>
                    <Button
                        color="warning"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddEncadrants;