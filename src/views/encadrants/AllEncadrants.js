import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import DashboardCard from 'src/components/shared/DashboardCard';
import UpdateEtudiant from './UpdateEncadrant';
import AddEncadrant from './AddEncadrant';





const getFilteredItems = (query, encadrants) => {
    if(!query){
        return encadrants;
    }
    const lowerCaseQuery = query.toLowerCase();
    return encadrants.filter(encadrant => encadrant.nom_encadrant.toLowerCase().includes(lowerCaseQuery))
}
 
const AllEncadrants = () => {
    
    const [query, setQuery] = useState("");
    const [encadrantsData, change]  = useState([]) ;
    const filteredItems = getFilteredItems(query,encadrantsData);

    useEffect(() => {
        axios.get('http://localhost:3500/encadrant')
          .then(response => change(response.data))
          .catch(error => console.error('Error fetching notes', error));
      }, []);

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

        <DashboardCard title="Liste des Encadrants">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box width="50%">
                    <CustomTextField type="text" size="small" id="search" variant="outlined" placeholder="Rechercher ..." fullWidth onChange= { e => setQuery(e.target.value)} />
                </Box>
                <AddEncadrant />
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
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((encadrant) => {
                            return (

                                <TableRow key={encadrant.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {encadrant.nom_encadrant}
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
                                                    {encadrant.prenom_encadrant}
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
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {encadrant.telephone_encadrant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {encadrant.email_encadrant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {encadrant.email_encadrant}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                            <UpdateEtudiant encadrant={encadrant} />
                                            {/* <DeleteEtudiant id={encadrant.id} /> */}
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

export default AllEncadrants;