'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	StarSystem = mongoose.model('StarSystem'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a system
 */
exports.create = function(req, res) {
	var starSystem = new StarSystem(req.body);
	starSystem.user = req.user;

	starSystem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(starSystem);
		}
	});
};

/**
 * Show the current system
 */
exports.read = function(req, res) {
	res.json(req.system);
};

/**
 * Update a system
 */
exports.update = function(req, res) {
	var starSystem = req.system;

	starSystem.name = req.body.name;

	starSystem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(starSystem);
		}
	});
};

/**
 * Delete an system
 */
exports.delete = function(req, res) {
	var starSystem = req.system;

	starSystem.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(starSystem);
		}
	});
};

/**
 * List of Systems
 */
exports.list = function(req, res) {
	StarSystem.find().sort('-created').populate('user', 'displayName').exec(function(err, starSystems) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(starSystems);
		}
	});
};

/**
 * StarSystem middleware
 */
exports.systemByID = function(req, res, next, id) {
	StarSystem.findById(id).populate('user', 'displayName').exec(function(err, starSystem) {
		if (err) return next(err);
		if (!starSystem) return next(new Error('Failed to load starSystem ' + id));
		req.starSystem = starSystem;
		next();
	});
};
