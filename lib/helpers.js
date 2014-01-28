'use strict';

/*jshint node:true */

exports.isFunction = function (f) {
	var getType = {};
	return f && getType.toString.call(f) === '[object Function]';
};

exports.createWrapper = function (instance, originalMethod){
	var func = function(){
		var args = Array.prototype.slice.call(arguments);

		if (func._preConditionsMethod){
			func._preConditionsMethod.apply(instance, args);
		}

		var returnValue = originalMethod.apply(instance, args);

		if(func._postConditionsMethod){
			args.push(returnValue);
			func._postConditionsMethod.apply(instance, args);
		}

		return returnValue;
	};

	return func;
};