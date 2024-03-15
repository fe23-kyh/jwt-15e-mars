import jwtUtils from "../util/jwtUtils.js";

const login = (req, resp) => {
  const {username, password} = req.body;

  if(username == undefined || password == undefined) {
    return resp.status(400).send({err: "Invalid parameters"});
  }

  if(username == "bob" && password == "123") {
    const token = jwtUtils.generate({username, role: "USER"});

    return resp.status(200).send({token});
  } else {
    return resp.status(401).send({err: "Invalid attempt"});
  }
}


const register = (req, resp) => {
  
}

export default { login };