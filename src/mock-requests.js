import { v4 as uuidv4 } from 'uuid';
import { random } from 'lodash/fp';
import { sample, values } from 'lodash';
import { COLUMN_TYPE } from './constants/app.constants';

const FIRST_MODEL_ID = `${uuidv4()}`;

//DATA BASE:
//name: String
// id: uuid

let MODELS = [
    // { name: 'Model One', id: FIRST_MODEL_ID }
];

// TABLE:
//     id: uuid (String),
//     name: String,
//     modelId: uuid (String),
//     columns: COLUMN[]
//     nodePosition: null |  {x: number, y: number}

// COLUMNS:
//     id: uuid (String),
//     name: String,
//     type: 'Number' | 'Text' | 'Date',
//     aggregationFunc: 'SUM' | 'AVG | 'MAX' | 'MIN' | 'Count'

let TABLES = generateMockTables(5);

// FUSION:
//         id: uuid (String),
//         type: INNER | LEFT | RIGHT
//         modelId: uuid (String)
//         sourceTable: uuid (String),
//         targetTable: uuid (String),
//         sourceColumn: uuid (String,
//         targetColumn: uuid (String
let FUSIONS = [];

// MODELS API

export function fetchModels() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MODELS);
        }, 1000);
    });
}

export function createModel(model) {
    MODELS.push(model);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

export function deleteModel(id) {
    MODELS = MODELS.filter((model) => model.id !== id);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

// TABLES API
export function fetchTables(modelId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(TABLES.filter((table) => table.modelId === modelId));
        }, 1000);
    });
}

export function createTable(newTable) {
    return new Promise((resolve) => {
        TABLES.push(newTable);
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

export function updateTable(tableToUpdate) {
    return new Promise((resolve) => {
        TABLES = TABLES.map((table) =>
            table.id === tableToUpdate.id ? tableToUpdate : table
        );
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

export function batchUpdateTables(tablesToUpdate) {
    return new Promise((resolve) => {
        tablesToUpdate.forEach((tableToUpdate) => {
            TABLES = TABLES.map((table) =>
                table.id === tableToUpdate.id ? tableToUpdate : table
            );
        });

        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

// FUSIONS API
export function fetchFusions(modelId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(FUSIONS.filter((fusion) => fusion.modelId === modelId));
        }, 1000);
    });
}

export function createFusion(newFusion) {
    return new Promise((resolve) => {
        FUSIONS.push(newFusion);
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

export function updateFusion(fusionToUpdate) {
    return new Promise((resolve) => {
        FUSIONS = FUSIONS.map((fusion) =>
            fusionToUpdate.id === fusion.id ? fusionToUpdate : fusion
        );
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

// Import API

export function importModelFromDbt(modeId) {
    return new Promise((resolve) => {
        const dbtTables = generateMockTables(6, modeId);
        TABLES = [...TABLES, ...dbtTables];
        setTimeout(() => {
            resolve({ dbtModelCreated: true });
        }, 1000);
    });
}


export function getAuthProfiles() {
    return new Promise((resolve) => {
        const profiles = [
            { id: uuidv4(), name: 'Profile 1' },
            { id: uuidv4(), name: 'Profile 2' },
            { id: uuidv4(), name: 'Profile 3' },
            { id: uuidv4(), name: 'Profile 4' },
            { id: uuidv4(), name: 'Profile 5' },
        ];
        setTimeout(() => {
            resolve(profiles);
        }, 1000);
    });
}


export function importVendorModel(modeId,profileId) {
    return new Promise((resolve) => {
        const vendorTables = generateMockTables(9, modeId);
        TABLES = [...TABLES, ...vendorTables];
        setTimeout(() => {
            resolve({ dbtModelCreated: true });
        }, 1000);
    });
}

//utils

function generateMockTables(num, modelId) {
    return Array.from({ length: num }).map((_, idx) => {
        const tableName = `Table ${idx + 1}`;
        const table = {
            id: `${uuidv4()}`,
            name: tableName,
            modelId: modelId,
            columns: Array.from({ length: random(3, 7) }).map((_, idx) => ({
                id: `${uuidv4()}`,
                name: `Column ${idx + 1} (${tableName})`,
                type: sample(values(COLUMN_TYPE)),
                aggregationFunc: 'SUM',
            })),
        };
        return table;
    });
}
