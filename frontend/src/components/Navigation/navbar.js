import React, { useState } from 'react';

<<<<<<< HEAD
import Button from '@material-ui/core/Button';
=======
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
>>>>>>> Login_Pages
import NotificationIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useHistory } from 'react-router-dom';

import logo from '../../assets/img/Logo.png';
import { Container } from '@material-ui/core';
<<<<<<< HEAD
import Modals from '../../components/Notifications/notifications';
import './navbar.css';

export function NavbarSignin() {
    return (
        <Container>
            <Container>
                <img className='logo' src={logo} alt='Refslevbæk Bryghus A/S' />
            </Container>
        </Container>
    );
}
=======

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: '#c1e8a0 !important',
  },
  button: {
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#8a8a8a',
    textTransform: 'uppercase',
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: 'none',
    '&:hover': {
      backgroundColor: '#98DDCA !important',
    },
  },
  buttons: {
    '& .Mui-selected': {
      backgroundColor: '#D5ECC2 !important',
    },
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  logo: {
    height: '80px',
  },
  logout: {
    width: '40px',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#FFAAA7 !important',
    },
  },
  motherbox: {
    display: 'flex',
    flexGrow: 1,
  },
  notification: {
    width: '65px',
    border: 'none',
    borderRadius: 0,
    color: '#000000',
    '&:hover': {
      backgroundColor: '#FFD3B4 !important',
    },
    '& .Mui-selected': {
      backgroundColor: '#D5ECC2 !important',
    },
  },
}));
>>>>>>> Login_Pages

export function NavbarSignin() {
  const classes = useStyles();
  return (
    <Container>
      <Container>
        <img className={classes.logo} src={logo} alt='Refslevbæk Bryghus A/S' />
      </Container>
    </Container>
  );
}

export default function Navbar(props) {
<<<<<<< HEAD
    const history = useHistory();

    function logout() {
        try {
            localStorage.removeItem('authentication-token');

            history.push('/login');
        } catch (error) {}
    }

    return (
        <React.Fragment>
            <Container className='container'>
                <Container className='logo-container'>
                    <img
                        className='logo'
                        src={logo}
                        alt='Refslevbæk Bryghus A/S'
                    />
                </Container>
                <Container className='menu-container'>
                    <NavLink
                        to='/production'
                        className='button'
                        activeClassName='active'
                    >
                        Production
                    </NavLink>
                    <NavLink
                        to='/simulation'
                        className='button'
                        activeClassName='active'
                    >
                        Simulation
                    </NavLink>
                    <NavLink
                        to='/batches'
                        className='button'
                        activeClassName='active'
                    >
                        Batches
                    </NavLink>
                </Container>
                <Container className='action-icons'>
                    <Modals />
                    <div className='logout-button'>
                        <Button className='logout'>
                            <LogoutIcon
                                className='notification-icon'
                                onClick={logout}
                            />
                            <p className='icon-text'>Logout</p>
                        </Button>
                    </div>
                </Container>
            </Container>
        </React.Fragment>
    );
=======
  const history = useHistory();
  const classes = useStyles();

  function logout() {
    try {
      localStorage.removeItem('authentication-token');

      history.push('/login');
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <Container className={classes.motherbox}>
        <Container className={classes.container}>
          <img
            className={classes.logo}
            src={logo}
            alt='Refslevbæk Bryghus A/S'
          />
          <NavLink
            to='/production'
            className={classes.button}
            activeClassName={classes.active}
          >
            Production
          </NavLink>
          <NavLink
            to='/simulation'
            className={classes.button}
            activeClassName={classes.active}
          >
            Simulation
          </NavLink>
          <NavLink
            to='/batches'
            className={classes.button}
            activeClassName={classes.active}
          >
            Batches
          </NavLink>
        </Container>
        <ToggleButton
          value='notification'
          aria-label='Notification Menu'
          className={classes.notification}
        >
          <NotificationIcon />
        </ToggleButton>
        <Button className={classes.logout}>
          <LogoutIcon onClick={logout} />
        </Button>
      </Container>
    </React.Fragment>
  );
>>>>>>> Login_Pages
}
