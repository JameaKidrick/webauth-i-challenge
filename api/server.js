const express = require('express');

const middlewareConfig = require('./configure-middleware');
const requires_auth_middleware = require('../auth/requires-auth-middleware');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');

const server = express();

middlewareConfig(server);

server.use('/api', authRouter); // allows user to authorize (login/register)
server.use('/api/restricted', requires_auth_middleware, userRouter); // only allows users that are authorized to continue

server.get('/', (req, res) => {
  res.send('Hello World!')
});

module.exports = server;