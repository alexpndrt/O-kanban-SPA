import { Router } from "express";
const router = Router();

import { installRouter } from "./installRouter.js";
import { listRouter } from "./listRouter.js";
import { cardRouter } from "./cardRouter.js";
import { tagRouter } from "./tagRouter.js";

router.use(installRouter);

router.get("/", (_req, res) => {
  res.sendFile("index.html", {
    root: "../../dist",
  });
});

router.use(listRouter);
router.use(cardRouter);
router.use(tagRouter);

export { router };
