var should = require('should'),
contracts = require('../lib/index.js');

describe('lawyered', function(){
	describe('instrument', function(){
		it('should return object to instrument', function(){
			var invocations = [];
			var toReturn = 'returnValue';

			var obj = contracts.instrument({
				m: function(){
					invocations.push("m");
					return toReturn;
				},
				m_post: function(){
					invocations.push("m_post");
				},
				m_pre: function(){
					invocations.push("m_pre");
				}
			});

			var returnedValue = obj.m();

			returnedValue.should.equal(toReturn);
			invocations.length.should.equal(3);
			invocations[0].should.equal("m_pre");
			invocations[1].should.equal("m");
			invocations[2].should.equal("m_post");
		});
	});
});