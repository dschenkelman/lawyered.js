'use strict';

/*jshint node:true */
/*global describe, it*/

require('should');
var contracts = require('../lib/index.js');

describe('lawyered', function(){
	describe('prencondition parameters', function(){
		it('should pass method parameters to precondition', function(){
			var params = [];

			var obj = {
					m: function(){
					},
					m_pre: function(p1, p2, p3){
						params.push(p1);
						params.push(p2);
						params.push(p3);
					}
				};

			contracts.instrument(obj);

			obj.m(1, 2, 3);

			params.length.should.equal(3);
			params[0].should.equal(1);
			params[1].should.equal(2);
			params[2].should.equal(3);
		});
		it('should pass correct instance to precondition', function(){
			var instance = null;

			var obj = {
					m: function(){
					},
					m_pre: function(){
						instance = this;
					}
				};

			contracts.instrument(obj);

			obj.m();

			obj.should.equal(instance);
		});
	});

	describe('method parameters', function(){
		it('should pass method parameters to method', function(){
			var params = [];

			var obj = {
					m: function(p1, p2, p3){
						params.push(p1);
						params.push(p2);
						params.push(p3);
					},
					m_pre: function(){
					}
				};

			contracts.instrument(obj);

			obj.m(1, 2, 3);

			params.length.should.equal(3);
			params[0].should.equal(1);
			params[1].should.equal(2);
			params[2].should.equal(3);
		});

		it('should pass correct instance to original method', function(){
			var instance = null;

			var obj = {
					m: function(){
						instance = this;
					},
					m_pre: function(){
					}
				};

			contracts.instrument(obj);

			obj.m();

			obj.should.equal(instance);
		});
	});

	describe('postcondition parameters', function(){
		it('should pass method parameters to postcondition', function(){
			var params = [];

			var obj = {
					m: function(){
					},
					m_post: function(p1, p2, p3){
						params.push(p1);
						params.push(p2);
						params.push(p3);
					}
				};

			contracts.instrument(obj);

			obj.m(1, 2, 3);

			params.length.should.equal(3);
			params[0].should.equal(1);
			params[1].should.equal(2);
			params[2].should.equal(3);
		});
		it('should pass correct instance to postcondition', function(){
			var instance = null;

			var obj = {
					m: function(){
					},
					m_post: function(){
						instance = this;
					}
				};

			contracts.instrument(obj);

			obj.m();

			obj.should.equal(instance);
		});
		it('should pass return value as last postcondition parameter', function(){
			var toReturn = 'returnValue',
			returnedValue = null;

			var obj = {
					m: function(){
						return toReturn;
					},
					m_post: function(p1, p2, p3, returnValue){
						returnedValue = returnValue;
					}
				};

			contracts.instrument(obj);

			obj.m(1, 2, 3);

			toReturn.should.equal(returnedValue);
		});
	});
});