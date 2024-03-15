// A controller is a bridge between http and our javascript code. It translates the text data sent from the client into data that we can handle as normal javascript without knowledge of http.

import shoppingService from "../service/shoppingService.js";
import jwtUtils from "../util/jwtUtils.js";

const getAllCarts = async (req, resp) => {

  const carts = await shoppingService.getAll();

  if(carts.length == 0) {
    return resp.status(204).send({msg: "Cart is empty"});
  }

  resp.send(await shoppingService.getAll());
};

const getCart = async (req, resp) => {
  const { username } = resp.locals.token;
  
  resp.send(await shoppingService.get(username));
}

const addItem = (req, resp) => {
  const {name, quantity} = req.body;
  const { username } = resp.locals.token;

  if(name == undefined || quantity == undefined) {
    return resp.status(400).send({err: "Missing parameters name or quantity"});
  } else if(!req.params.id.match("[0-9]*")) {
    return resp.status(400).send({err: "Id number is malformed"}); // TODO: change this to middlware
  }

  shoppingService.add(username, {name, quantity});

  resp.status(201).send({msg: "Item was added"});
}

const deleteItem = async (req, resp) => {
  await shoppingService.deleteItem(req.params.id, req.params.itemId);

  resp.status(200).send({msg: "success"});
}

const updateItem = (req, resp) => {
  resp.send("Not implemented yet");
}

export default { getAllCarts, getCart, addItem, deleteItem, updateItem }