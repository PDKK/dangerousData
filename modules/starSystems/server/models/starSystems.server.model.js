'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var StarSystemSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	neighbours: [{name:String, distance: Number}],
	commodities: [{name:String, buy: Number, sell:Number, demand: String, supply: String}],
	stations: [{name:String, distance: Number, blackMarket: Boolean}],
	notes: String
});

mongoose.model('StarSystem', StarSystemSchema, 'starSystems');
