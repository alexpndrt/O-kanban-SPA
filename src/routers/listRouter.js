import { Router } from 'express';
const listRouter = Router();

import validationMiddleware from '../middlewares/validation.middleware.js';
import listCreateSchema from '../JoiSchemas/list.create.schema.js';
import listUpdateSchema from '../JoiSchemas/list.update.schema.js';

import { listController } from '../controllers/listController.js';
import { isPositiveInt } from '../middlewares/validateInt.js';

// ? API RESTful Representational State Transfer (CRUD)
// ? index : retourne une liste de ressource

listRouter.route('/lists')
    .get(listController.index)
    .post(validationMiddleware(listCreateSchema, 'body'), listController.store);

listRouter.route('/lists/:id')
    .all(isPositiveInt)
    .get(listController.show)
    .patch(validationMiddleware(listUpdateSchema, 'body'), listController.update)
    .delete(listController.destroy);

// ? si on avait un formulaire à afficher qui servirait à créer un liste, on le renverrait avec cette route / méthode
//  listRouter.get('/lists/create', listController.create);
// ? store : permet de persister les données


// ? La convention concernant le nommage des méthode pour mes api REST
// Lire des données : index : GET
// Lire une donnée :  show(id) : GET
// Afficher un formulaire pour créer une ressource : create : GET
// Afficher un formulaire pour éditer une ressource : edit : GET
// Persister les données : store : POST
// Mettre à jour une donnée : update : PATCH
// Effacer une donnée : destroy : DELETE


// get, post, patch, delete

// ? le verbe put set à mettre à jour si la donnée existe, si la donnée n'existe pas, on la crée

export { listRouter };
