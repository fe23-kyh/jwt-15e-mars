import express from 'express';
import router from './src/router/router.js';
import shoppingRouter from './src/router/shoppingRouter.js';
import authRouter from './src/router/authRouter.js';

const app = express();

/** Configuration */
app.use(express.json());

/** Routes */
app.use(router);
app.use(authRouter);
app.use(shoppingRouter);

/** Initialization */
app.listen(8080, async () => {
  console.log("Server is alive");
});