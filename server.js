'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const http = require('node:http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

const helloWorldRoute = require('./app/routes/helloWorld.route');
const { requestId } = require('./service/uuidGenerator');
const { consoleWritter } = require('./service/consoleViewer');
const notFound = require('./middlewares/notFound');
const erorrHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/rateLimiter');
const everyReqDetails = require('./middlewares/everyReqCatcher');
const swaggerSpec = require('./APIDocs/swaggerConfig');
const { mongoConnect } = require('./database/MongoDB');
const messageStore = require('./app/controllers/ssocket.controller');

const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST']
	}
});

io.on('connection', socket => {
	socket.on('sentMessage', async data => {
		await messageStore.saveMessages(data);
		socket.broadcast.emit('messageReceived', data);
	});

	socket.on('getMessages', async ({ senderId }) => {
		const messages = await messageStore.getMessages(senderId);
		socket.emit('messages', messages);
	});
});

const port = process.env.PORT;

process.on('uncaughtException', error => {
	console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled rejection:', error);
});

app.use(limiter);
app.use(hpp());
app.use('*', cors());
app.use(compression({ level: 1 }));
app.use(requestId);
app.use(helmet());
app.use(express.json({ limit: '500mb', extended: true }));
app.use(everyReqDetails);

app.use('/api/', helloWorldRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error handlers
app.use('*', notFound);
app.use(erorrHandler);

server.listen(port, () => {
	consoleWritter(port);
	mongoConnect();
});
