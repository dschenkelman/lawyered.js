var should = require('should'),
contracts = require('../lib/index.js');

describe('contracts', function(){
	describe('return values after instrument', function(){
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