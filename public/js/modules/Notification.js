// ? une notification est un message
// ? un message qui s'ouvre dans une fenetre ou bulle
// ? un overlay sur la page

class Notification {
    notif = document.createElement('div');
    message;
    level;
    timeOut;

    constructor(message, level = 'success', timeOut = 5000) {
        // * On assigne une valeur à un attribut de la classe
        this.message = message;
        this.level = level;
        this.timeOut = timeOut;

        // * On appelle les méthodes en faisant du 'method chaining'
        this.makeHtml().show();
    }

    makeHtml() {
        this.notif.classList.add('alert', `${this.level}`);

        const paragraph = document.createElement('p');
        paragraph.textContent = this.message;

        this.notif.appendChild(paragraph);

        // ? retourner this permet de faire du method chaining : .makeHtml().show()
        return this;
    }

    show() {
        document.querySelector('.notifications').appendChild(this.notif);

        setTimeout(() => {
            this.notif.remove();
        }, this.timeOut);
    }
}

export { Notification };
