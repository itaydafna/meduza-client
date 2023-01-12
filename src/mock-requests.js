import { v4 as uuidv4 } from 'uuid';

//DATA BASE:
let MODELS = [{ name: 'Model One', id: uuidv4() }];

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
