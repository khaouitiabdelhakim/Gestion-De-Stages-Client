import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import axios from "axios";


const UpdateProfesseur  = ({professeur  }) => {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [nom, setNom] = useState(professeur ? professeur.nom_professeur : "");
    const [prenom, setPrenom] = useState(professeur ? professeur.prenom_professeur : "");
    const [dateNaissance, setDateNaissance] = useState(professeur ? professeur.date_naissance_professeur : "");
    const [sexe, setSexe] = useState(professeur ? professeur.sexe_professeur : "");
    const [dateEmbauche, setDateEmbauche] = useState(professeur ? professeur.date_embauche_professeur : "");
    const [dateDepart, setDateDepart] = useState(professeur ? professeur.date_depart_professeur : "");
    const [email, setEmail] = useState(professeur ? professeur.email_professeur : "");
    const [telephone, setTelephone] = useState(professeur ? professeur.telephone_professeur : "");
    const [adresse, setAdresse] = useState(professeur ? professeur.adresse_professeur : "");      
        
    
    
  const ModifierProfesseur = async () => {
    try {
      // Prepare the data for the PUT request
      const updatedProfesseurData = {
        nom_professeur: nom,
        prenom_professeur: prenom,
        date_naissance_professeur: dateNaissance,
        sexe_professeur: sexe,
        date_emauche_professeur: dateEmbauche,
        date_depart_professeur: dateDepart,
        email_professeur: email,
        telephone_professeur: telephone,
        adresse_professeur: adresse,
      };

      // Log the updated data
      console.log('Données mises à jour :', updatedProfesseurData);

      // Send a PUT request to update the professeur data
      const putResponse = await axios.put(`http://localhost:3500/professeur/${professeur.no_professeur}`, updatedProfesseurData);

      if (putResponse.status === 200) {
        // Reset the state variables after the update
        setNom("");
        setPrenom("");
        setDateNaissance("");
        setSexe("");
        setDateEmbauche("");
        setDateDepart("");
        setEmail("");
        setTelephone("");
        setAdresse("");

        handleClose();

        window.location.href = "/Professeurs"
      } else {
        console.error('Erreur lors de la mise à jour :', putResponse.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error.message);
    }
  };

    useEffect(() => {
        // Mettez à jour les champs lorsque l'étudiant change
        setNom(professeur ? professeur.nom_professeur : "");
        setPrenom(professeur ? professeur.prenom_professeur : "");
        setDateNaissance(professeur ? professeur.date_naissance_professeur : "");
        setSexe(professeur ? professeur.sexe_professeur : "");
        setDateEmbauche(professeur ? professeur.date_embauche_professeur : "");
        setDateDepart(professeur ? professeur.date_depart_professeur : "");
        setEmail(professeur ? professeur.email_professeur : "");
        setTelephone(professeur ? professeur.telephone_professeur : "");
        setAdresse(professeur ? professeur.adresse_professeur : "");
    }, [professeur]);
    

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
                    <Modal.Title>Modifier un Professeur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Box mt="25px">
                            <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nom" mb="5px">
                            Nom Professeur
                            </Typography>
                            <CustomTextField id="nom" type="text" variant="outlined" fullWidth placeholder="Nom Professeur" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="prenom" mb="5px">
                            Prénom Professeur
                        </Typography>
                        <CustomTextField id="prenom" type="text" variant="outlined" fullWidth placeholder="Prénom Professeur" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        </Box>
                        
                        <Box mt="25px">
                            <Typography variant="subtitle3" fontWeight={600} component="label" htmlFor="dateNaissance" mb="5px">
                                Date de Naissance
                            </Typography>
                            <CustomTextField id="dateNaissance" type="date" variant="outlined" fullWidth placeholder="Date de Naissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle4" fontWeight={600} component="label" htmlFor="sexe" className="me-5" mb="5px">
                                Sexe
                            </Typography>
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
                            <Typography variant="subtitle8" fontWeight={600} component="label" htmlFor="dateEmbauche" mb="5px">
                                Date d'embauche
                            </Typography>
                            <CustomTextField id="dateEmbauche" type="date" variant="outlined" fullWidth placeholder="Date d'embauche" value={dateEmbauche} onChange={(e) => setDateEmbauche(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor="dateDepart" mb="5px">
                                Date de départ
                            </Typography>
                            <CustomTextField id="dateDepart" type="date" variant="outlined" fullWidth placeholder="Date de départ" value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle6" fontWeight={600} component="label" htmlFor="telephone" mb="5px">
                                Téléphone Professeur
                            </Typography>
                            <CustomTextField id="telephone" type="number" variant="outlined" fullWidth placeholder="0500000000" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle7" fontWeight={600} component="label" htmlFor="email" mb="5px">
                                Email
                            </Typography>
                            <CustomTextField id="email" type="email" variant="outlined" fullWidth placeholder="xyz@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>

                        <Box mt="25px">
                            <Typography variant="subtitle10" fontWeight={600} component="label" htmlFor="adresse" mb="5px">
                                Adresse
                            </Typography>
                            <CustomTextField id="adresse" type="text" variant="outlined" fullWidth placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
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
                    onClick={ModifierProfesseur}
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

export default UpdateProfesseur;