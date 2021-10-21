import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


import './demo.css';
import axios from 'helpers/axios';

import { AbacProvider, AllowedTo } from "react-abac";

import { Link } from 'react-router-dom';


const token = "7|MkrATfZTnv6lxOPWonIj9ciCziYAYSdfFi2OnIZJ";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))



function DemoComponent() {

    const [permission, setpermission] = useState([]);


    useEffect(() => {
        axios.get('/permission/get/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            const role = res.data.data;
            console.log(role);
            setpermission(role);
        })
            .catch((error) => {
                console.error(error)
            })



    }, [])


    // My Codes New

    const roles = {
        ADMIN: "ADMIN",
        USER: "USER"
    };


    const permissions = {
        ADD_USER: "ADD_USER",
        VISIT_PROFILE: "VISIT_PROFILE"
    };

    const role_access = {
        [roles.ADMIN]: {
            [permissions.ADD_USER]: true,
            [permissions.VISIT_PROFILE]: true
        },
        [roles.USER]: {
            [permissions.VISIT_PROFILE]: true
        }
    }


    const user = {
        id: token,
        roles: [roles.ADMIN]
    }

    const showOutput = () => {
        console.log('====================================');
        console.log("Hello");
        console.log('====================================');
    }

    useEffect(() => {
        console.log("USERS PAGE LANDED");
    }, []);


    //Design
    const classes = useStyles();



    return (
        <div className={classes.root}>
            <h1>Authorization</h1>
            <h3>Visit Roles</h3>
            <ul>
                {permission.map(roles =>
                    <li key={roles.id}>{roles.name}</li>
                )}
            </ul>

            <AbacProvider rules={role_access} user={user} roles={user.roles}>
                <AllowedTo perform={permissions.ADD_USER}>
                    <Link to="/add_users">
                        <Button variant="contained" color="secondary" onClick={showOutput}>Add User</Button>
                    </Link>
                </AllowedTo>
            </AbacProvider>

        </div>
    )

}

export default DemoComponent;