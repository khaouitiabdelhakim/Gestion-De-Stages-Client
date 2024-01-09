import React , { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Snackbar,SnackbarContent, } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';

import { IconBellRinging, IconMenu  } from '@tabler/icons';
import CloseIcon from '@mui/icons-material/Close';

const Header = (props) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [notifications, setNotifications] = useState([]);
  const generateRandomNotification = () => {
    const messages = [
      'Nouveau message reçu!',
      'Vous avez un rappel pour demain.',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };
  const handleNotificationClick = () => {
    const newNotification = generateRandomNotification();
    setNotifications([...notifications, newNotification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        {/* <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton> */}
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          onClick={handleNotificationClick}
        >
          <Badge badgeContent={notifications.length} color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          
          <Profile />
        </Stack>
      </ToolbarStyled>
        {/* Snackbar pour afficher les notifications */}
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notifications.length > 0}
        autoHideDuration={6000}
        onClose={clearNotifications}
      >
        <Stack spacing={2} sx={{ width: '100%' }}>
          {notifications.map((message, index) => (
            <SnackbarContent
              key={index}
              message={message}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={clearNotifications}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          ))}
        </Stack>
      </Snackbar>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
