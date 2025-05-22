import Sortable from 'sortablejs/modular/sortable.core.esm.js';
import { Notification } from '../Notification';
import { closeDialog } from '../utils';
import { postCard, update, destroy } from './api';
import { makeTagInDOM, showAssociateTagModal } from '../tags/tag.module';
const template = document.getElementById('card-template');

function showAddCardModal(listId) {
    const modal = document.getElementById('add-card-modal');
    modal.show();
    modal.querySelector('input[type=hidden]').value = listId;
}

function showEditCardModal(card) {
    const modal = document.getElementById('edit-card-modal');
    modal.querySelector('input[name=list_id]').value = card.list_id;
    modal.querySelector('input[name=card_id]').value = card.id;
    modal.querySelector('input[name=content]').value = card.content;

    modal.show();
}

function makeCard(card) {
    const clone = document.importNode(template.content, true);

    clone.querySelector('h3').textContent = card.content;
    const article = clone.querySelector('article');
    article.dataset.cardId = card.id;
    article.style.backgroundColor = card.color;

    const editCardBtn = clone.querySelector('.has-text-success');
    editCardBtn.addEventListener('click', () => showEditCardModal(card));

    const destroyCardBtn = clone.querySelector('.has-text-danger');
    destroyCardBtn.addEventListener('click', () => destroyCard(card.id));

    const associateTagBtn = clone.querySelector('.js-associate-tag');
    associateTagBtn.addEventListener('click', showAssociateTagModal);

    if (card.tags?.length) {
        for (const tag of card.tags) {
            const newTag = makeTagInDOM(tag);
            article.appendChild(newTag);
        }
    }

    return clone;
}

async function createCard(e) {
    e.preventDefault();

    const form = e.target;

    const data = Object.fromEntries(new FormData(form));

    try {
        const newCard = await postCard(data);
        const card = makeCard(newCard);

        const theListOnTheDom = document.querySelector(
            `[data-list-id="${newCard.list_id}"]`,
        );

        theListOnTheDom.querySelector('.js-cards-container').appendChild(card);

        new Notification('La carte a été créée');
    } catch (error) {
        new Notification(error.message, 'danger');
    } finally {
        form.reset();

        closeDialog();
    }
}

async function updateCard(e) {
    e.preventDefault();

    const form = e.target;

    const data = Object.fromEntries(new FormData(form));

    try {
        const updatedCard = await update(data);

        const card = document.querySelector(
            `[data-card-id="${updatedCard.id}"]`,
        );
        card.querySelector('h3').textContent = updatedCard.content;
        card.style.backgroundColor = updatedCard.color;

        new Notification('La carte a été mise à jour');
    } catch (error) {
        new Notification(error.message, 'danger');
    } finally {
        form.reset();

        closeDialog();
    }
}

async function destroyCard(id) {
    if (!confirm('Etes vous sur de vouloir effacer la carte ?')) {
        return false;
    }

    try {
        await destroy(id);

        document.querySelector(`[data-card-id="${id}"]`).remove();
    } catch (error) {
        new Notification(error.message, 'danger');
    }
}

function makeCardsSortable() {
    const cardsContainer = document.querySelectorAll('.js-cards-container');

    for (let i = 0; i < cardsContainer.length; i++) {
        Sortable.create(cardsContainer[i], {
            group: 'cards',
            animation: 250,
            onEnd: async (event) => {
                const cards = event.to.children;
                const listId = event.to.closest('.is-primary').dataset.listId;

                for (let j = 0; j < cards.length; j++) {
                    const element = cards[j];
                    const cardId = element.dataset.cardId;
                    const position = j + 1;

                    try {
                        await update({
                            list_id: listId,
                            card_id: cardId,
                            position: position,
                        });
                    } catch (error) {
                        new Notification(error.message, 'danger');
                    }
                }
                new Notification('Les cartes ont été bougées');
            },
        });
    }
}

function removeCardFromDom(cardId) {
    document.querySelector(cardId).remove();
}

export {
    makeCard,
    createCard,
    showAddCardModal,
    updateCard,
    makeCardsSortable,
    removeCardFromDom,
};
