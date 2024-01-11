import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

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
            
        })
        .catch(error => {
            // Handle errors if any
            console.error('Error:', error);
        });
    };
    
    //Add function
    return(
        <>
            {/* <Box style={{ textAlign: 'right' }}>
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
            </Box> */}
            <Box style={{ textAlign: 'right' }}>
                <Button
                    color="primary"
                    // style={{ backgroundColor: '#4570EA', color: 'white' }}
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

            {/* <Modal show={show} onHide={handleClose}>
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
            </Modal> */}
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