import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    MenuItem,
    Select,
    Stack,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { vendorConfig } from '../../constants/app.constants';
import Autocomplete from '@mui/material/Autocomplete';
import {
    useImportVendorModel,
    useVendorProfiles,
} from '../../hooks/import.hooks';
import { SevenK } from '@mui/icons-material';
import { isEmpty } from 'lodash';
import { ModelContext } from '../App';

const VendorImport = ({ vendor }) => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [shouldFetchProfiles, setShouldFetchProfiles] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState();
    const [isImportVendorModelEnabled, setIsImportVendorModelEnabled] =
        useState(false);
    const modelId = useContext(ModelContext);
    const handleClose = () => setIsOpen(false);

    const { data: profiles } = useVendorProfiles(
        vendor,
        userName,
        password,
        shouldFetchProfiles
    );

    const onPasswordChange = ({ target: { value } }) => {
        setPassword(value);
        setShouldFetchProfiles(false);
    };

    const onUserNameChange = ({ target: { value } }) => {
        setUserName(value);
        setShouldFetchProfiles(false);
        setSelectedProfile(null);
    };

    useImportVendorModel(modelId, isImportVendorModelEnabled);

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
                <StyledDialogTitle>
                    Import your {vendorConfig[vendor].name} model
                    <img src={vendorConfig[vendor].iconSrc} height={50} />
                </StyledDialogTitle>
                <DialogContent>
                    <FormContainer>
                        <StyledInput
                            label="Username"
                            placeholder="Enter username"
                            variant="outlined"
                            onChange={onUserNameChange}
                            fullWidth
                            required
                        />
                        <StyledInput
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            onChange={onPasswordChange}
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            variant="outlined"
                            style={{ width: 180, marginBottom: 25 }}
                            disabled={!(userName && password)}
                            onClick={() => setShouldFetchProfiles(true)}
                        >
                            Get Profiles
                        </Button>
                        {shouldFetchProfiles && !isEmpty(profiles) && (
                            <StyledSelect
                                select
                                // value={selectedProfile}
                                onChange={({ target: { value } }) =>
                                    setSelectedProfile(value)
                                }
                                label="Profiles"
                            >
                                {profiles.map(({ name, id }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </StyledSelect>
                        )}
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
                        disabled={!selectedProfile}
                        onClick={() => setIsImportVendorModelEnabled(true)}
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
    height: 400px;
`;

const StyledInput = styled(TextField)`
    margin: 15px 0;
    width: 400px;
`;

const StyledSelect = styled(TextField)`
    width: 400px;
`;

const StyledDialogTitle = styled(DialogTitle)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default VendorImport;
