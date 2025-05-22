import Joi from "joi";

export default Joi.object({
  content: Joi.string().min(5).required(),
  // Ce champ doit être une chaîne de caractères avec une longueur minimale de 5 caractères et est requis.
  color: Joi.string().regex(/^#[A-Fa-f0-9]{6}/),
  // Ce champ doit être une chaîne de caractères qui correspond à une expression régulière pour un code de couleur hexadécimal (par exemple, #RRVVBB).
  position: Joi.number().integer().positive(),
  // Ce champ doit être un entier positif.
  list_id: Joi.number().integer().min(1),
  // Ce champ doit être un entier avec une valeur minimale de 1.
}).required();
