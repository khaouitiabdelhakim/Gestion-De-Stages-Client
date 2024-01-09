import React, { useState } from "react";

// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
  
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


function AddEtudiant(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [sexe, setSexe] = useState(true);
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [anneePromotion, setAnneePromotion] = useState(2023);
    const [mention, setMention] = useState("assezBien");

    const ajouterEtudiant = () => {
        // API : fetch('/api/ajouterEtudiant', { method: 'POST', body: { nom, prenom, ... } })
        console.log("Données à ajouter :", {
        nom_etudiant : nom,
        prenom_etudiant : prenom,
        date_naissance_etudiant : dateNaissance,
        sexe_etudiant : sexe,
        adresse_etudiant : adresse,
        telephone_etudiant : telephone,
        email_etudiant : email,
        annee_promotion : anneePromotion,
        mention_etudiant : mention,
        }); 

        // Réinitialiser les champs après l'ajout
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
                    Ajouter étudiant
                </Button>
            </Box>

            {/* Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter un Etudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    {/* <Form.Group className="mb-3" controlId="nomEtudiant">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        autoFocus
                    />
                    </Form.Group> */}

                    <Box mt="25px">
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='nom' mb="5px" >Nom
                        </Typography>
                        <CustomTextField id="nom" type="text" variant="outlined" fullWidth  placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle2"
                            fontWeight={600} component="label" htmlFor='prenom' mb="5px">Prénom
                        </Typography>
                        <CustomTextField id="prenom" type="text" variant="outlined" fullWidth placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle3"
                            fontWeight={600} component="label" htmlFor='dateNaissance' mb="5px">Date de Naissance
                        </Typography>
                        <CustomTextField id="dateNaissance" type="date" variant="outlined" fullWidth placeholder="Date de Naissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle4"
                            fontWeight={600} component="label" htmlFor='sexe' mb="5px"><span className="me-5">Sexe</span>
                        </Typography>
                        {/* <CustomTextField id="sexe" type="text" variant="outlined" fullWidth placeholder="Sexe"/> */}
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
                        <Typography variant="subtitle5"
                            fontWeight={600} component="label" htmlFor='adresse' mb="5px">Adresse
                        </Typography>
                        <CustomTextField id="adresse" type="text" variant="outlined" fullWidth placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle6"
                            fontWeight={600} component="label" htmlFor='telephone' mb="5px">Téléphone
                        </Typography>
                        <CustomTextField id="telephone" type="number" variant="outlined" fullWidth placeholder="0500000000" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle7"
                            fontWeight={600} component="label" htmlFor='email' mb="5px">Email
                        </Typography>
                        <CustomTextField id="email" type="email" variant="outlined" fullWidth placeholder="xyz@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                        <Typography variant="subtitle8"
                            fontWeight={600} component="label" htmlFor='anneePromotion' mb="5px">Promotion
                        </Typography>
                        <CustomTextField id="anneePromotion" type="number" variant="outlined" fullWidth placeholder="Année de promotion" defaultValue={anneePromotion} onChange={(value) => setAnneePromotion(value)} allowMouseWheel />
                    </Box>

{/* <Box mt="25px">
    <Typography variant="subtitle9"
        fontWeight={600} component="label" htmlFor='mention' mb="5px">Mention
    </Typography>
    <CustomTextField id="mention" type="text" variant="outlined" fullWidth />
</Box> */}

                    <Box mt="25px">
                        <Typography variant="subtitle9"
                            fontWeight={600} component="label" htmlFor='mention' mb="5px">Mention
                        </Typography>
                        {/* <CustomTextField id="mention" type="text" variant="outlined" fullWidth /> */}
                        <Form.Select
                            id="mention"
                            value={mention}
                            onChange={(e) => setMention(e.target.value)}
                            >
                            <option value="">Choisir la Mention</option>
                            <option value="Assez-Bien">Assez-Bien</option>
                            <option value="Bien">Bien</option>
                            <option value="Très Bien">Très Bien</option>
                            <option value="Excellent">Excellent</option>
                        </Form.Select>
                    </Box>


{/* <Box mt="25px">
    <Typography variant="subtitle0"
        fontWeight={600} component="label" htmlFor='mention' mb="5px">phone
    </Typography>
    <CustomTextField
          id="telephone"
          type="number"
          variant="outlined"
          fullWidth
        />
</Box> */}


                    {/* <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group> */}
                </Form>
                </Modal.Body>
                <Modal.Footer>

                {/* <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button> */}
                {/* <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={handleClose}
                    primary
                    // fullWidth
                    // component={Link}
                    // to="/"
                    // type="submit"
                >                    
                Annuler
                </Button> */}
                
                <Button
                color="primary"
                style={{ backgroundColor: '#774ef2', color: 'white' }} // Set the background color and text color  
                variant="contained"
                size="large"
                fullWidth
                onClick={ajouterEtudiant}
                >
                    Ajouter 
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


}


export default AddEtudiant;