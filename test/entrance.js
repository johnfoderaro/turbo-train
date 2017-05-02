'use strict';

const assert = require('assert');

import entrance from './../src/lib/entrance';

const localHost = 'http://localhost:3000/test/';

describe('entrance', () => {
	it(`should set sessionStorage 'entrancePage' as '${localHost}'.`, () => {
		sessionStorage.clear();
		assert.equal(entrance(window.location.href), localHost);
	});
});
