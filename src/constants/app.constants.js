import salesforceLogo from '../assets/sf-logo.png';
import genieLogo from '../assets/genie-icon.png';

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
        name: "Genie",
        backgroundColor: "ginieBackground"
    },
    [VENDORS.DATORAMA] : {
        id: VENDORS.DATORAMA,
        iconSrc: salesforceLogo,
        name: "Salesforce DI",
        backgroundColor: "white"
    }
}

