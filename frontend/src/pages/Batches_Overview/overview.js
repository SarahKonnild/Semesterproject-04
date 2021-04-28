import React, { useEffect, useState} from 'react';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Refresh from '@material-ui/icons/Cached';
import axios from 'axios'

import './overview.css';
import { Link } from 'react-router-dom';


// THIS PAGE WAS CREATED BY SARAH MANON PRADEL
// ENJOY! \(^o^)/** */

const useStyles = makeStyles(theme => ({
    arrow:{
        '&:hover':{
            backgroundColor:'#98DDCA'
        }
    },
    button:{
        borderRadius:"5px",
        textDecoration: 'none', 
        color:'#8a8a8a',
        backgroundColor:'#FFD3B4',
        textTransform: 'uppercase',
        padding:theme.spacing(2),
        marginLeft:theme.spacing(4),
        border:"none",
        '&:hover': {
            backgroundColor: '#98DDCA !important',
        },
    },
    checkbox:{
        '.MuiCheckbox-colorSecondary.Mui-checked':{
            color: "#cbac3b",
        }
    },
    chosen:{

    },
    data:{
        '&:hover':{
            backgroundColor:'#D5ECC2',
        },
        '&:.Mui-selected':{
            backgroundColor:'#cbac3b'
        },
    },
    date:{
        color:'#8a8a8a',
    },
    footer:{
        display:"flex",
        paddingLeft:"12.5%",
        paddingRight:"12.5%",
        paddingTop:"1.5%",
        maxWidth:"75%",
    },
    header:{
        
    },
    id:{
        color:'#8a8a8a',
    },
    refresh:{
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    root:{
        flexShrink:0,
        marginLeft:theme.spacing(2.5),
    },
    rows:{

    },
    size:{
        color:'#8a8a8a',
    },
    table:{
        paddingLeft:"12.5%",
        paddingRight:"12.5%",
        paddingTop:"1.5%",
        maxWidth:"75%",
        border:"2px",
    },
    title:{
        textTransform:'uppercase',
        color:'#8a8a8a',
        fontSize:'16px',
    },
    type:{
        color:'#8a8a8a',
    },
}));

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
}

function PaginationActions(props){
    const classes = useStyles();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page-1);
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    }
    
    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count/rowsPerPage) -1));
    }

    return(
        <div className={classes.root}>
            <IconButton className={classes.arrow} onClick={handleFirstPageButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleBackButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <ArrowRight/> : <ArrowLeft/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleNextButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <ArrowLeft/> : <ArrowRight/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}</IconButton>
        </div>
    )
}

export default function Batches() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [data, setData] = useState([]);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    function Reload(){
        window.location.reload(false);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/batches/').then(
            res => setData(res.data),
            res => console.log(res.data)
        )}, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    
    return (
        <TableContainer className={classes.table}>
            <Table>
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell><IconButton className={classes.refresh} onClick={Reload}><Refresh/></IconButton></TableCell>
                        <TableCell className={classes.title} align="left">Batch ID</TableCell>
                        <TableCell className={classes.title} align="left">Date Produced</TableCell>
                        <TableCell className={classes.title} align="left">Beer Type</TableCell>
                        <TableCell className={classes.title} align="left">Batch Size</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(batch =>(
                        <TableRow className={classes.data} key={batch.batchId}>
                            <TableCell className="details" align="left"><Link to={"/details/"+batch._id}>Batch Details</Link></TableCell>
                            <TableCell className={classes.id} align="left">{batch.batchId}</TableCell>
                            <TableCell className={classes.date} align="left">{batch.dateProduced}</TableCell>
                            <TableCell className={classes.type} align="left">{batch.beerType}</TableCell>
                            <TableCell className={classes.size} align="left">{batch.batchSize}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height:53 * emptyRows}}>
                            <TableCell colSpan={4}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter className={classes.footer}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={1}
                            colSpan={2}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            ActionsComponent={PaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}