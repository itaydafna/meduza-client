import { Badge, Button, Fab, Popover, styled } from '@mui/material';
import dbtIcon from '../../assets/dbt.png';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useImportDbtModel } from '../../hooks/import.hooks';
import { useContext, useState } from 'react';
import { ModelContext } from '../App';
import { loadDbtModel } from '../../services/requests';

const DbtImportButton = () => {
    const [isDbtQueryEnabled, setIsDbtQueryEnabled] = useState(false);

    const disableDbtQuery = () => setIsDbtQueryEnabled(false);

    const modelId = useContext(ModelContext);

    const [dbtPopoverAnchorEl, setDbtPopoverAnchor] = useState(null);
    const [dbtInput, setDbtInput] = useState('');
    const [dbtFile, setDbtFile] = useState(null);

    const { isLoading } = useImportDbtModel({
        modelId,
        isEnabled: !!isDbtQueryEnabled && !!dbtFile,
        dbtFile,
        disableDbtQuery
    });

    const onDbtFileInput = ({ target: { value } }) => setDbtInput(value);

    const handleDbtPopoverOpen = (event) => {
        setDbtPopoverAnchor(event.currentTarget);
    };

    const handleDbtPopoverClose = () => {
        setDbtPopoverAnchor(null);
    };

    const isDbtPopoverOpen = Boolean(dbtPopoverAnchorEl);

    const closeDbtPopover = () => {
        setDbtPopoverAnchor(null);
        setDbtInput('');
    };

    const onDbtSubmit = (e) => {
        e.preventDefault();
        closeDbtPopover();
        setDbtFile(e.target.dbt.files[0]);
        setIsDbtQueryEnabled(true);
    };
    return (
        <>
            <Fab color="secondary" onClick={handleDbtPopoverOpen}>
                <img src={dbtIcon} height={30}></img>
            </Fab>
            <Popover
                open={isDbtPopoverOpen}
                anchorEl={dbtPopoverAnchorEl}
                onClose={handleDbtPopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <DbtFormContainer onSubmit={onDbtSubmit}>
                    <Typography
                        sx={{ p: 2 }}
                        variant="subtitle1"
                        fontWeight="500"
                        fontSize="1.2rem"
                    >
                        Upload your DBT schema file:
                    </Typography>

                    <Button variant="outlined" component="label">
                        <Badge
                            badgeContent={!!dbtInput ? 1 : null}
                            color="success"
                        >
                            <UploadFileIcon />
                        </Badge>
                        <input
                            type="file"
                            accept=".yml"
                            hidden
                            onChange={onDbtFileInput}
                            id="dbt"
                        />
                    </Button>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Typography
                            sx={{
                                p: 2,
                                color: '#656363',
                            }}
                            variant="span"
                            textAlign="center"
                            noWrap
                        >
                            {dbtInput.substring(dbtInput.lastIndexOf('\\') + 1)}
                        </Typography>
                    </div>
                    <DbtFormActions>
                        <Button variant="outlined" onClick={closeDbtPopover}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!dbtInput}
                            variant="contained"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DbtFormActions>
                </DbtFormContainer>
            </Popover>
        </>
    );
};

const DbtFormContainer = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 310px;
    height: 200px;
`;

const DbtFormActions = styled(`div`)`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
`;

export default DbtImportButton;
