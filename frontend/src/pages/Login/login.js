import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    button:{
        padding:theme.spacing(2),
        margin:theme.spacing(2),
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA !important",
        },
    },
    container:{
        backgroundColor:"#ffffff",
        borderRadius:"4px",
        borderWidth:"2px",
        borderColor:"#98DDCA",
        borderStyle:"solid",
        height:"400px",
        minWidth:"280px",
        maxWidth:"400px",
        direction:"column",
        marginTop:"10%",
        marginBottom:"10%",
    },
    form:{
        
    },
    input:{
        margin:theme.spacing(2),
        
    },
    title:{
        fontSize:"22px",
        textTransform:"uppercase",
        color:"#8a8a8a",
        padding:theme.spacing(2),
        marginTop:theme.spacing(4),
    },
    
}));

export default function Login(props){
    const classes = useStyles();

    // SET UP AUTHENTICATION BACKEND CALL
    const handleAuthentication = (event) =>{
        
    }
    
    return(
        <Box align="center" className={classes.container}>
            <Typography className={classes.title}>Sign in</Typography>
            <form className={classes.form} autoComplete="off">
                {/* NEED TO CHANGE THE COLOUR OF THE HIGHLIGHT SO IT AIN'T STANDARD BLUE. COSMETIC, NOT NECESSARY */}
                {/* FIX: TEXTFIELDS NOT ALIGNED VERTICALLY WHEN MAXIMISED WINDOW. */}
                <TextField required id="username" label="Username" className={classes.input}></TextField>
                <TextField required id="password" type="password" label="Password" className={classes.input}></TextField>
            </form>
            <Button className={classes.button} onClick={handleAuthentication}>Sign in</Button>
        </Box>
    )
    
}