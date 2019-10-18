const authService = require('../../services/auth');
const { validationResult } = require('express-validator');
const { ResponseStatusCodes } = require('./../../util/constants/responceStatusCodes');
const { ResponseCommonMessages } = require('./../../util/constants/responceCommonMessages');
const Logger = require('../../util/log/logger');

module.exports.signUp = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(ResponseStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		} else {
			const serviceResponse = await authService.signUp(req);
			return res.status(200).json({ success: true, message: serviceResponse.message });
		}
	} catch (err) {
		Logger.log(err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};

module.exports.signIn = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(ResponseStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		} else {
			const serviceResponse = await authService.signIn(req);
			return res.status(200).json({ success: true, message: serviceResponse.message });
		}
	} catch (err) {
		Logger.log(err);
		return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
	}
};