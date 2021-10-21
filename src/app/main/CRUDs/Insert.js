import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Axios
import axios from 'helpers/axios';

// import "./insertRole.css"

//MUI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FuseLoading from '@fuse/core/FuseLoading';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function UpdateNew() {

    //MUI
    const classes = useStyles();

    //States
    const [permission, setpermission] = useState([]);
    const [data, setData] = useState();
    const [checkedRoles, setCheckedRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(false);
    const [myAlert, setMyAlert] = useState(false);

    const history = useHistory();

    //useEffects
    useEffect(() => {


        axios.get('/permission/get/all').then((res) => {
            const role = res.data.data;
            setpermission(role);
            setLoading(false);


        })
            .catch((error) => {
                console.error(error)
            })
    }, [])



    const handleSubmit = (event) => {
        setDisable(true);
        event.preventDefault();
        const roles = checkedRoles.map(name => name.name)
        const newUser = {
            role_name: data,
            permissions: roles
        }

        axios.post('/role/insert', JSON.stringify(newUser)).then(res => {


            if (res.status == 201) {

                alert('Success!')
                setMyAlert(true);
                // console.log("Added Successfull" + res);
                history.push('/allRoles')


            }
            else {
                alert('Error!')
                console.log("error" + res.status);
            }
        })

    }

    const handleChecked = (event) => {

        const rolename = event.target.name;
        // setCheckedRoles([...checkedRoles, { [name]: event.target.checked }]);
        setCheckedRoles([...checkedRoles, { name: rolename }]);
    }
    if (loading) {
        return <FuseLoading />;
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ margin: 10 }} >
                <TextField
                    id="outlined-basic"
                    label="Input Role Name"
                    variant="outlined"
                    onChange={event => setData(event.target.value)}
                    required
                />
                <br />
                <FormControl component="fieldset" className={classes.formControl}>
                    <label>Select Permissions: </label>
                    <br />
                    <div>
                        <Grid container item xs={12} spacing={3}>
                            {
                                permission.map(role =>
                                    <FormGroup>
                                        <Grid item xs={4} sm={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={handleChecked}
                                                        id={role.id}
                                                        value={checkedRoles[role.name]}
                                                        name={role.name}
                                                    />
                                                }
                                                label={role.name}
                                            />
                                        </Grid>
                                    </FormGroup>
                                )

                            }
                        </Grid>
                    </div>



                    <button><Button disabled={disable} variant="contained" color="secondary">
                        Submit
                    </Button></button>
                </FormControl>
            </form>

        </>
    )
}
