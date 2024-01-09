import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { Box, Typography } from "@mui/material";
  
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const UpdateEtudiant = ({etudiant}) => {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

        const [nom, setNom] = useState(etudiant ? etudiant.nom : "");
        const [prenom, setPrenom] = useState(etudiant ? etudiant.prenom : "");
        const [dateNaissance, setDateNaissance] = useState(etudiant ? etudiant.dateNaissance : "");
        const [sexe, setSexe] = useState(etudiant ? etudiant.sexe : true);
        const [adresse, setAdresse] = useState(etudiant ? etudiant.adresse : "");
        const [telephone, setTelephone] = useState(etudiant ? etudiant.telephone : "");
        const [email, setEmail] = useState(etudiant ? etudiant.email : "");
        const [anneePromotion, setAnneePromotion] = useState(etudiant ? etudiant.anneePromotion : "");
        const [mention, setMention] = useState(etudiant ? etudiant.mention : "");
      
        const ModifierEtudiant = () => {
          // Mettez à jour l'étudiant via une API
          console.log("Données mises à jour :", {
            id: etudiant.id,
            nom_etudiant: nom,
            prenom_etudiant: prenom,
            date_naissance_etudiant: dateNaissance,
            sexe_etudiant: sexe,
            adresse_etudiant: adresse,
            telephone_etudiant: telephone,
            email_etudiant: email,
            annee_promotion: anneePromotion,
            mention_etudiant: mention,
          });

        // Réinitialisez les champs après la mise à jour
        setNom("");
        setPrenom("");
        setDateNaissance("");
        setSexe();
        setAdresse("");
        setTelephone("");
        setEmail("");
        setAnneePromotion("");
        setMention("");

        handleClose();
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
                    <Modal.Title>Modifier un étudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Box mt="25px">
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="nom" mb="5px">
                        Nom
                        </Typography>
                        <CustomTextField id="nom" type="text" variant="outlined" fullWidth placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="prenom" mb="5px">
                        Prénom
                    </Typography>
                    <CustomTextField id="prenom" type="text" variant="outlined" fullWidth placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
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
                    <Typography variant="subtitle5" fontWeight={600} component="label" htmlFor="adresse" mb="5px">
                        Adresse
                    </Typography>
                    <CustomTextField id="adresse" type="text" variant="outlined" fullWidth placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                    <Typography variant="subtitle6" fontWeight={600} component="label" htmlFor="telephone" mb="5px">
                        Téléphone
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
                    <Typography variant="subtitle8" fontWeight={600} component="label" htmlFor="anneePromotion" mb="5px">
                        Promotion
                    </Typography>
                    <CustomTextField id="anneePromotion" type="number" variant="outlined" fullWidth placeholder="Année de promotion" value={anneePromotion} onChange={(e) => setAnneePromotion(e.target.value)} />
                    </Box>

                    <Box mt="25px">
                    <Typography variant="subtitle9" fontWeight={600} component="label" htmlFor="mention" mb="5px">
                        Mention
                    </Typography>
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
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    color="primary"
                    style={{ backgroundColor: '#774ef2', color: 'white' }} // Set the background color and text color  
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={ModifierEtudiant}
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

export default UpdateEtudiant;