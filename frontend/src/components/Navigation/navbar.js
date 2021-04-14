import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import NotificationIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import {NavLink} from 'react-router-dom';

import logo from '../../assets/img/Logo.png';

const useStyles = makeStyles(theme => ({
    active:{
        backgroundColor:'#D5ECC2 !important'
    },
    button: {
        borderRadius:"5px",
        textDecoration: 'none', 
        color:'#8a8a8a',
        textTransform: 'uppercase',
        padding:theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        border:"none",
        borderRadius:0,
        '&:hover': {
            backgroundColor: '#98DDCA !important',
        },
    },
    buttons:{
        '& .Mui-selected':{
            backgroundColor:'#D5ECC2 !important'
        },
    },
    container:{
        display:"flex",
        flexGrow:1,
    },
    logo: {
        height:"80px",
    },
    logout:{
        width:"40px",
        borderRadius:0,
        '&:hover':{
            backgroundColor:'#FFAAA7 !important',
        }
    },
    motherbox:{
        display:"flex",
        flexGrow:1,
    },
    notification:{
        width:"65px",
        border:"none",
        borderRadius:0,
        color:"#000000",
        '&:hover':{
            backgroundColor:'#FFD3B4 !important',
        },
        '& .Mui-selected':{
            backgroundColor:'#D5ECC2 !important'
        },
    },
}));

export default function Navbar(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.motherbox}>
                <Box className={classes.container}>
                    <img className={classes.logo} src={logo} alt='Refslevbæk Bryghus A/S'/>
                        <NavLink to="/production" className={classes.button} activeClassName={classes.active}>Production</NavLink>
                        <NavLink to="/simulation" className={classes.button} activeClassName={classes.active}>Simulation</NavLink>
                        <NavLink to="/batches" className={classes.button} activeClassName={classes.active}>batches</NavLink>
                </Box>
                <ToggleButton value="notification" aria-label="Notification Menu" className={classes.notification}>
                    <NotificationIcon/>
                </ToggleButton>
                <Button className={classes.logout}><LogoutIcon/></Button>
            </Box>
        </React.Fragment>
            
    );
}
