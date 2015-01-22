'use strict';

/**
 * Module dependencies.
 */
var systemsPolicy = require('../policies/starSystems.server.policy.js'),
	starSystems = require('../controllers/starSystems.server.controller.js');

module.exports = function(app) {
	// Articles collection routes
	app.route('/api/starSystems').all(systemsPolicy.isAllowed)
		.get(starSystems.list)
		.post(starSystems.create);

	// Single article routes
	app.route('/api/starSystems/:systemId').all(systemsPolicy.isAllowed)
		.get(starSystems.read)
		.put(starSystems.update)
		.delete(starSystems.delete);

    app.route('/api/starSystemsByName/:systemName').all(systemsPolicy.isAllowed)
        .get(starSystems.systemByName);


    // Finish by binding the article middleware
	app.param('systemId', starSystems.systemByID);
    app.param('systemName', starSystems.systemByName);
};
