import Joi from 'joi';

// Afin de valider une action sur une entité, on va définir un objet Joi dans lequel on va décrire les informations nécessaire et leur format attendu.
export default Joi.object({
    // On précise que le titre est une chaine de caractère d'une longueur minimum de 2 caractère, et cette information est obligatoire
    title: Joi.string().min(5).required(),
    // La position doit être un nombre entier et est optionnel, celui-ci dest forcément positif
    position: Joi.number().integer().positive()
})
    // On détermine que l'on doit forcément fourni de la donnée (en général) a insérer. Sinon cela ne sert a rien d'appeler la route create
    .required();
