const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  add,
  findBy,
  findById,
};

function getAll() {
  return db("users");
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where("id", id).first();
}
