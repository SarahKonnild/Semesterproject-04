import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import NotificationIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useHistory } from 'react-router-dom';

import logo from '../../assets/img/Logo.png';
import { Container, Modal } from '@material-ui/core';
import Dialog from '../Notifications/notifications';

const useStyles = makeStyles(theme => ({
    active: {
        backgroundColor: '#D5ECC2 !important',
    },
    button: {
        borderRadius: 5,
        textDecoration: 'none',
        color: '#8a8a8a',
        textTransform: 'uppercase',
        padding: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        border: 'none',
        borderRadius: 0,
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

export function NavbarSignin() {
    const classes = useStyles();
    return (
        <Container>
            <Container>
                <img
                    className={classes.logo}
                    src={logo}
                    alt='Refslevbæk Bryghus A/S'
                />
            </Container>
        </Container>
    );
}

export default function Navbar(props) {
    const history = useHistory();
    const classes = useStyles();

    const [showDialog, setShowDialog] = useState(false);
    const [log, setLog] = useState([]);

    function logout() {
        try {
            localStorage.removeItem('authentication-token');

            history.push('/login');
        } catch (error) {}
    }

    function loadLog() {
        let temp = JSON.parse(localStorage.getItem('Error'));
        if (temp === undefined) {
            return;
        }
        setLog(JSON.parse(localStorage.getItem('Error')));
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
                <Button
                    value='notification'
                    aria-label='Notification Menu'
                    className={classes.notification}
                >
                    <NotificationIcon
                        onClick={e => {
                            setShowDialog(true);
                            loadLog();
                        }}
                    />
                </Button>
                <Dialog isOpen={showDialog} onClose={e => setShowDialog(false)}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'grid' }}>
                            {log.map(logs => {
                                return <div>{logs}</div>;
                            })}
                        </div>
                    </div>
                </Dialog>
                <Button className={classes.logout}>
                    <LogoutIcon onClick={logout} />
                </Button>
            </Container>
        </React.Fragment>
    );
}
