'use strict';

// gulp config obj
const config = require('./../config/gulp');

// gulp dependencies
const browserify = require('browserify');
const bs = require('browser-sync').create();
const buffer = require('vinyl-buffer');
const del = require('del');
const gulp = require('gulp');
const source = require('vinyl-source-stream');

// TODO pass bool to toggle maps/minifyGlobalJs
// adds source map data url to file: default === false
const maps = (() => {
	let flag = false;
	return (bool) => {
		if (bool) flag = true;
		return flag;
	};
})();

// minifies *all* es2015 module code: default = true
const minifyGlobalJs = (() => {
	let flag = { global: true };
	return (bool) => {
		if (bool === false) flag.global = false;
		return flag;
	};
})();

// helper for browserify/babelify test transpiling
const tests = gulp.watch(config.app.test.src);
tests.on('change', event => {
	// grab just the name of the change file, not entire path
	const file = event.path.substr(event.path.lastIndexOf('/') + 1);
	compileJs({
		main: `./test/${file}`,
		src: `${file}`,
		dest: './test/browser'
	});
});

function compileJs(options) {
	return browserify(options.main, { debug: maps() })
		.transform('babelify', { presets: ['es2015'] })
		.transform('uglifyify', minifyGlobalJs())
		.bundle()
		.pipe(source(options.src))
		.pipe(buffer())
		.pipe(gulp.dest(options.dest));
}

gulp.task('js', () => {
	return compileJs({
		main: config.app.js.main,
		src: config.app.js.src,
		dest: config.app.js.dest
	});
});

gulp.task('build', done => {
	gulp.src(config.app.build.src)
		.pipe(gulp.dest(config.app.build.dest))
		.on('end', () => {
			del(config.app.build.del);
			bs.reload();
			done();
		});
});

gulp.task('development', ['build'], () => {
	maps(true);
	minifyGlobalJs(false);
	bs.init(config.browserSync);
	gulp.watch(config.app.js.watch, ['js']);
	gulp.watch(config.app.watch, ['build']);
});
