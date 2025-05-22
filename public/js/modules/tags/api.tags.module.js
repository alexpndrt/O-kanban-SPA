import { config } from '../config';
const { api_url } = config;

async function getTags() {
    const response = await fetch(`${api_url}/tags`);
    return await response.json();
}

async function createTag(formData) {
    const response = await fetch(`${api_url}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    return await response.json();
}

async function associate(formData) {
    const route = `tags/${formData.tag_id}/cards/${formData.card_id}`;
    const response = await fetch(`${api_url}/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const res = await response.json();

    return res;
}

async function disassociate(cardId, tagId) {
    const response = await fetch(`${api_url}/tags/${tagId}/cards/${cardId}`, {
        method: 'DELETE',
    });

    return await response.json();
}

async function destroyTag(tagId) {
    await fetch(`${api_url}/tags/${tagId}`, {
        method: 'DELETE',
    });

    return true;
}

export { getTags, associate, disassociate, createTag, destroyTag };
