const express = require('express');
const bcrypt = require('bcrypt');
const userDB = require('../helpers/userModel');

const router = express.Router();

// Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
router.post('/register', (req, res) => {
  let credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  userDB.findBy(credentials.username)
    .then(user => {
      if(user){
        res.status(400).json({ error: 'A user with that username already exists in the database' })
      }else{
        userDB.add(credentials)
          .then(store => {
            res.status(201).json(store)
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error' });
          });
      }
    })
});

// Use the credentials sent inside the body to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!'
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  if(username && password){
    userDB.findBy(username)
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          res.status(200).json({ message: `Welcome, ${user.username}!` })
        }else{
          res.status(401).json({ error: 'You shall not pass! (╯▔皿▔)╯' })
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' })
      });
  }else{
    res.status(400).json({ error: 'Please provide a username and password.' })
  }
})

module.exports = router;