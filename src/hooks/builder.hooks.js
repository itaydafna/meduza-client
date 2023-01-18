import { ModelContext } from '../components/App';
import { useAllModelColumns, useTableNameById } from './tables.hooks';
import { ModelErdContext } from '../components/model-configuration/model-erd/ModelErd';
import { useContext, useState } from 'react';
import { generateKipodQuery } from '../utils/app.utils';
import { runQuery } from '../services/requests';

export const useBuilderContext = () => {
    const { isBuilderOpen, setIsBuilderOpen } = useContext(ModelErdContext);
    const closeBuilder = () => setIsBuilderOpen(false);
    const modelId = useContext(ModelContext);
    const { data: tableNameById } = useTableNameById(modelId);

    const { data: allColumns } = useAllModelColumns(modelId);

    const [columns, setColumns] = useState([]);

    const [filters, setFilters] = useState([]);
    const [filtersOperation, setFiltersOperation] = useState('AND');
    const [isLimitOn, setIsLimitOn] = useState(false);
    const [limit, setLimit] = useState('');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [orderByColumn, setOrderByColumn] = useState('');

    const [querySql, setQuerySql] = useState('');

    const onDeleteColumn = (id) => () => {
        setColumns((value) => value.filter((v) => v.id !== id));
    };

    const onDeleteFilter = (id) => () => {
        setFilters((value) => value.filter((v) => v.id !== id));
    };

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const addFilter = (filter) => setFilters((prev) => [...prev, filter]);

    const onGenerateQuery = () => {
        const query = generateKipodQuery({
            modelId,
            columns,
            filters,
            filtersOperation,
            limit,
            orderByDirection,
            orderByColumn,
            tableNameById,
        });
        runQuery(query).then((res) => setQuerySql(res.sql));
    };

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
        onGenerateQuery,
        querySql,
    };
};
