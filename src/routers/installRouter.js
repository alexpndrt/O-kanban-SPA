import { Router } from 'express';
const installRouter = Router();

import { installController } from '../controllers/installController.js';


installRouter.get('/install', installController.index);

export { installRouter };
