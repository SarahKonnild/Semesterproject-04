import React, { useEffect } from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import LeftArrow from '@material-ui/icons/ArrowLeft';

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Legend,
    Title, 
} from '@devexpress/dx-react-chart-material-ui';
import { NavLink } from 'react-router-dom';

// THIS PAGE WAS CREATED BY SARAH MANON PRADEL
// ENJOY! \(^o^)/** */

const useStyles = makeStyles((theme) => ({
    arrow:{
        marginRight:theme.spacing(1),
        marginTop:theme.spacing(1.5),
    },
    back:{
        backgroundColor:"#FFAAA7",
        textDecoration:"none",
        color:"#8a8a8a",
        display:"flex",
        borderRadius:"4px",
        height:"50px",
        margin:theme.spacing(3),
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    buttonText:{
        marginTop:theme.spacing(1.5),
        marginRight:theme.spacing(1.5),
        textTransform:"uppercase",

    },
    chart:{
        width:"650px",
        margin:theme.spacing(2),
    },
    chartCard:{
        width:"800px",
        height:"80%",
        margin:"5%",
        backgroundColor:"#ffffff",
        borderRadius:"4px",
        borderWidth:"2px",
        borderColor:"#98DDCA",
        borderStyle:"solid",

    },
    container:{
        width:"1700px",
        display:"inline-flex",
    },
    export:{
        backgroundColor:"#FFD3B4",
        padding:theme.spacing(1.5),
        marginTop:theme.spacing(5),
        marginBottom:theme.spacing(6.5),
        marginLeft:"30%",
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    info:{
        margin:"5% 10%",
        minWidth:"350px",
        maxWidth:"500px",
        height:"80%",
        backgroundColor:"#ffffff",
        borderRadius:"4px",
        borderWidth:"2px",
        borderColor:"#98DDCA",
        borderStyle:"solid",
    },
    label:{
        textTransform:"uppercase",
        color:"#8a8a8a",
    },
    row:{
        margin:theme.spacing(5),
    },
    table:{
        marginLeft: "7.5%",
        marginRight: "7.5%",
        maxWidth:"85%",
        marginTop: theme.spacing(3),
    },
    title:{
        fontSize:"22px",
        padding:theme.spacing(1),
        margin: theme.spacing(1),
        textTransform:"uppercase",
        color:"#8a8a8a",

    },
    value:{
        color:"#8a8a8a",
    }
}));

const data = [
    {argument:1, value:10},
    {argument:2, value:20},
    {argument:3, value:30},
]

export default class Batches extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            batchId:'',

        }
    }
    

    

    // useEffect(() => {
    //     axios.get('http://localhost:5000/batches/'+this.props.batch.data._id).then(res =>{
    //         this.setState({
    //             batchId: res.data.batchId,

    //         })
    //     })
    // })

    render(){
        return(
            <Box className="container">
                <NavLink to="/batches" className="back">
                    <LeftArrow className="arrow" align="center"/><Typography className="buttonText" align="center">back</Typography>
                </NavLink>
                <Card className="info">
                    <Typography align="center" className="title">Batchnr. Details</Typography>
                    <Table className="table">
                        <TableBody>
                            <TableRow className="row">
                                <TableCell className="label">Batch ID</TableCell>
                                <TableCell className="value">1234</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Date</TableCell>
                                <TableCell className="value">01.01.01</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Beer Type</TableCell>
                                <TableCell className="value">Wheat</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Batch Size</TableCell>
                                <TableCell className="value">1234</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Correct Beers</TableCell>
                                <TableCell className="value">1000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Defect Beers</TableCell>
                                <TableCell className="value">234</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button align="center" className="export">Export to PDF</Button>
                </Card>
                <Card className="chartCard">
                    <Chart className="chart"data={data}>
                        <ArgumentAxis/>
                        <ValueAxis/>
                        <LineSeries name="Temperature" valueField="value" argumentField="argument"/>
                        <LineSeries name="Humidity" argumentField="argument"/>
                        <LineSeries name="Vibrations" argumentField="argument"/>
                    </Chart>
                </Card>
            </Box>
        )
    } 
        
    
}