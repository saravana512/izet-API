'usestrict';
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'izetpayment-socket',
			version: '1.0.0',
			description: 'izetpayment-socket API Documentation'
		},
		servers: [
			{
				url: process.env.API_BASE_URL,
				description: 'izetpayment-socket API'
			}
		]
	},
	apis: [path.join(__dirname, 'docs/*.js')]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
