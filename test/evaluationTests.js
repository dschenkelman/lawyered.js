'use strict';

/*jshint node:true */
/*global describe, it*/

require('should');
var contracts = require('../lib/index.js');

describe('lawyered', function(){
	describe('evaluations after instrument', function(){
		it('should invoke method code when method is invoked', function(){
			var invoked = false;
			var obj = {
				m: function(){
					invoked = true;
				}
			};

			contracts.instrument(obj);

			obj.m();

			invoked.should.equal(true);
		});

		it('should evaluate preconditions for method before method is invoked', function(){
			var calls = [];
			var obj = {
				m: function(){
					calls.push('m');
				},
				m_pre: function(){
					calls.push('m_pre');
				}
			};

			contracts.instrument(obj);

			obj.m();

			calls[0].should.equal('m_pre');
			calls[1].should.equal('m');
		});

		it('should evaluate postconditions for method after method is invoked', function(){
			var calls = [];
			var obj = {
				m: function(){
					calls.push('m');
				},
				m_post: function(){
					calls.push('m_post');
				}
			};

			contracts.instrument(obj);

			obj.m();

			calls[0].should.equal('m');
			calls[1].should.equal('m_post');
		});

		it('should evaluate preconditions before and postconditions after method is invoked', function(){
			var calls = [];
			var obj = {
				m: function(){
					calls.push('m');
				},
				m_post: function(){
					calls.push('m_post');
				},
				m_pre: function(){
					calls.push('m_pre');
				}
			};

			contracts.instrument(obj);

			obj.m();

			calls[0].should.equal('m_pre');
			calls[1].should.equal('m');
			calls[2].should.equal('m_post');
		});

		it('should evaluate preconditions of each method before it is invoked', function(){
			var calls = [];
			var obj = {
				m: function(){
					calls.push('m');
				},
				m_pre: function(){
					calls.push('m_pre');
				},
				z: function(){
					calls.push('z');
				},
				z_pre: function(){
					calls.push('z_pre');
				}
			};

			contracts.instrument(obj);

			obj.m();
			obj.z();

			calls[0].should.equal('m_pre');
			calls[1].should.equal('m');
			calls[2].should.equal('z_pre');
			calls[3].should.equal('z');
		});

		it('should evaluate postconditions of each method after it is invoked', function(){
			var calls = [];
			var obj = {
				m: function(){
					calls.push('m');
				},
				m_post: function(){
					calls.push('m_post');
				},
				z: function(){
					calls.push('z');
				},
				z_post: function(){
					calls.push('z_post');
				}
			};

			contracts.instrument(obj);

			obj.m();
			obj.z();

			calls[0].should.equal('m');
			calls[1].should.equal('m_post');
			calls[2].should.equal('z');
			calls[3].should.equal('z_post');
		});

		it('should not evaluate preconditions before preconditions methods is invoked', function(){
			var calls = [];
			var obj = {
				m_pre: function(){
					calls.push('m_pre');
				}
			};

			contracts.instrument(obj);

			obj.m_pre();

			calls[0].should.equal('m_pre');
			calls.length.should.equal(1);
		});

		it('should not evaluate postconditions after postconditions methods is invoked', function(){
			var calls = [];
			var obj = {
				m_post: function(){
					calls.push('m_post');
				}
			};

			contracts.instrument(obj);

			obj.m_post();

			calls[0].should.equal('m_post');
			calls.length.should.equal(1);
		});


		it('should not modify non methods', function(){
			var calls = [];
			var obj = {
				attr: {
					value: 10,
				},
				attr_pre: function(){
					calls.push('m_post');
				}
			};

			contracts.instrument(obj);

			obj.attr.value.should.equal(10);
			calls.length.should.equal(0);
		});
	});
});