'use strict';

/*jshint node:true */

exports.instrument = function(instance){
	function isFunction(f) {
		var getType = {};
		return f && getType.toString.call(f) === '[object Function]';
	}

	Object.getOwnPropertyNames(instance).filter(function(property){
		return !(/_p(re|ost)$/g.test(property)) && isFunction(instance[property]);
	}).map(function(property){
		return {
			methodName: property,
			originalMethod: instance[property],
			preConditionsMethod: instance[property + '_pre'],
			postConditionsMethod: instance[property + '_post'],
		};
	}).forEach(function(context){
		instance[context.methodName] = function(){
			var args = Array.prototype.slice.call(arguments);

			if (context.preConditionsMethod){
				context.preConditionsMethod.apply(instance, args);
			}

			var returnValue = context.originalMethod.apply(instance, args);

			if(context.postConditionsMethod){
				args.push(returnValue);
				context.postConditionsMethod.apply(instance, args);
			}

			return returnValue;
		};
	});

	return instance;
};