import salesforceLogo from '../assets/sf-logo.png';
import genieLogo from '../assets/genie-icon.png';
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const JOIN_TYPE = {
    INNER: 'INNER',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    FULL: 'FULL'
}

export const COLUMN_TYPE = {
    NUMBER: 'NUMBER',
    STRING: 'STRING',
    DATE: 'DATE'
}


export const AGGREGATION_FUNCTION = {
    AVERAGE: 'AVERAGE',
    SUM: 'SUM',
    MIN: 'MIN',
    MAX: 'MAX',
    NONE: 'NONE'
}

export const VENDORS = {
    GENIE: 'GENIE',
    DATORAMA: 'DATORAMA'
}

export const vendorConfig = {
    [VENDORS.GENIE] : {
        id: VENDORS.GENIE,
        iconSrc: genieLogo,
        name: "Genie"
    },
    [VENDORS.DATORAMA] : {
        id: VENDORS.DATORAMA,
        iconSrc: salesforceLogo,
        name: "Salesforce DI"
    }
}

export const COLUMN_TYPE_ICONS = {
    [COLUMN_TYPE.STRING]: <TextFieldsIcon />,
    [COLUMN_TYPE.NUMBER]: <NumbersIcon />,
    [COLUMN_TYPE.DATE]: <CalendarMonthIcon />,
};


export const NUMBER_FILTER_OPTIONS = {
    IN: "IN",
    NOT_IN: "NOT_IN",
    EQUALS: "EQUALS",
    NOT_EQUALS: "NOT_EQUALS",
    GREATER: "GREATER",
    GREATER_EQUALS: "GREATER_EQUALS",
    LESS: "LESS",
    LESS_EQUALS: "LESS_EQUALS",
    IS_NULL: "IS_NOT_NULL"
}


export const TEXT_FILTER_OPTIONS = {
    EQUALS: "EQUALS",
    NOT_EQUALS: "NOT_EQUALS",
    CONTAINS: "CONTAINS",
    NOT_CONTAINS: "NOT_CONTAINS",
    STARTS_WITH: "STARTS_WITH",
    ENDS_WITH: "ENDS_WITH",
    IS_EMPTY: "IS_EMPTY",
    IS_NOT_EMPTY: "IS_NOT_EMPTY"

}


export const NUMBER_FILTER_OPERATOR_OPTIONS = [
    {
        id: NUMBER_FILTER_OPTIONS.IN,
        label: 'In',
    },
    {
        id: NUMBER_FILTER_OPTIONS.NOT_IN,
        label: 'Not In',
    },
    {
        id: NUMBER_FILTER_OPTIONS.EQUALS,
        label: 'Equals',
    },
    {
        id: NUMBER_FILTER_OPTIONS.NOT_EQUALS,
        label: 'Not Equals',
    },
    {
        id: NUMBER_FILTER_OPTIONS.GREATER,
        label: 'Not Greater',
    },
    {
        id: NUMBER_FILTER_OPTIONS.GREATER_EQUALS,
        label: 'Greater Equals',
    },
    {
        id: NUMBER_FILTER_OPTIONS.LESS,
        label: 'Less',
    },
    {
        id: NUMBER_FILTER_OPTIONS.LESS_EQUALS,
        label: 'Less Equals',
    }
]


export const TEXT_FILTER_OPERATOR_OPTIONS = [
    {
        id: TEXT_FILTER_OPTIONS.EQUALS,
        label: 'Equals',
    },
    {
        id: TEXT_FILTER_OPTIONS.NOT_EQUALS,
        label: 'Not Equals',
    },
    {
        id: TEXT_FILTER_OPTIONS.CONTAINS,
        label: 'Contains',
    },
    {
        id: TEXT_FILTER_OPTIONS.NOT_CONTAINS,
        label: 'Not Contains',
    },
    {
        id: TEXT_FILTER_OPTIONS.STARTS_WITH,
        label: 'Starts With',
    },
    {
        id: TEXT_FILTER_OPTIONS.ENDS_WITH,
        label: 'Ends With',
    },
    {
        id: TEXT_FILTER_OPTIONS.IS_EMPTY,
        label: 'Is Empty',
    },
    {
        id: TEXT_FILTER_OPTIONS.IS_NOT_EMPTY,
        label: 'Is Not Empty',
    }
]
