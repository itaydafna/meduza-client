import axios from 'axios';

const BASE = 'http://127.0.0.1:2828/meduza';
export async function getDtrProfiles({ email, password }) {
    const res = await axios.post(`${BASE}/model/dtr/profiles`, {
        email,
        password,
    });

    return res.data;
}

export async function loadDtrModel({ email, password, profileId, modelId }) {
    const res = await axios.post(`${BASE}/model/dtr/load`, {
        email,
        password,
        workspaceId: profileId,
        modelInstanceId: modelId,
    });

    return res.data;
}

export async function getTables(modelId) {
    const res = await axios.get(
        `${BASE}/model/tables?modelInstanceId=${modelId}`,
        { data: {} }
    );
    return res.data;
}

export async function getFusions(modelId) {
    const res = await axios.get(
        `${BASE}/model/joins?modelInstanceId=${modelId}`,
        { data: {} }
    );
    return res.data;
}

export async function updateTables({ modelId, tables }) {
    const res = await axios.put(
        `${BASE}/model/tables?modelInstanceId=${modelId}`,
        { tables, modelId }
    );
    return res.data;
}

export async function loadDbtModel({ modelId, file }) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios({
        method: 'post',
        url: `${BASE}/model/dbt/load?id=${modelId}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
}


export async function updateFusion({ modelId, join }) {
    const res = await axios.put(
        `${BASE}/model/joins`,
        { join, modelId }
    );
    return res.data;
}


export async function runQuery(queryPayload) {
    const res = await axios.post(
        `${BASE}/query`,
        queryPayload
    );
    return res.data;
}


