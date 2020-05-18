const express = require('express');
const helmet = require('helmet');

const accountsRouter = require('../accounts/accounts-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/accounts', accountsRouter);

module.exports = server;