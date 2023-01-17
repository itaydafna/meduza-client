import genieLogo from '../../assets/genie-icon.png';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Stack,
    styled, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import {vendorConfig} from "../../constants/app.constants";


const VendorImport = ({ vendor }) => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Import your {vendorConfig[vendor].name} model</DialogTitle>
                <DialogContent>
                    <FormContainer>
                        <StyledInput
                            label="Username"
                            placeholder="Enter username"
                            variant="outlined"
                            onChange={({})=>{}}
                            fullWidth
                            required
                        />
                        <StyledInput
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </FormContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color={'primary'}
                        onClick={handleClose}
                        disabled={!(!!userName && !!password)}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Fab color="warning" onClick={() => setIsOpen(true)}>
                <img src={vendorConfig[vendor].iconSrc} height={30}></img>
            </Fab>
        </>
    );
};

const FormContainer = styled('div')`
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 500px;
`;

const StyledInput = styled(TextField)`
    margin: 10px 0;
    width: 200px;
`

export default VendorImport;
