import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Tooltip, Fab, Box } from '@mui/material';
import img1 from 'src/assets/images/products/ofolio.png';
import img2 from 'src/assets/images/products/capegemini.png';
import img3 from 'src/assets/images/products/IBM.jpg';
import img4 from 'src/assets/images/products/oracle.png';
import DashboardCard from '../../../components/shared/DashboardCard';

import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

const ecoCard = [
    {
        title: 'OFOLIO',
        subheader: 'September 14, 2023',
        photo: img1,
        salesPrice: 375,
        price: 285,
        rating: 4,
    },
    {
        title: 'CAMPGEMINI',
        subheader: 'September 14, 2023',
        photo: img2,
        salesPrice: 650,
        price: 900,
        rating: 5,
    },
    {
        title: 'IBM',
        subheader: 'September 14, 2023',
        photo: img3,
        salesPrice: 150,
        price: 200,
        rating: 3,
    },
    {
        title: 'ORACLE',
        subheader: 'September 14, 2023',
        photo: img4,
        salesPrice: 285,
        price: 345,
        rating: 2,
    },
];



const Blog = () => {
    return (
        <DashboardCard>

        <>
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Entreprises de l'Année
            </Typography>
            </div>
        </>
            

            <Grid container spacing={3}>
                {ecoCard.map((product, index) => (
                    <Grid item sm={12} md={4} lg={3} key={index}>
                        <BlankCard>
                            <Typography component={Link} to="/">
                                <img src={product.photo} alt="img" width="100%" />
                            </Typography>
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                <Typography variant="h6">{product.title}</Typography>
                                {/* Vous pouvez afficher les prix et la note ici si nécessaire */}
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>
            
       
        </DashboardCard>
    );
};

export default Blog;
