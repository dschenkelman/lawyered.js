'use strict';

/*jshint node:true */
/*global describe, it*/

require('should');
var contracts = require('../lib/index.js');

describe('lawyered', function(){
	describe('method return values after instrumenting object', function(){
		it('should return the same value the original method returned', function(){
			var toReturn = 'returnValue';

			var obj = {
					m: function(){
						return toReturn;
					},
					m_post: function(){
					},
					m_pre: function(){
					}
				};

			contracts.instrument(obj);

			var returnedValue = obj.m();

			returnedValue.should.equal(toReturn);
		});
	});
});