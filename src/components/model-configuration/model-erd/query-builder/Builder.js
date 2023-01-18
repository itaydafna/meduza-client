import {
    Button,
    Chip,
    IconButton,
    styled,
    Switch,
    TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAllModelColumns } from '../../../../hooks/tables.hooks';
import React, { useContext, useState } from 'react';
import { ModelContext } from '../../../App';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import {
    COLUMN_TYPE_ICONS
} from '../../../../constants/app.constants';
import { size } from 'lodash';
import AddFilterDialog from './AddFilterDialog';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';

const Builder = ({ closeBuilder }) => {
    const modelId = useContext(ModelContext);

    const { data: allColumns } = useAllModelColumns(modelId);

    const [columns, setColumns] = useState([]);

    const [filters, setFilters] = useState([]);
    const [filtersOperation, setFiltersOperation] = useState('AND');
    const [isLimitOn, setIsLimitOn] = useState(false);
    const [limit, setLimit] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASCENDING');
    const [orderByColumn, setOrderByColumn] = useState('')
    const onDeleteColumn = (id) => () => {
        setColumns((value) => value.filter((v) => v.id !== id));
    };

    const onDeleteFilter = (id) => () => {
        setFilters((value) => value.filter((v) => v.id !== id));
    };

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const addFilter = (filter) => setFilters((prev) => [...prev, filter]);

    return (
        <BuilderContainer
            key={1}
            initial={{ translateX: '-40vw' }}
            animate={{
                translateX: 0,
                transition: { duration: 0.4 },
            }}
            exit={{
                translateX: '-40vw',
                transition: { duration: 0.4 },
            }}
        >
            <StyledBackButton onClick={closeBuilder}>
                <ArrowBackIcon /> Back to model
            </StyledBackButton>
            <Typography variant="h6" mb={1}>
                Select Columns:
            </Typography>
            <Autocomplete
                multiple
                id="grouped-demo"
                value={columns}
                onChange={(e, newValue) => setColumns(newValue)}
                options={allColumns}
                disableCloseOnSelect
                groupBy={(option) => option.tableName}
                getOptionLabel={(option) => option.name}
                renderTags={() => null}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} label="Select Columns" />
                )}
                renderOption={(props, option, { selected }) => (
                    <li
                        style={{ display: 'flex', alignItems: 'center' }}
                        {...props}
                    >
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {COLUMN_TYPE_ICONS[option.type]}
                        <span style={{ marginLeft: '3px' }}>{option.name}</span>
                    </li>
                )}
            />

            <Box
                mt={3}
                sx={{
                    '& > :not(:last-child)': { marginRight: 1 },
                    '& > *': { marginBottom: 1 },
                }}
            >
                {columns.map((v) => (
                    <Chip
                        sx={{ marginBottom: 1 }}
                        color="primary"
                        variant="outlined"
                        key={v.id}
                        label={v.name}
                        onDelete={onDeleteColumn(v.id)}
                    />
                ))}
            </Box>
            <HeaderRow>
                <Typography variant="h6" mr={1}>
                    Add Filters:
                </Typography>
                <IconButton
                    onClick={() => setIsFilterDialogOpen(true)}
                    variant="outlined"
                    color="primary"
                >
                    <FilterAltIcon />
                </IconButton>
            </HeaderRow>
            {size(filters) > 1 && (
                <FiltersActions>
                    <ToggleButtonGroup
                        color="primary"
                        value={filtersOperation}
                        exclusive
                        onChange={({ target: { value } }) =>
                            setFiltersOperation(value)
                        }
                        aria-label="Platform"
                    >
                        <ToggleButton value="AND">And</ToggleButton>
                        <ToggleButton value="OR">Or</ToggleButton>
                    </ToggleButtonGroup>
                </FiltersActions>
            )}

            <Box
                mt={3}
                sx={{
                    '& > :not(:last-child)': { marginRight: 1 },
                    '& > *': { marginBottom: 1 },
                }}
            >
                {filters.map((f) => (
                    <Chip
                        sx={{ marginBottom: 1 }}
                        color="primary"
                        variant="outlined"
                        key={f.id}
                        label={`${f.column.name} ${f.operator.label} ${f.value}`}
                        onDelete={onDeleteFilter(f.id)}
                    />
                ))}
            </Box>
            <HeaderRow>
                <Typography variant="h6" mr={1}>
                    Limit:
                </Typography>
                <Switch
                    checked={isLimitOn}
                    onChange={() => setIsLimitOn((prev) => !prev)}
                />
            </HeaderRow>
            <StyledTextField
                disabled={!isLimitOn}
                label="Limit"
                type="number"
                value={limit}
                onChange={({ target: { value } }) =>
                    setLimit(value)
                }
            />

            <AddFilterDialog
                isOpen={isFilterDialogOpen}
                close={() => setIsFilterDialogOpen(false)}
                addFilter={addFilter}
            />
            <HeaderRow>
                <Typography variant="h6" mr={10}>
                    Order By:
                </Typography>
                <FiltersActions>
                    <ToggleButtonGroup
                        color="primary"
                        value={orderByDirection}
                        exclusive
                        onChange={({ target: { value } }) =>
                            setOrderByDirection(value)
                        }
                    >
                        <ToggleButton value="ASCENDING">Ascending</ToggleButton>
                        <ToggleButton value="DESCENDING">Descending</ToggleButton>
                    </ToggleButtonGroup>
                </FiltersActions>
            </HeaderRow>
            <StyledSelect
                value={orderByColumn}
                onChange={(e, newValue) => setOrderByColumn(newValue)}
                options={allColumns}
                groupBy={(option) => option.tableName}
                getOptionLabel={(option) => option.name}
                renderTags={() => null}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} label="Order by" />
                )}
                renderOption={(props, option, { selected }) => (
                    <li
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        {...props}
                    >
                        {COLUMN_TYPE_ICONS[option.type]}
                        <span style={{ marginLeft: '3px' }}>
                                    {option.name}
                                </span>
                    </li>
                )}
            />
        </BuilderContainer>
    );
};

const BuilderContainer = styled(motion.div)`
    background: white;
    position: absolute;
    height: 100%;
    width: 40vw;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 50px 10px 0 25px;
`;

const StyledBackButton = styled(Button)`
    position: absolute;
    top: 5px;
    left: 10px;
`;

const HeaderRow = styled('div')`
    display: flex;
    align-items: center;
    margin: 30px 0;
`;

const FiltersActions = styled('div')`
    display: flex;
    align-items: center;
`;

const FiltersList = styled('div')`
    height: 150px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const FilterListItem = styled('div')``;

const StyledTextField = styled(TextField)`
    width: 300px;
`

const StyledSelect = styled(Autocomplete)`
    margin-bottom: 20px;
`;

export default Builder;
