const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize,simple} = format;

const BadRequestException = require('../exceptions/badRequestException');
 
const logger = createLogger({
	format: combine(
		timestamp(),
		colorize(),
		simple()
	),
	transports: [new transports.Console()]
});

module.exports = {
	log: async function(exception) {
		if (exception instanceof BadRequestException) { 
			logger.log({
				level: 'warn',
				message: 'Bad request : ' + exception.msg
			});
		}
		else{
			logger.log({
				level: 'error',
				stack: exception.stack,
				message: exception
			});
		}
	}
};