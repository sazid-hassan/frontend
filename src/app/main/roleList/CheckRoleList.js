import React from 'react'
import { useState, useEffect } from 'react';

//Axios
import axios from 'helpers/axios';


import { useHistory } from 'react-router-dom';

export default function CheckRoleList() {
    const [permission, setpermission] = useState([]);


    //useEffects
    useEffect(() => {


        axios.get('/permission/get/all').then((res) => {
            const role = res.data.data;
            setpermission(role);

        })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const history = useHistory();

    //functions
    const goHome = () => {
        history.push('/');
    }

    return (
        <>
            <h3>Roles</h3>
            <ul>{permission.map(roles =>
                <ul key={roles.id}>{roles.name}</ul>
            )}</ul>
            <button onClick={goHome}>Go Home</button>
        </>
    )
}
