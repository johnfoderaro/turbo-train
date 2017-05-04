'use strict';

module.exports = {
	browserSync: {
		open: false,
		notify: false,
		ghostMode: true,
		server: {
			baseDir: '.',
			routes: {
				'/public': 'public',
				'/test': 'test'
			}
		}
	},
	app: {
		test: {
			src: './test/**/*.js',
		},
		js: {
			main: './src/js/app.js',
			src: 'app.min.js',
			dest: './src/js',
			watch: ['src/lib/**/*.js', 'src/js/app.js']
		},
		watch: [
			'test/**/*.html',
			'test/browser/**/*.js',
			'src/**/*.html',
			'src/js/app.min.js',
		],
		build: {
			src: './src/**/*',
			dest: './public',
			del: [
				'./public/lib/',
				'./public/js/app.js',
			]
		}
	}
};
