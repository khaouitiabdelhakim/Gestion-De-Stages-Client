import React, { useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,

} from '@mui/material';
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

// import DashboardCard from '../../../components/shared/DashboardCard';
import DashboardCard from 'src/components/shared/DashboardCard';

import AddEtudiant from './AddEtudiant';
import UpdateEtudiant from './UpdateEtudiant';

const etudiants = [
    {
        "id": 1,
        "nom_etudiant": "Marketplace",
        "prenom_etudiant": "John",
        "date_naissance_etudiant": "12.Jan.2021",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "123 Rue de la République",
        "telephone_etudiant": "+33 6 12 34 56 78",
        "email_etudiant": "john@example.com",
        "annee_promotion": "2023",
        "mention_etudiant": "Bien"
      },
      {
        "id": 2,
        "nom_etudiant": "Amazon",
        "prenom_etudiant": "Alice",
        "date_naissance_etudiant": "10.Jan.2021",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "456 Avenue des Étoiles",
        "telephone_etudiant": "+1 555-1234",
        "email_etudiant": "alice@example.com",
        "annee_promotion": "2022",
        "mention_etudiant": "Très bien"
      },
      {
        "id": 3,
        "nom_etudiant": "Google",
        "prenom_etudiant": "Olivia",
        "date_naissance_etudiant": "15.Feb.2020",
        "sexe_etudiant": "Féminin",
        "adresse_etudiant": "789 Boulevard Technologique",
        "telephone_etudiant": "+44 20 7123 4567",
        "email_etudiant": "olivia@example.com",
        "annee_promotion": "2024",
        "mention_etudiant": "Excellent"
      },
      {
        "id": 4,
        "nom_etudiant": "Microsoft",
        "prenom_etudiant": "Emma",
        "date_naissance_etudiant": "25.Mar.2019",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "101 Microsoft Way",
        "telephone_etudiant": "+1 425-882-8080",
        "email_etudiant": "emma@example.com",
        "annee_promotion": "2021",
        "mention_etudiant": "Bien"
      },
      {
        "id": 5,
        "nom_etudiant": "Apple",
        "prenom_etudiant": "Liam",
        "date_naissance_etudiant": "05.Apr.2018",
        "sexe_etudiant": "Féminin",
        "adresse_etudiant": "One Apple Park Way",
        "telephone_etudiant": "+1 408-996-1010",
        "email_etudiant": "liam@example.com",
        "annee_promotion": "2020",
        "mention_etudiant": "Très bien"
      },
      {
        "id": 6,
        "nom_etudiant": "Samsung",
        "prenom_etudiant": "Noah",
        "date_naissance_etudiant": "20.May.2017",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "234 Galaxy Street",
        "telephone_etudiant": "+82 2-2255-0114",
        "email_etudiant": "noah@example.com",
        "annee_promotion": "2019",
        "mention_etudiant": "Bien"
      },
      {
        "id": 7,
        "nom_etudiant": "Sony",
        "prenom_etudiant": "Oliver",
        "date_naissance_etudiant": "15.Jun.2016",
        "sexe_etudiant": "Féminin",
        "adresse_etudiant": "567 Sony Plaza",
        "telephone_etudiant": "+81 3-6748-2111",
        "email_etudiant": "oliver@example.com",
        "annee_promotion": "2018",
        "mention_etudiant": "Excellent"
      },
      {
        "id": 8,
        "nom_etudiant": "Tesla",
        "prenom_etudiant": "Emma",
        "date_naissance_etudiant": "10.Jul.2015",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "123 Electric Avenue",
        "telephone_etudiant": "+1 650-681-5000",
        "email_etudiant": "emma@example.com",
        "annee_promotion": "2017",
        "mention_etudiant": "Très bien"
      },
      {
        "id": 9,
        "nom_etudiant": "Facebook",
        "prenom_etudiant": "Sophia",
        "date_naissance_etudiant": "25.Aug.2014",
        "sexe_etudiant": "Féminin",
        "adresse_etudiant": "456 Social Street",
        "telephone_etudiant": "+1 650-543-4800",
        "email_etudiant": "sophia@example.com",
        "annee_promotion": "2016",
        "mention_etudiant": "Bien"
      },
      {
        "id": 10,
        "nom_etudiant": "Twitter",
        "prenom_etudiant": "Jackson",
        "date_naissance_etudiant": "05.Sep.2013",
        "sexe_etudiant": "Masculin",
        "adresse_etudiant": "789 Tweet Lane",
        "telephone_etudiant": "+1 415-222-9670",
        "email_etudiant": "jackson@example.com",
        "annee_promotion": "2015",
        "mention_etudiant": "Excellent"
      }
];

const getFilteredItems = (query, etudiants) => {
    if(!query){
        return etudiants;
    }
    const lowerCaseQuery = query.toLowerCase();
    return etudiants.filter(etudiant => etudiant.nom_etudiant.toLowerCase().includes(lowerCaseQuery))
}


 
const Etudiants = () => {

    
    const [query, setQuery] = useState("");
    
    const filteredItems = getFilteredItems(query,etudiants);

    // const [etudiants, setEtudiants] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('');
    //             const jsonData = await response.json();
    //             setEtudiants(jsonData);
    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (

        <DashboardCard title="Liste des étudiants">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box width="50%">
                    <CustomTextField type="text" size="small" id="search" variant="outlined" placeholder="Rechercher ..." fullWidth onChange= { e => setQuery(e.target.value)} />
                </Box>
                <AddEtudiant />
            </Box>
                
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nom
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Prénom
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                Date naissance
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Sexe
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Adresse
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Téléphone
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Email
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Promotion
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Mention
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((etudiant) => {
                            return (

                                <TableRow key={etudiant.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {etudiant.nom_etudiant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {etudiant.prenom_etudiant}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {/* {product.prenom_etudiant} */}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.date_naissance_etudiant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                color: "#fff",
                                                backgroundColor: etudiant.sexe_etudiant === 'Masculin' ? '#8EACFF' : '#FFACD9;',
                                            }}
                                            size="small"
                                            label={etudiant.sexe_etudiant}
                                        ></Chip>
                                        {/* <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.sexe_etudiant}
                                        </Typography> */}
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.adresse_etudiant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.telephone_etudiant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.email_etudiant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {etudiant.annee_promotion}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h6">{etudiant.mention_etudiant}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <UpdateEtudiant etudiant={etudiant} />
                                            {/* <DeleteEtudiant id={etudiant.id} /> */}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </Box>

        </DashboardCard>
    );
};

export default Etudiants;
