const tagsContainer = document.querySelector('.tags');
import { makeCard, removeCardFromDom } from '../cards/cards.js';
import { Notification } from '../Notification.js';
// import { makeCardInDOM, removeCardFromDom } from '../cards/card.module.js';
import {
    associate,
    disassociate,
    getTags,
    createTag,
    destroyTag,
} from './api.tags.module.js';

/**
 * ajoute un tag sur une carte
 * @param {object} tag
 */
function makeTagInDOM(tag) {
    const newTag = document.createElement('div');
    newTag.classList.add('tag');
    newTag.style.backgroundColor = tag.color;

    newTag.style.color = 'white';
    newTag.style.fontWeight = 'bold';
    newTag.textContent = tag.name;
    newTag.setAttribute('data-tag-id', tag.id);

    newTag.setAttribute('data-card-id', tag.card_has_tag.card_id);

    newTag.addEventListener('click', removeTag);

    return newTag;
}

/**
 * ajoute les tags existant en haut à droite sur le DOM
 *
 */
async function addExisitingTagToDom() {
    let tags = await getTags();

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < tags.length; i++) {
        fragment.appendChild(makeTag(tags[i]));
    }

    tagsContainer.appendChild(fragment);

    tags = null;
    fragment = null;
}

function makeTag(tag) {
    const tagTemplate = document.getElementById('tag-template');

    const clone = document.importNode(tagTemplate.content, true);

    const div = clone.querySelector('div');
    div.textContent = tag.name;
    div.style.backgroundColor = tag.color || 'blue';
    div.style.color = 'white';

    div.setAttribute('data-tag-id', tag.id);

    div.addEventListener('click', deleteTag);

    return clone.firstElementChild;
}

function removeTagsFromDom() {
    const tags = document.querySelectorAll('.tags .tag');

    for (let i = 0; i < tags.length; i++) {
        tags[i].remove();
    }
}

async function deleteTag(event) {
    if (confirm('Etes vous sur de vouloir effacer ce tag ?')) {
        const tagId = event.target.getAttribute('data-tag-id');

        await destroyTag(tagId);

        removeTagsFromDom();

        await addExisitingTagToDom();

        return true;
    }

    return false;
}

async function showAssociateTagModal(event) {
    const modal = document.querySelector('#associateTagModal');

    const card = event.target.closest('article');
    const cardId = card.getAttribute('data-card-id');
    const form = modal.querySelector('form');

    const select = form.querySelector('select');
    select.innerHTML = '';
    const inputHidden = form.querySelector('[type=hidden]');

    inputHidden.value = cardId;

    // * On va récupérer les tags et les attribuer au select
    const tags = await getTags();

    // * Si le tag est déjà associé à la carte, on l'élimine
    const exisitingTags = card.querySelectorAll('.tag');

    // * Si tous les tags sont associés on arrête tout
    if (exisitingTags.length === tags.length) {
        form.reset();
        // * Une belle notification serait mieux
        new Notification('Les tags sont tous associés', 'danger');
        return alert('tous les tags sont associés');
    }

    const existingTagsName = [];
    for (const tag of exisitingTags) {
        existingTagsName.push(tag.textContent);
    }

    for (let i = 0; i < tags.length; i++) {
        if (!existingTagsName.includes(tags[i].name)) {
            const optionElem = document.createElement('option');
            optionElem.value = tags[i].id;
            optionElem.textContent = tags[i].name;

            select.appendChild(optionElem);
        }
    }

    modal.show();
}

function handleAssociateTagForm() {
    const modal = document.querySelector('#associateTagModal');
    const form = modal.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));
        try {
            const card = await associate(data);

            // *
            removeCardFromDom(`[data-card-id="${card.id}"]`);

            const cardToAdd = makeCard(card);

            const theListOnTheDom = document.querySelector(
                `[data-list-id="${card.list_id}"]`,
            );

            theListOnTheDom
                .querySelector('.js-cards-container')
                .appendChild(cardToAdd);

            event.target.querySelector('select').innerHTML = '';
            event.target.reset();

            modal.close();
        } catch (e) {
            new Notification(e, 'danger');
        }
    });
}

async function removeTag(event) {
    if (confirm('Etes vous sur de vouloir enlever le tag ?')) {
        const tagId = event.target.getAttribute('data-tag-id');
        const cardId = event.target.getAttribute('data-card-id');

        const card = await disassociate(cardId, tagId);

        removeCardFromDom(`[data-card-id="${cardId}"]`);

        const cardToAdd = makeCard(card);

        const theListOnTheDom = document.querySelector(
            `[data-list-id="${card.list_id}"]`,
        );

        theListOnTheDom
            .querySelector('.js-cards-container')
            .appendChild(cardToAdd);

        return new Notification('Le tag a été désassocié');
    }

    new Notification("une erreur s'est produite", 'danger');
    return false;
}

function handleAddTagForm() {
    const addTagForm = document.querySelector('#addTagModal form');

    addTagForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // On doit créer une liste ici, la requête doit nous retourner une liste
        const formData = new FormData(event.target);
        //formData.append('color', '#000000');
        const data = Object.fromEntries(formData);
        try {
            const tag = await createTag(data);
            if (tag) {
                removeTagsFromDom();
                return addExisitingTagToDom();
            }
            throw new Error('Le tag existe deja');
        } catch (e) {
            alert(e.message);
        } finally {
            event.target.reset();

            document.getElementById('addTagModal').close();
        }
    });
}

function showAddTagModal() {
    document.getElementById('addTagModal').show();
}

export {
    makeTagInDOM,
    handleAssociateTagForm,
    addExisitingTagToDom,
    showAssociateTagModal,
    showAddTagModal,
    handleAddTagForm,
};
