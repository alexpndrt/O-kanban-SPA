import Joi from "joi";

export default Joi.object({
  content: Joi.string().min(5),
  // Il doit toujours être une chaîne de caractères avec une longueur minimale de 5 caractères, mais il n'est plus obligatoire.
  color: Joi.string().regex(/^#[A-Fa-f0-9]{6}/),
  position: Joi.number().integer().positive(),
  list_id: Joi.number().integer().min(1),
})
  .min(1)
  // min(1) : Cela signifie que l'objet doit avoir au moins une des propriétés définies dans le schéma. En d'autres termes, l'objet ne peut pas être vide.
  .required();
