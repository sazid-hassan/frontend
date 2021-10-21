import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
// import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
// import Icon from '@material-ui/core/Icon';
// import axios from 'axios';
import React from 'react';
// import Moment from 'react-moment';





function DemoUpdate(props) {

    if (!props.data) {
        return null;
    }

    // console.log(props);
    const temp = [];
    // props.data.optins.map((value) =>
    //     temp.push(value.optin_id)
    // )

    const handlcheck = (id) => {
        return temp.includes(id)
    }

    const checkboxs = props.optins.map((opt, key) =>
        <FormControlLabel key={key}
            control={<Checkbox checked={handlcheck(opt.id)} name={opt.id.toString()} />}
            label={opt.name}
        />
    )

    // const { general, work, contact, groups, friends } = data;

    return (
        <div className="md:flex max-w-2xl">
            <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
                <FuseAnimateGroup
                    enter={{
                        animation: 'transition.slideUpBigIn'
                    }}
                >
                    <Card className="w-full mb-16 rounded-8 shadow">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="px-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                    General Information
                                </Typography>
                                {/* <Button color="inherit">Login</Button> */}

                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Name</Typography>
                                <Typography>{props.data.name}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Email</Typography>
                                <Typography>{props.data.email}</Typography>
                            </div>


                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                <Typography>{props.data.phone}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Role</Typography>
                                <Chip size="small" label={props.data.roleNames} color="secondary" />
                                {/* <Typography>{props.data.roleNames}</Typography> */}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Status</Typography>
                                <Chip size="small" label={props.data.status === "active" ? "Active" : "Deactive"} color="secondary" />
                                {/* <Typography>{props.data.roleNames}</Typography> */}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Address</Typography>
                                <Typography>{props.data.address}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Country</Typography>
                                <Typography>{props.data.country}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Employment Status</Typography>
                                <Typography>{props.data.employment_status}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Residential Status</Typography>
                                <Typography>{props.data.residential_status}</Typography>
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Where Did You Hear About Us</Typography>
                                <Typography>{props.data.hear_about}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Profile Status</Typography>
                                <Chip size="small" label={props.data.profile_status === "new" ? "New" : "Updated By Client"} color="secondary" />
                                {/* <Typography>{props.data.roleNames}</Typography> */}
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Jointed At</Typography>
                                {/* <Typography>
                                    <Moment format="DD/MM/YYYY">
                                        {props.data.created_at}
                                    </Moment>

                                </Typography> */}
                            </div>
                            <div className="mb-24">
                                <Typography><b>Opt In Choice</b></Typography>
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend"></FormLabel> */}

                                    <FormGroup>
                                        {checkboxs}
                                    </FormGroup>
                                </FormControl>

                            </div>
                        </CardContent>
                    </Card>

                </FuseAnimateGroup>
            </div>


        </div>
    );
}

export default DemoUpdate;
