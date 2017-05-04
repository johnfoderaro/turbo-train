'use strict';

import entrance from './../lib/entrance';

entrance(window.location.href);

const sessionList = document.getElementById('session-storage');

for (let i = 0; i < sessionStorage.length; i++) {
	const key  = sessionStorage.key(i);
	const val  = sessionStorage.getItem(sessionStorage.key(i));
	const html = `<p><strong>${key}:</strong> ${val}</p>`;
	sessionList.insertAdjacentHTML('afterend', html);
}
