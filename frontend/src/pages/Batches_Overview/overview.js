import React, { useEffect, useState } from 'react';

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
import axios from 'axios';

import Navbar from '../../components/Navigation/navbar';
import Footer from '../../components/Footer/footer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import './overview.css';
import { Link } from 'react-router-dom';


/**
 * @author Sarah Manon Pradel
 * 
 * This page contains all of the functionality and layout related to the batches Overview page. 
 * Please feel free to collapse the useStyles constant.
 * 
 * All complex functionality in here will be documented.
 */

const useStyles = makeStyles(theme => ({
    root:{
        flexShrink:0,
        marginLeft:theme.spacing(2.5),
    },
}));

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

/**
 * This function is responsible for the pagination functionality for the table. 
 * There is a function for each type of button, and the overall function will
 * @return the div that contains the buttons that the user can interact with to
 * utilize the functionality.
 *
 */
function PaginationActions(props){
    const classes = useStyles();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return(
        <div className={classes.root}>
            <IconButton className="arrow" onClick={handleFirstPageButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}</IconButton>
            <IconButton className="arrow" onClick={handleBackButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <ArrowRight/> : <ArrowLeft/>}</IconButton>
            <IconButton className="arrow" onClick={handleNextButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <ArrowLeft/> : <ArrowRight/>}</IconButton>
            <IconButton className="arrow" onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}</IconButton>
        </div>
    )
}

/**
 * 
 * This is the React function that returns the page. It is called in the App.js file, 
 * and can always be accessed through the /batches path. 
 * 
 * @returns the graphical user interface developed in MaterialUI
 */
export default function Batches() {
    /**
     * Set the environment variables
     */
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [data, setData] = useState([]);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    function Reload() {
        window.location.reload(false);
    }

    /**
     * When the page is (re)loaded, it should pull the information from the database again
     * and write it to the data React.state
     */
    useEffect(() => {
        axios.get('http://localhost:5000/batches/').then(
            res => setData(res.data)
        )}, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    
    return (
        <Aux>
            <Navbar/>
            <TableContainer className="table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><IconButton className="refresh" onClick={Reload}><Refresh/></IconButton></TableCell>
                            <TableCell className="title" align="left">Batch ID</TableCell>
                            <TableCell className="title" align="left">Date Produced</TableCell>
                            <TableCell className="title" align="left">Beer Type</TableCell>
                            <TableCell className="title" align="left">Batch Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Figures out how to split the information in the data variable into rows */}
                        {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(batch =>(
                            <TableRow className="data" key={batch.batchId}>
                                <TableCell className="details" align="left"><Link to={"/details/"+batch._id}>Batch Details</Link></TableCell>
                                <TableCell className="id" align="left">{batch._id}</TableCell>
                                <TableCell className="date" align="left">{batch.dateProduced}</TableCell>
                                <TableCell className="type" align="left">{batch.beerType}</TableCell>
                                <TableCell className="size" align="left">{batch.batchSize}</TableCell>
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
            <Footer/>
        </Aux>
        
    );
}
