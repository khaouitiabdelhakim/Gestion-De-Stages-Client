import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


const UpdateEncadrant = ({encadrant }) => {


    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [nomEncadrant, setNomEncadrant] = useState(encadrant ? encadrant.nomEncadrant : "");
    const [prenomEncadrant, setPrenomEncadrant] = useState(encadrant ? encadrant.prenomEncadrant : "");
    const [emailEncadrant, setEmailEncadrant] = useState(encadrant ? encadrant.emailEncadrant : "");
    const [telephoneEncadrant, setTelephoneEncadrant] = useState(encadrant ? encadrant.telephoneEncadrant : "");

    useEffect(() => {
        // Fetch encadrant data using GET request
        axios.get(`http://localhost:3500/encadrant/${encadrant.no_encadrant}`) // Assuming you have an ID to identify the encadrant
          .then(response => {
            const encadrantData = response.data;
            console.log(response.data)
            // Update state variables with the fetched data
            setNomEncadrant(encadrantData.nom_encadrant);
            setPrenomEncadrant(encadrantData.prenom_encadrant);
            setEmailEncadrant(encadrantData.email_encadrant);
            setTelephoneEncadrant(encadrantData.telephone_encadrant);
          })
          .catch(error => console.error('Error fetching encadrant data', error));
      }, [encadrant.id]); // Make sure to include the necessary dependencies
      
      const ModifierEncadrant = () => {
        // Update the encadrant via an API
        axios.put(`http://localhost:3500/encadrant/${encadrant.no_encadrant}`, {
            nom_encadrant: nomEncadrant,
            prenom_encadrant: prenomEncadrant,
            email_encadrant: emailEncadrant,
            telephone_encadrant: telephoneEncadrant,
        })
        .then(response => {
            console.log("Données mises à jour :", response.data);
            // Reset the form fields after a successful update
            setNomEncadrant("");
            setPrenomEncadrant("");
            setEmailEncadrant("");
            setTelephoneEncadrant("");
            handleClose();

            window.location.href = "/Encadrants"
            
        })

        .catch(error => console.error('Error updating encadrant data', error));
    };
    
          
 

    useEffect(() => {
        // Mettez à jour les champs lorsque l'étudiant change
        setNomEncadrant(encadrant ? encadrant.nomEncadrant : "");
        setPrenomEncadrant(encadrant ? encadrant.prenomEncadrant : "");
        setEmailEncadrant(encadrant ? encadrant.emailEncadrant : "");
        setTelephoneEncadrant(encadrant ? encadrant.telephoneEncadrant : "");
    }, [encadrant]);

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
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#00FF00" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>                
                </Button>
            </Box>
              
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier un Encadrant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Box mt="25px">
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nomEncadrant" mb="5px">
                        Nom Encadrant
                        </Typography>
                        <CustomTextField id="nomEncadrant" type="text" variant="outlined" fullWidth placeholder="Nom Encadrant" value={nomEncadrant} onChange={(e) => setNomEncadrant(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="prenomEncadrant" mb="5px">
                        Prénom Encadrant
                    </Typography>
                    <CustomTextField id="prenomEncadrant" type="text" variant="outlined" fullWidth placeholder="Prénom" value={prenomEncadrant} onChange={(e) => setPrenomEncadrant(e.target.value)} />
                    </Box>
                    <Box mt="25px">
                    <Typography variant="subtitle6" fontWeight={600} component="label" htmlFor="telephoneEncadrant" mb="5px">
                        Téléphone Encadrant
                    </Typography>
                    <CustomTextField id="telephoneEncadrant" type="number" variant="outlined" fullWidth placeholder="05 22 33 44 55" value={telephoneEncadrant} onChange={(e) => setTelephoneEncadrant(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                    <Typography variant="subtitle7" fontWeight={600} component="label" htmlFor="emailEncadrant" mb="5px">
                        Email Encadrant
                    </Typography>
                    <CustomTextField id="emailEncadrant" type="email" variant="outlined" fullWidth placeholder="xyz@email.com" value={emailEncadrant} onChange={(e) => setEmailEncadrant(e.target.value)} />
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
                    onClick={ModifierEncadrant}
                    >
                        Modifier
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

export default UpdateEncadrant;