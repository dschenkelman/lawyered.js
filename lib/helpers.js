'use strict';

/*jshint node:true */

exports.isFunction = function (f) {
	var getType = {};
	return f && getType.toString.call(f) === '[object Function]';
};

exports.createWrapper = function (instance, context){
	var func = function(){
		var args = Array.prototype.slice.call(arguments);

		if (context.preConditionsMethod){
			context.preConditionsMethod.apply(instance, args);
		}

		var returnValue = context.originalMethod.apply(instance, args);

		if(context.postConditionsMethod){
			args.push(returnValue);
			context.postConditionsMethod.apply(instance, args);
		}

		if (context.invariantMethod){
			context.invariantMethod.call(instance);
		}

		return returnValue;
	};

	return func;
};