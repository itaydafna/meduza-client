import { Badge, Button, Fab, Popover, styled } from '@mui/material';
import dbtIcon from '../../assets/dbt.png';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useImportDbtModel } from '../../hooks/import.hooks';
import { useContext, useState } from 'react';
import { ModelContext } from '../App';

const DbtImportButton = () => {
    const [isDbtQueryEnabled, setIsDbtQueryEnabled] = useState(false);

    const modelId = useContext(ModelContext);

    const { isLoading } = useImportDbtModel(modelId, isDbtQueryEnabled);

    const [dbtPopoverAnchorEl, setDbtPopoverAnchor] = useState(null);
    const [dbtFile, setDbtFile] = useState('');

    const onDbtFileInput = ({ target: { value } }) => setDbtFile(value);

    const handleDbtPopoverOpen = (event) => {
        setDbtPopoverAnchor(event.currentTarget);
    };

    const handleDbtPopoverClose = () => {
        setDbtPopoverAnchor(null);
    };

    const isDbtPopoverOpen = Boolean(dbtPopoverAnchorEl);

    const closeDbtPopover = () => {
        setDbtPopoverAnchor(null);
        setDbtFile('');
    };

    const onDbtSubmit = () => {
        closeDbtPopover();
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
                <DbtFormContainer>
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
                            badgeContent={!!dbtFile ? 1 : null}
                            color="success"
                        >
                            <UploadFileIcon />
                        </Badge>
                        <input type="file" hidden onChange={onDbtFileInput} />
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
                            {dbtFile.substring(dbtFile.lastIndexOf('\\') + 1)}
                        </Typography>
                    </div>
                    <DbtFormActions>
                        <Button variant="outlined" onClick={closeDbtPopover}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!dbtFile}
                            variant="contained"
                            onClick={onDbtSubmit}
                        >
                            Submit
                        </Button>
                    </DbtFormActions>
                </DbtFormContainer>
            </Popover>
        </>
    );
};

const DbtFormContainer = styled('div')`
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
