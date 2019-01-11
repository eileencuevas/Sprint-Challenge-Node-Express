const express = require('express');
const middlewares = require('./config/middleware');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

middlewares(server);

module.exports = server;