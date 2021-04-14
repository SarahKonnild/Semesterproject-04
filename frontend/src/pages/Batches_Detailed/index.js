import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    card:{
        margin:"5% 5% 5% 10%",
        height:"80%",
        width:"30%",
        backgroundColor:"#cbac3b",
    },
    container:{
        height:700,
    }
}));

export default function Batches(props){
    const classes = useStyles();

    return(
        <Box className={classes.container}>
            <Card className={classes.card}>
                <p>Works</p>
            </Card>
        </Box>
    )
    
}