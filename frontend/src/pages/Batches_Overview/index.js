import * as React from 'react';

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


const useStyles = makeStyles(theme => ({
    button:{
        borderRadius:"5px",
        textDecoration: 'none', 
        color:'#8a8a8a',
        textTransform: 'uppercase',
        padding:theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        border:"none",
        '&:hover': {
            backgroundColor: '#98DDCA !important',
        },
    },
    chosen:{

    },
    root:{
        flexShrink:0,
        marginLeft:theme.spacing(2.5),
    },
    rows:{

    },
}));

//use when connected to backend
function createData(id, date, type, size){
    return {id, date, type, size};
}

const rows = [
    {id:1, date:"03.03.2021", type:"Wheat", size:1000},
    {id:2, date:"03.04.2021", type:"Wheat", size:2000},
    {id:3, date:"03.05.2021", type:"Wheat", size:3000},
    {id:4, date:"03.06.2021", type:"Wheat", size:4000},
    {id:5, date:"03.07.2021", type:"Wheat", size:5000},
    {id:6, date:"03.08.2021", type:"Wheat", size:6000},
    {id:7, date:"03.09.2021", type:"Wheat", size:1000},
    {id:8, date:"03.10.2021", type:"Wheat", size:2000},
    {id:9, date:"03.11.2021", type:"Wheat", size:3000},
    {id:10, date:"03.12.2021", type:"Wheat", size:4000},
    {id:11, date:"03.01.2022", type:"Wheat", size:5000},
    {id:12, date:"03.02.2022", type:"Wheat", size:6000},
    {id:13, date:"03.03.2022", type:"Wheat", size:1000},
    {id:14, date:"03.04.2022", type:"Wheat", size:2000},
    {id:15, date:"03.05.2022", type:"Wheat", size:3000},
    {id:16, date:"03.06.2022", type:"Wheat", size:4000},
].sort((a, b) => (a.id < b.id ? -1 : 1));

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
}

function PaginationActions(props){
    const classes=useStyles();
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
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}</IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <ArrowRight/> : <ArrowLeft/>}</IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <ArrowLeft/> : <ArrowRight/>}</IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}</IconButton>
        </div>
    )
}



export default function Batches() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(12);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Batch ID</TableCell>
                        <TableCell align="left">Date Produced</TableCell>
                        <TableCell align="left">Beer Type</TableCell>
                        <TableCell align="left">Batch Size</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage>0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) =>(
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            <TableCell align="left">{row.size}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height:53 * emptyRows}}>
                            <TableCell colSpan={4}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={1}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            ActionsComponent={PaginationActions}
                        ></TablePagination>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}