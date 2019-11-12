const bcrypt = require('bcrypt');
const userDB = require('../api/helpers/userModel');

/************************************** STRETCH **************************************/
// Write a piece of global middleware that ensures a user is logged in when accessing any route prefixed by /api/restricted/. For instance, /api/restricted/something, /api/restricted/other, and /api/restricted/a should all be protected by the middleware; only logged in users should be able to access these routes.

module.exports = (req, res, next) => {
  let { username, password } = req.headers;
  // console.log(username)
  if(username && password){
    userDB.findBy( username )
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          next();
        }else{
          res.status(401).json({ error: 'Incorrect username and/or password. You shall not pass! (╯▔皿▔)╯' })
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' })
      });
  }else{
    res.status(400).json({ error: 'Please provide a username and password.' })
  }
}