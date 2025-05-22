function closeDialog() {
    document.querySelector('dialog[open]').close();
}

// * Trouver un meilleur nom
function closeModals() {
    const closeModalBtns = document.querySelectorAll('.close');
    for (let i = 0; i < closeModalBtns.length; i++) {
        closeModalBtns[i].addEventListener('click', closeDialog);
    }
}

export { closeModals, closeDialog };
