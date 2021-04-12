import React from 'react';

import logo from ''

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    logo:{
        
    },
    production:{
        textTransform:"uppercase",
        padding:theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        "&:hover":{
            backgroundColor:"#D5ECC2 !important"
        }
    }
}));

export default function Navbar(props){
    const classes = useStyles();

    return(
        <React.Fragment>
            <img className={classes.logo} src="" alt="Refslevbæk Bryghus A/S"></img>
            <Button className={classes.production}>Production</Button>
        </React.Fragment>
    )
}