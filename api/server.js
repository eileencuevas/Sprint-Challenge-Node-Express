const express = require('express');
const middlewares = require('./config/middleware');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

middlewares(server);

server.use('/api/projects/', projectsRouter);

module.exports = server;