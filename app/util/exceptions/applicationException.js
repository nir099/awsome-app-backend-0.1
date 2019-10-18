const { ResponseStatusCodes } = require('./../constants/responceStatusCodes');
const { ResponseCommonMessages } = require('./../constants/responceCommonMessages');

class ApplicationException extends Error {
	constructor(msg, status) {

		super();

		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;

		this.msg = msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR;

		this.status = status || ResponseStatusCodes.INTERNAL_SERVER_ERROR;
	}

}

module.exports = ApplicationException;