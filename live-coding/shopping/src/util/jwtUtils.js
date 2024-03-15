import jwt from 'jsonwebtoken'; //npm install jsonwebtoken
import { readFileSync } from 'fs';


const mySecret = readFileSync("./config/mysecret.txt");

function generate(claims) {
  let options = {
    issuer: "shopping-api",
    subject: "Auth token for shopping api",
    expiresIn: "15m"
  }

  return jwt.sign(claims, mySecret, options);
}


function verify(token) {
  return jwt.verify(token, mySecret);
}


export default { generate, verify }