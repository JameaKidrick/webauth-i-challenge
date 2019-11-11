const express = require('express');

const middlewareConfig = require('./configure-middleware');
const userRouter = require('./routers/userRouter');

const server = express();

middlewareConfig(server);

server.use('/', userRouter);

server.get('/', (req, res) => {
  res.send('Hello World!')
});

module.exports = server;