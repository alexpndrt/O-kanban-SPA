import { Router } from 'express';
const cardRouter = Router();


import cardCreateSchema from '../JoiSchemas/card.create.schema.js';
import cardUpdateSchema from '../JoiSchemas/card.update.schema.js';

import { cardController } from '../controllers/cardController.js';
import { isPositiveInt } from '../middlewares/validateInt.js';
import validationMiddleware from '../middlewares/validation.middleware.js';


cardRouter.route('/cards')
    .get(cardController.index)
    .post(validationMiddleware(cardCreateSchema, 'body'), cardController.store);

cardRouter.route('/cards/:id')
    .all(isPositiveInt)
    .get(cardController.show)
    .patch(validationMiddleware(cardUpdateSchema, 'body'), cardController.update)
    .delete(cardController.destroy);


export { cardRouter };
