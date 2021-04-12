import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import NotificationIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import logo from '../../assets/img/Logo.png';

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: 'uppercase',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
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
    }
    ,
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

    const [view, setView] = React.useState('list');

    const handleChange= (event, nextView) => {
        if(nextView !== null){
            setView(nextView);
        }
    };

    return (
        <React.Fragment>
            <Box className={classes.motherbox}>
                <Box className={classes.container}>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt='Refslevbæk Bryghus A/S'
                    />
                    <ToggleButtonGroup className={classes.buttons} orientation="horizontal" value={view} exclusive onChange={handleChange}>
                        <ToggleButton value="production" aria-label="Production Page" className={classes.button}>Production</ToggleButton>
                        <ToggleButton value="simulation" aria-label="Simulation Page" className={classes.button}>Simulation</ToggleButton>
                        <ToggleButton value="Batches" aria-label="Batch Overview Page" className={classes.button}>Batches</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <ToggleButton value="notification" aria-label="Notification Menu" className={classes.notification}>
                    <NotificationIcon/>
                </ToggleButton>
                <Button className={classes.logout}><LogoutIcon/></Button>
            </Box>
        </React.Fragment>
            
    );
}
