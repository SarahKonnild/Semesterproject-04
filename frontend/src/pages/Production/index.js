import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

}));

export default function Production(props){
    const classes = useStyles();

    return(
        <>
        <div class="left-prod">
        <p>Production works!</p>
        <Button>EnKnap</Button></div>

        <div class="right-prod">

        </div>

        </>
    )
}