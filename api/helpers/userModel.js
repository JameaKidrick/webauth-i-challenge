const db = require('../../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove
}

// respond with an array of all the users contained in the database
function find() {
  return db('authorization')
}

// find specific user by username
function findBy(credential) {
  return db('authorization')
    .where({ 'authorization.username':credential })
    .first()
}

// find specific user by id
function findById(id){
  return db('authorization')
    .where({ 'authorization.id': id })
    .first();
};

// creates a user using the information sent inside the body of the request
function add(user) {
  return db('authorization')
    .insert(user, 'id')
    .then(id => {
      return findById(id[0])
      .select('id','username', 'created_at', 'updated_at')
    })
}

// deletes a user
function remove(id) {
  return findById(id)
    .select('id','username', 'created_at', 'updated_at')
    .then(user => {
      return db('authorization')
        .del()
        .where({ 'authorization.id': id })
        .then(deleted => {
          return user
        })
    })
  
}