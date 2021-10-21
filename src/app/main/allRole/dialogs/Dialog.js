import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { useHistory } from 'react-router-dom';


export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const [disable, setDisable] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
        setDisable(true);
    };

    const history = useHistory();


    return (
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
                    <Button disabled={disable} onClick={handleClose} color="primary">
                        Allow
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        DisAllow
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}