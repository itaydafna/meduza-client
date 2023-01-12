import { v4 as uuidv4 } from 'uuid';
import { random } from 'lodash/fp';

const FIRST_MODEL_ID = `${uuidv4()}`;

//DATA BASE:
let MODELS = [{ name: 'Model One', id: FIRST_MODEL_ID }];

let TABLES = generateMockTables(5);

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

export function fetchModelTables(modelId) {
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



//utils

function generateMockTables(num) {
    return Array.from({ length: num }).map((_, idx) => {
        const tableName = `Table ${idx + 1}`;
        const table = {
            id: `${uuidv4()}`,
            name: tableName,
            modelId: FIRST_MODEL_ID,
            columns: Array.from({ length: random(3, 7) }).map((_, idx) => ({
                id: `${uuidv4()}`,
                name: `Column ${idx + 1} (${tableName})`,
            })),
        };
        return table;
    });
}
