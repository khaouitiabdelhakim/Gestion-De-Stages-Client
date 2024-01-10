import React, { useState,useEffect } from 'react';
import axios from 'axios';
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
import DashboardCard from 'src/components/shared/DashboardCard';
import AddEtudiant from './AddEtudiant';
import UpdateEtudiant from './UpdateEtudiant';


const getFilteredItems = (query, etudiants) => {
    if(!query){
        return etudiants;
    }
    const lowerCaseQuery = query.toLowerCase();
    return etudiants.filter(etudiant => etudiant.nom_etudiant.toLowerCase().includes(lowerCaseQuery))
}
 
const Etudiants = () => {

    const [query, setQuery] = useState(""); 
    
    const [etudiants, setEtudiants] = useState([]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3500/etudiant');
                setEtudiants(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

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
                                            {formatDate(etudiant.date_naissance_etudiant)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                color: "#fff",
                                                backgroundColor: etudiant.sexe_etudiant === true ? '#8EACFF' : '#FFACD9',
                                            }}
                                            size="small"
                                            label={etudiant.sexe_etudiant === true ? 'Masculin' : 'Féminin'}
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
