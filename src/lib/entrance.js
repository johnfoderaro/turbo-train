'use strict';

export default function entrance(href) {
	if (!sessionStorage.entrancePage) {
		sessionStorage.setItem('entrancePage', href);
	}
	return sessionStorage.entrancePage;
}
