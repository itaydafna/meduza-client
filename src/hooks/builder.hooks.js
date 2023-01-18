import { ModelContext } from '../components/App';
import { useAllModelColumns } from './tables.hooks';
import { ModelErdContext } from '../components/model-configuration/model-erd/ModelErd';
import { useContext, useState } from 'react';

export const useBuilderContext = () => {
    const { isBuilderOpen, setIsBuilderOpen } = useContext(ModelErdContext);
    const closeBuilder = () => setIsBuilderOpen(false);
    const modelId = useContext(ModelContext);

    const { data: allColumns } = useAllModelColumns(modelId);

    const [columns, setColumns] = useState([]);

    const [filters, setFilters] = useState([]);
    const [filtersOperation, setFiltersOperation] = useState('AND');
    const [isLimitOn, setIsLimitOn] = useState(false);
    const [limit, setLimit] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASCENDING');
    const [orderByColumn, setOrderByColumn] = useState('');
    const onDeleteColumn = (id) => () => {
        setColumns((value) => value.filter((v) => v.id !== id));
    };

    const onDeleteFilter = (id) => () => {
        setFilters((value) => value.filter((v) => v.id !== id));
    };

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const addFilter = (filter) => setFilters((prev) => [...prev, filter]);

    return {
        isBuilderOpen,
        closeBuilder,
        allColumns,
        setIsBuilderOpen,
        columns,
        setColumns,
        filters,
        filtersOperation,
        setFiltersOperation,
        isLimitOn,
        setIsLimitOn,
        limit,
        setLimit,
        orderByDirection,
        setOrderByDirection,
        orderByColumn,
        setOrderByColumn,
        onDeleteColumn,
        isFilterDialogOpen,
        setIsFilterDialogOpen,
        onDeleteFilter,
        addFilter,
    };
};
