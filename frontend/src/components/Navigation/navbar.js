import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import NotificationIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useHistory } from 'react-router-dom';

import logo from '../../assets/img/Logo.png';
import { Container } from '@material-ui/core';
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

export default function Navbar(props) {
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
}
