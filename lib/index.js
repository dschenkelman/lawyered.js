'use strict';

/*jshint node:true */

exports.instrument = function(instance){
	var helpers = require('./helpers.js');

	Object.getOwnPropertyNames(instance).filter(function(property){
		return !(/_p(re|ost)$/g.test(property)) && helpers.isFunction(instance[property]);
	}).map(function(property){
		return {
			methodName: property,
			originalMethod: instance[property],
			preConditionsMethod: instance[property + '_pre'],
			postConditionsMethod: instance[property + '_post'],
		};
	}).forEach(function(context){
		var wrapper = helpers.createWrapper(instance, context.originalMethod);
		wrapper._preConditionsMethod = context.preConditionsMethod;
		wrapper._postConditionsMethod = context.postConditionsMethod;
		instance[context.methodName] = wrapper;
	});

	return instance;
};