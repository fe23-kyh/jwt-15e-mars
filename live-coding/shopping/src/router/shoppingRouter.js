import express from 'express';
import shoppingController from '../controller/shoppingController.js';
import jwtFilter from '../middleware/jwtFilter.js';

const router = express.Router();

router
  .get("/carts", jwtFilter.authorize, shoppingController.getAllCarts)
  .get("/carts/:id", jwtFilter.authorize, shoppingController.getCart)
  .put("/carts/:id", jwtFilter.authorize, shoppingController.addItem)
  .post("/carts/:id/item", jwtFilter.authorize, shoppingController.addItem)
  .delete("/carts/:id/item/:itemId", jwtFilter.authorize, shoppingController.deleteItem)
  .patch("/carts/:id/item/:itemId", jwtFilter.authorize, shoppingController.updateItem);


export default router;