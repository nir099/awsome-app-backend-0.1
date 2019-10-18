const ApplicationException = require('./applicationException');
const { ResponseStatusCodes } = require('./../constants/responceStatusCodes');
const { ResponseCommonMessages } = require('./../constants/responceCommonMessages');
class BadRequestException extends ApplicationException {
	constructor(msg) {
		super(msg || ResponseCommonMessages.BAD_REQUEST, ResponseStatusCodes.BAD_REQUEST);
	}
}
module.exports = BadRequestException;