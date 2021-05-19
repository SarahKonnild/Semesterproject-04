import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    container:{
        

    },
    github:{
        alignContent:"center",

    },
    text:{
        fontSize:"14px",
        color:"#cccccc",
        
    },
}));

export default function Footer(props){
    const classes = useStyles();
    const {description, title} = props;

    return(
        <React.Fragment>
            <footer className={classes.footer}>
                <Box className={classes.container}>
                    <Typography className={classes.text} variant="h5" align="center" gutterBottom>
                        Refslevbæk Bryghus A/S · © Copyright Group ST04 · ST4-PRO · BEng Software Technology · University of Southern Denmark, SDU
                    </Typography>
                    {/* <GitHubIcon className={classes.github} /> */}
                </Box>
            </footer>
        </React.Fragment>
    )
}