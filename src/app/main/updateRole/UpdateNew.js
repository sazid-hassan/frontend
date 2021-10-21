import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import "./style.css"

//Axios
import axios from 'helpers/axios';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import FuseLoading from '@fuse/core/FuseLoading';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    froot: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
}));

function handleClickBC(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function UpdateNew(props) {

    const classes = useStyles();


    //States
    const [permission, setpermission] = useState([]);
    const [checkedRoles, setCheckedRoles] = useState([]);
    const [userID, setUserID] = useState();
    const [currentName, setCurrentName] = useState();
    const [loading, setLoading] = useState(true);
    const [prvPermissions, setPrvPermissions] = useState([]);
    const [newPermissionsArray, setNewPermissionsArray] = useState([])
    const [disable, setDisable] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const history = useHistory();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    console.log("======================")
    console.log(prvPermissions);
    console.log("**************");
    console.log(permission);
    console.log('###############');
    console.log(checkedRoles);

    useEffect(() => {


        axios.get('/role/details/' + props.match.params.id).then((res) => {
            // console.log(res.data.data);
            setCurrentName(res.data.data.name);
            setPrvPermissions(res.data.data.permissions);

            if (res.status !== 200) {
                alert("User Not Found!")
            }
        })
            .catch((error) => {
                console.error(error)
            })

        setUserID(props.match.params.id);
        axios.get('/permission/get/all').then((res) => {
            const role = res.data.data;
            setpermission(role);
            setLoading(false);

        })
            .catch((error) => {
                console.error(error)
            })




        // permission.map(role => {
        //     setNewPermissionsArray(prvPermissions.filter(p => {
        //         if (p.name === role.name) {
        //             role = p;
        //         }
        //         else {
        //             return role;
        //         }
        //     }))
        //     console.log(newPermissionsArray)
        // })
    }, [])




    const handleSubmit = (event) => {
        console.log(props.ID);
        setDisable(true);
        event.preventDefault();
        const roles = checkedRoles.map(name => name.name)
        const UpdateUser = {
            role_id: userID,
            role_name: currentName,
            permissions: roles
        }

        axios.post('/role/update', JSON.stringify(UpdateUser)).then(res => {


            if (res.status == 200) {

                // console.log("Added Successfull" + res);
                setOpen(true);
                setSuccess(true);
                history.push('/allRoles');


            }
            else {
                setOpen(true);
                setError(true);
                console.log("error" + res.status);
            }
        })

    }



    const handleChecked = (event) => {

        const rolename = event.target.name;
        // console.log(event.target.checked);

        setCheckedRoles([...checkedRoles, { name: rolename }]);

    }


    if (loading) {
        return <FuseLoading />;
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" color="inherit" onClick={handleClickBC}>
                    Home
                </Link>
                <Link color="inherit" to="/allRoles" onClick={handleClickBC}>
                    All Roles
                </Link>
                <Typography color="textPrimary">Update</Typography>
            </Breadcrumbs>
            {/* <Snackbar
                anchorOrigin={{ vertical: 'top-left', horizontal: 'center' }}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {success && "Updated Succesfully!"}
                    {error && "Failed to Update. Try rename"}
                </Alert>
            </Snackbar> */}
            <div className={classes.froot}>
                {"Update Role"}
            </div>
            <div className={classes.root}>

                <form onSubmit={handleSubmit}>
                    <div class="input-container">
                        <input
                            type="text"
                            value={currentName}
                            required
                            onChange={event => setCurrentName(event.target.value)}
                        />

                    </div>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <label>Select Permissions: </label>
                        <br />
                        <div>
                            <Grid container item xs={12} spacing={3}>
                                {
                                    permission.map((role) => {
                                        return <FormGroup key={role.id}>
                                            <Grid item xs={4} sm={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={handleChecked}
                                                            id={role.id}
                                                            value={checkedRoles[role.name]}

                                                            name={role.name}
                                                        // checked={
                                                        //     for (let i = 0; i < prvPermission.length; i++) {
                                                        //         if (prvPermissions[i].name === role.name) ? true : false;
                                                        //     }
                                                        // }
                                                        />
                                                    }
                                                    label={role.name}
                                                />
                                            </Grid>
                                        </FormGroup>
                                    }
                                    )

                                }
                            </Grid>
                        </div>

                        <br />

                        <button ><Button disabled={disable} variant="contained" color="secondary">
                            Submit
                        </Button></button>
                    </FormControl>

                </form>
            </div>
            {/* <DemoUpdate /> */}
        </>
    )
}





