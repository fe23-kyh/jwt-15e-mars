import { MongoClient } from 'mongodb';

let db;

const dbDetails = {
  username: "jakobrolandsson",
  password: "KuxWRpofpTkxLW76"
}

const url = (username, password) => {
  return `mongodb+srv://${username}:${password}@fe23-edu-cluster.xvwpuqm.mongodb.net/?retryWrites=true&w=majority&appName=fe23-edu-cluster`;
}

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if(db != undefined) {
    return db;
  }

  const client = new MongoClient(url(dbDetails.username, dbDetails.password));

  db = client.db("awesome-shopping-v1");

  return db;
}