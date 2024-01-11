import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const competenceData = {
                username: username,
                password: password,
                email: username,
            };
    
            console.log('Competence data sent to backend:', competenceData);
    
            const response = await fetch('http://localhost:3500/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(competenceData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Response from backend:', data);
    
                // If needed, you can take other actions here
                // For example, update the state or perform additional logic
    
                // If needed, you can clear the form or take other actions here
                // setAddDialogOpen(false);
                console.log('Sign-in successful');
                // Redirect to the desired page
                window.location.href = '/';
            } else {
                // Handle non-successful response (e.g., display an error message)
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    

    return (
        <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Identifiant</Typography>
                <CustomTextField 
                onChange={(e) => setUsername( e.target.value)}
                id="username" variant="outlined" fullWidth label="Nom d'utilisateur ou email"  />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Mot de passe</Typography>
                <CustomTextField
                onChange={(e) => setPassword(e.target.value )}
                id="password" type="password" variant="outlined" fullWidth label="Mot de passe"  />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                {/* Additional content goes here if needed */}
            </Stack>
        </Stack>
        <Box>
        <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                >
                    Se connecter
                </Button>
        </Box>
        {subtitle}
    </>
    );
};

export default AuthLogin;
