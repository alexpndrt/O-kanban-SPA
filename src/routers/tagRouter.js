import { Router } from 'express';
const tagRouter = Router();

import validationMiddleware from '../middlewares/validation.middleware.js';
import tagCreateSchema from '../JoiSchemas/tag.create.schema.js';
import tagUpdateSchema from '../JoiSchemas/tag.update.schema.js';

import { tagController } from '../controllers/tagController.js';
import { isPositiveInt } from '../middlewares/validateInt.js';
import associateOrDisassociateCardTagSchema from '../JoiSchemas/associateOrDisassociateCardTag.schema.js';

tagRouter
    .route('/tags')
    .get(tagController.index)
    .post(validationMiddleware(tagCreateSchema, 'body'), tagController.store);

tagRouter
    .route('/tags/:tag_id/cards/:card_id')
    .all(validationMiddleware(associateOrDisassociateCardTagSchema, 'params'))
    .post(tagController.associateTagToCard)
    .delete(tagController.disassociateTagFromCard);

tagRouter
    .route('/tags/:id')
    .all(isPositiveInt)
    .get(tagController.show)
    .patch(validationMiddleware(tagUpdateSchema, 'body'), tagController.update)
    .delete(tagController.destroy);

export { tagRouter };
