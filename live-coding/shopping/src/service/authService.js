import { fetchCollection } from "../mongodb/mongoDbClient.js";
import bcrypt from 'bcrypt';

const USER_COLLECTION_NAME = "users";

const create = async ({username, password}) => {
  let result = await fetchCollection(USER_COLLECTION_NAME).findOne({username});
  
  if(result != null) {
    return false;
  }

  bcrypt.hash(password, 12, async (err, hash) => {
    result = await fetchCollection(USER_COLLECTION_NAME).insertOne({username, hash});
  });
}


const exists = async ({username, password}, afterValid) => {
  let result = await fetchCollection(USER_COLLECTION_NAME).findOne({username});

  if(result == null) {
    throw new Error("Account did not exist");
  }

  bcrypt.compare(password, result.hash, (err, result) => {
    if(result) {
      afterValid();
    } else {
      throw new Error("Account login error");
    }
  })
}

export default { create, exists }