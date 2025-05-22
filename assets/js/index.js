// ? pas besoin de mettre l'extension du fichier quand on utilise vite
import { Notification } from './modules/Notification';
import { getLists } from './modules/lists/api';
import { closeModals } from './modules/utils';
import {
    showAddListModal,
    makeList,
    createList,
    updateList,
    makeListSortable,
} from './modules/lists/lists';
import {
    createCard,
    makeCardsSortable,
    updateCard,
} from './modules/cards/cards';
import {
    addExisitingTagToDom,
    handleAddTagForm,
    handleAssociateTagForm,
    showAddTagModal,
} from './modules/tags/tag.module';

async function init() {
    // on cible un bouton
    const addListBtn = document.querySelector('#add-list-button');
    // on ajoute un event click et on exécute une fonction quand le bouton est cliqué
    addListBtn.addEventListener('click', showAddListModal);

    // cette fonction met un eventListener sur chaque élément qui a une classe close
    closeModals();

    // on sélectionne le formulaire de création de liste
    const addListForm = document.querySelector('#add-list-modal form');
    addListForm.addEventListener('submit', createList);

    const editListForm = document.querySelector('#edit-list-modal form');
    editListForm.addEventListener('submit', updateList);

    // CARDS
    const addCardForm = document.querySelector('#add-card-modal form');
    addCardForm.addEventListener('submit', createCard);

    const editCardForm = document.querySelector('#edit-card-modal form');
    editCardForm.addEventListener('submit', updateCard);

    try {
        const lists = await getLists();

        // ? plutôt que de repeindre le DOM en a chaque fois qu'on ajoute une liste, on met toutes les listes dans un fragment, et on ajoute ce fragment sur le DOM
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < lists.length; i++) {
            fragment.append(makeList(lists[i]));
        }

        await addExisitingTagToDom();

        handleAddTagForm();
        handleAssociateTagForm();

        const addTagBtn = document.getElementById('addTagButton');
        addTagBtn.addEventListener('click', showAddTagModal);

        const listsContainer = document.getElementById('lists-container');
        //  On insère le fragment qui contient toutes les sections en une seule fois : on gagne en performance
        listsContainer.appendChild(fragment);

        makeListSortable(listsContainer);
        makeCardsSortable();
    } catch (error) {
        new Notification(error.message, 'danger');
    }
}

document.addEventListener('DOMContentLoaded', init);
