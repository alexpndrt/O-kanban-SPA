import { config } from '../config';
const { api_url } = config;

async function postCard(card) {
    const response = await fetch(`${api_url}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    });

    const newCard = await response.json();

    if (!response.ok) {
        throw new Error(newCard);
    }

    return newCard;
}

async function update(data) {
    const { card_id } = data;

    delete data.card_id;

    const response = await fetch(`${api_url}/cards/${card_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const updatedCard = await response.json();

    if (!response.ok) {
        throw new Error(updatedCard);
    }

    return updatedCard;
}

async function destroy(cardId) {
    const response = await fetch(`${api_url}/cards/${cardId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Un erreur s'est produite");
    }

    return true;
}

export { postCard, update, destroy };
