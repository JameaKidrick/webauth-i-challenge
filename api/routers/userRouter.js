const express = require('express');
const userDB = require('../helpers/userModel');

const router = express.Router();

// If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.
router.get('/users', (req, res) => {
  userDB.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' })
    })
})

router.get('/users/:id', (req, res) => {
  userDB.findById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' })
    })
})

router.delete('/users/:id', (req, res) => {
  const { username } = req.headers;
  userDB.findById(req.params.id)
    .then(user => {
      if(user.username === username){
        userDB.remove(user.id)
        .then(deletedUser => {
          res.status(200).json(deletedUser)
        })
        .catch(error => {
          res.status(500).json({ error: 'Internal server error' })
        })
      }else{
        res.status(401).json({ error: 'You do not have authorization to delete this user' })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' })
    })
})

module.exports = router;