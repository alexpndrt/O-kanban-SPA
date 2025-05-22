import { config } from '../config';
const { api_url } = config;

async function getLists() {
    const response = await fetch(`${api_url}/lists`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

async function postList(data) {
    const response = await fetch(`${api_url}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const newList = await response.json();

    if (!response.ok) {
        throw new Error(newList);
    }

    return newList;
}

async function update(data) {
    const { list_id } = data;

    delete data.list_id;

    const response = await fetch(`${api_url}/lists/${list_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const updatedList = await response.json();

    if (!response.ok) {
        throw new Error(updatedList);
    }

    return updatedList;
}

async function destroyList(listId) {
    const response = await fetch(`${api_url}/lists/${listId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Un erreur s'est produite");
    }

    return true;
}

export { getLists, postList, update, destroyList };
