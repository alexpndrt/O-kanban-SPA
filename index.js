import { app } from "./app.js";
// import { errorHandler, notFound } from './src/middlewares/errorHandlers.js';
// import { router } from './src/routers/index.js';

// app.use(router);

// app.use(notFound);

// app.use(errorHandler);
//
app.listen(app.get("port"), () => {
  console.info(`Listening on ${app.get("base_url")}:${app.get("port")}`);
});
