const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('people')
}

function getById(id) {
  return db('people').where('id', id)
}

async function insert(hobbit) {
  const [id] = await db("people")
    .insert(hobbit)
  return db("people")
    .where({id})
    .first()  
}

async function update(id, changes) {
  return db("people").update(changes)
    .where({id})
}

function remove(id) {
  return db('people').where('id', id)
}