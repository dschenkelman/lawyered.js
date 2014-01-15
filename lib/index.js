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
			if (context.preConditionsMethod){
				context.preConditionsMethod();	
			}

			var returnValue = context.originalMethod();

			if(context.postConditionsMethod){
				context.postConditionsMethod();
			}

			return returnValue;
		};
	});

	return instance;
};