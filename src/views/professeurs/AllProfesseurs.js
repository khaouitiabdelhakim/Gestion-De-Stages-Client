import React, { useState, useEffect } from 'react';
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
import UpdateProfesseur from './UpdateProfesseur';
import AddProfesseur from './AddProfesseur';


const getFilteredItems = (query, professeurs) => {
    if(!query){
        return professeurs;
    }
    const lowerCaseQuery = query.toLowerCase();
    return professeurs.filter(professeur => professeur.nom_professeur.toLowerCase().includes(lowerCaseQuery))
}


 
const AllProfesseurs  = () => {

    
    const [professeurs, change]  = useState([]) ;
    const [query, setQuery] = useState("");
    
    const filteredItems = getFilteredItems(query,professeurs );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };

    useEffect(() => {
        axios.get('http://localhost:3500/professeur')
          .then(response => {
            change(response.data)
            console.log(response.data)
          })
          .catch(error => console.error('Error fetching notes', error));
      }, []);

    // const [professeurs , setProfesseurs  = useState([]);

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

        <DashboardCard title="Liste des Professeurs">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box width="50%">
                    <CustomTextField type="text" size="small" id="search" variant="outlined" placeholder="Rechercher ..." fullWidth onChange= { e => setQuery(e.target.value)} />
                </Box>
                <AddProfesseur />
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
                                    Date de naissance
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Sexe
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date d'embauche
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date de départ
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Téléphone
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Adresse
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
                        {filteredItems.map((professeur) => {
                            return (
                                <TableRow key={professeur.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {professeur.nom_professeur}
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
                                                    {professeur.prenom_professeur}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {formatDate(professeur.date_naissance_professeur)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                color: "#fff",
                                                backgroundColor: professeur.sexe_professeur === true ? '#8EACFF' : '#FFACD9',
                                            }}
                                            size="small"
                                            label={professeur.sexe_professeur === true? 'Masculin' : 'Féminin'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {formatDate(professeur.date_emauche_professeur)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {formatDate(professeur.date_depart_professeur)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {professeur.email_professeur}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {professeur.telephone_professeur}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={400}>
                                            {professeur.adresse_professeur}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <UpdateProfesseur professeur={professeur} />
                                            {/* <DeleteProfesseur id={professeur.id} />                                         */}
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

export default AllProfesseurs;