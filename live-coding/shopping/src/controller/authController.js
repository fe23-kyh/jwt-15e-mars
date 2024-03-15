import authService from "../service/authService.js";
import jwtUtils from "../util/jwtUtils.js";

const login = (req, resp) => {
  const {username, password} = req.body;

  if(username == undefined || password == undefined) {
    return resp.status(400).send({err: "Invalid parameters"});
  }

  authService.exists({username, password}, () => {
    const token = jwtUtils.generate({username, role: "USER"});

    return resp.status(200).send({token});
  }).catch(err => {
    return resp.status(401).send({err: "Invalid attempt"});
  });
}


const register = async (req, resp) => {
  const {username, password} = req.body;

  if(username == undefined || password == undefined) {
    return resp.status(400).send({err: "Invalid parameters"});
  }

  await authService.create({username, password});

  resp.status(201).send({msg: "Account created"});
}

export default { login, register };