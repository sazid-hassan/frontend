import React from 'react';
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';


import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import EditIcon from '@material-ui/icons/Edit';

//MUI Dialogs
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Button from '@material-ui/core/Button';




//Axios
import axios from 'helpers/axios';


import { useHistory } from 'react-router-dom';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

// function TablePaginationActions(props) {
//     const classes = useStyles1();
//     const theme = useTheme();
//     const { count, page, rowsPerPage, onPageChange } = props;


//     const handleFirstPageButtonClick = (event) => {
//         onPageChange(event, 0);
//     };

//     const handleBackButtonClick = (event) => {
//         onPageChange(event, page - 1);
//     };

//     const handleNextButtonClick = (event) => {
//         onPageChange(event, page + 1);
//     };

//     const handleLastPageButtonClick = (event) => {
//         onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };

//     return (
//         <div className={classes.root}>
//             <IconButton
//                 onClick={handleFirstPageButtonClick}
//                 disabled={page === 0}
//                 aria-label="first page"
//             >
//                 {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//             </IconButton>
//             <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//                 {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             </IconButton>
//             <IconButton
//                 onClick={handleNextButtonClick}
//                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                 aria-label="next page"
//             >
//                 {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//             </IconButton>
//             <IconButton
//                 onClick={handleLastPageButtonClick}
//                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//                 aria-label="last page"
//             >
//                 {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//             </IconButton>
//         </div>
//     );
//}

// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
// };



const useStyles2 = makeStyles({
    table: {
        minWidth: 300,
    },
});

function createData(role_name, role_id) {
    return { role_id, role_name };
}


function PaginatedTable(props) {

    const [roles, setRoles] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    //Dialog
    const [open, setOpen] = useState(false);


    const rows = roles.map(role => createData(role.name, role.id));

    const classes = useStyles2();


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const history = useHistory();

    const handleChangePage = (event, newPage) => {
        console.log('handle Page change , newPage : ' + newPage);
        setPage(newPage);
        console.log('handle Page Change * page = ' + page);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('rows per page' + event.target.value);
        setRowsPerPage(parseInt(event.target.value));
        // setPage(0);
    };





    useEffect(() => {
        setLoading(true)
        console.log('page' + page);
        axios.post('/role/get/all', {

            "per_page": rowsPerPage,
            "page": page + 1
        }
        ).then((res) => {
            const role = res.data.data;
            setRoles(role);
            setMeta(res.data.meta);
            setTotal(res.data.meta.total);
            console.log("===========================");
            // console.log(meta);
            // console.log(total);
            // console.log(res.data.data);
            setLoading(false);

        })
            .catch((error) => {
                console.error(error)
            })
    }, [page, rowsPerPage])


    if (loading) {
        return <FuseLoading />;
    }



    //Dialog


    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {

        setOpen(false);
    };

    return (
        <>

            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div"  >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID No.</TableCell>
                                    <TableCell >Name</TableCell>
                                    <TableCell >Update</TableCell>
                                    <TableCell >Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <TableRow key={row.role_name}>

                                        <TableCell style={{ width: 80 }} align="left" key={row.role_name}>
                                            {row.role_id}

                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="left" key={row.role_id}>
                                            <button onClick={() => history.push(
                                                `/role_details/${row.role_id}`,

                                            )}>
                                                {row.role_name}
                                            </button>
                                        </TableCell>
                                        <TableCell style={{ width: 80 }} align="left">

                                            <button onClick={() => history.push(
                                                `/update/${row.role_id}`,

                                            )}>
                                                <EditIcon />
                                            </button>


                                        </TableCell>

                                        <TableCell style={{ width: 80 }} align="left">
                                            <>
                                                <div>
                                                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                                        <DeleteForeverRoundedIcon />
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">{"Delete this role?"}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Once you delete the item this cannot be undone! You can loose infos of this user. Sure delete it?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => {
                                                                history.push(
                                                                    `/delete_user/${row.role_id}`
                                                                )
                                                                setOpen(false);
                                                            }} color="primary">
                                                                Allow
                                                            </Button>
                                                            <Button onClick={handleClose} color="primary" autoFocus>
                                                                DisAllow
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            </>
                                        </TableCell>


                                    </TableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 45 * emptyRows }}>
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 30]}
                                        colSpan={3}
                                        count={total}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        // onPageChange={handleChangePage}
                                        // ActionsComponent={TablePaginationActions}
                                        onChangePage={handleChangePage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Typography>
            </Container>



        </>
    );
}

export default withRouter(PaginatedTable);