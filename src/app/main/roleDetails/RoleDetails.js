import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//MUI
import FuseLoading from '@fuse/core/FuseLoading';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


//Axios
import axios from 'helpers/axios';

//CSS
import './body.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function RoleDetails(props) {

    // const [roleID, setRoleID] = useState();
    const [permission, setPermission] = useState({

    });
    const [loading, setLoading] = useState(true);

    const roleID = props.match.params.id;

    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        axios.get('/role/details/' + roleID).then((res) => {
            setPermission(res.data.data);
            setLoading(false);

            if (res.status !== 200) {
                alert("User Not Found!")
            }
        })
            .catch((error) => {
                console.error(error)
            })
    })

    if (loading) {
        return <FuseLoading />;
    }

    return (
        <>
            <Box m={3} >
                {permission.name && (<Typography variant='h5' color='textPrimary'> User Name : {permission.name}</Typography>)
                }
                <Typography style={{ marginBottom: '2rem' }} variant='h6' color='primary'>User Permission List  </Typography>
                <br />
                <Grid container justifyContent="center" alignItems="center"
                    spacing={3}
                    wrap="wrap"
                >
                    {
                        permission.permissions && permission.permissions.map(role =>
                            <Grid spacing={1} item key={role.id}>
                                <VerifiedUserIcon style={{ marginBottom: '.2rem' }} color="primary" />
                                <Typography variant='subtitle1' color='textSecondary'
                                    display="inline"
                                >
                                    {role.name}</Typography>
                            </Grid >)
                    }
                </Grid>
            </Box>
            <div className={classes.root}>
                <Button variant="contained" color="secondary" onClick={() => history.push('/allRoles')}>
                    Go Back
                </Button>
            </div>
        </>

    )
}
