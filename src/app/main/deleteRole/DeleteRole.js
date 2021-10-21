import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


//MUI
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';


//Axios
import axios from 'helpers/axios';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function DeleteRole(props) {

    const history = useHistory();

    const id = {
        "role_id": props.match.params.id
    }


    useEffect(() =>
        axios.post('/role/delete', JSON.stringify(id)).then(res => {


            if (res.status == 204) {
                console.log("Deleted Successfull" + res.status);
                history.push('/allRoles')

            }
            else {
                alert("Failed");
                console.log("error" + res.status);
            }


        })
    )

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Delete Role Success!
                </Alert>
            </div>
        </>
    )
}
