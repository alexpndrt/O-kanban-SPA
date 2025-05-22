import Sortable from 'sortablejs/modular/sortable.core.esm.js';
const template = document.getElementById('list-template');
import { makeCard, showAddCardModal } from '../cards/cards';
import { Notification } from '../Notification';
import { closeDialog } from '../utils';
import { postList, update, destroyList } from './api';

function showAddListModal() {
    document.getElementById('add-list-modal').show();
}

function showEditListModal(listId) {
    const editListModal = document.getElementById('edit-list-modal');

    // editListModal.setAttribute('data-list-id', listId);
    // sur le DOM , on trouvera data-list-id = listId
    // editListModal.dataset.listId = listId;
    editListModal.querySelector('input[type=hidden]').value = listId;

    editListModal.show();
}

async function showConfirmDeleteListModal(listId) {
    if (
        !confirm(
            'Etes vous sur de vouloir effacer la liste et les cartes associées ?',
        )
    ) {
        return false;
    }

    try {
        await destroyList(listId);

        document.querySelector(`[data-list-id="${listId}"]`).remove();

        new Notification('La liste a été effacée');
    } catch (error) {
        new Notification(error.message, 'danger');
    }
}

function makeList(list) {
    const clone = document.importNode(template.content, true);
    // const clone = template.content.cloneNode(true);
    const title = clone.querySelector('h2');
    // on utilise textContent
    title.textContent = list.title;

    // CARDS
    const addCardBtn = clone.querySelector('.js-add-card-btn');
    addCardBtn.addEventListener('click', () => showAddCardModal(list.id));

    const editBtn = clone.querySelector('.js-edit-list-btn');
    editBtn.addEventListener('click', () => showEditListModal(list.id));

    const trashBtn = clone.querySelector('.js-delete-list-btn');
    trashBtn.addEventListener('click', () =>
        showConfirmDeleteListModal(list.id),
    );

    const section = clone.querySelector('section');
    section.dataset.listId = list.id;
    const cardsContainer = section.querySelector('.js-cards-container');

    for (let i = 0; i < list.cards?.length; i++) {
        const card = list.cards[i];
        cardsContainer.appendChild(makeCard(card));
    }

    // On retourne uniquement la section
    return clone.children[0];
}

async function createList(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);
    // const data = [
    //     { title → "ça marche ?" },
    //     { position → 3 },
    // ]

    const data = Object.fromEntries(formData);

    try {
        const newList = await postList(data);

        const newListElement = makeList(newList);

        const listsContainer = document.getElementById('lists-container');
        listsContainer.appendChild(newListElement);

        new Notification('La liste a été créée');
    } catch (error) {
        new Notification(error.message, 'danger');
    } finally {
        closeDialog();

        form.reset();
    }
}

async function updateList(event) {
    event.preventDefault();

    const form = event.target;

    const data = Object.fromEntries(new FormData(form));

    try {
        const updatedList = await update(data);

        const theListOnTheDom = document.querySelector(
            `[data-list-id="${updatedList.id}"]`,
        );

        theListOnTheDom.querySelector('h2').textContent = updatedList.title;

        new Notification('La liste a été  mise à jour', 'success');
    } catch (error) {
        new Notification(error.message, 'danger');
    } finally {
        closeDialog();

        form.reset();
    }
}

function makeListSortable(listsContainer) {
    Sortable.create(listsContainer, {
        group: 'lists',
        animation: 250,
        handle: '.handle',
        onEnd: async (event) => {
            const lists = event.to.children;
            for (let i = 0; i < lists.length; i++) {
                const element = lists[i];
                const listId = element.dataset.listId;
                const position = i + 1;

                try {
                    await update({
                        list_id: listId,
                        position: position,
                    });
                } catch (error) {
                    new Notification(error.message, 'danger');
                }
            }
            new Notification('Les listes ont été bougées');
        },
    });
}

export { showAddListModal, makeList, createList, updateList, makeListSortable };
