'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var del = require('del')
var server = require('gulp-develop-server')

var babel = require('gulp-babel')
var traceur = require('gulp-traceur')
var jstransform = require('gulp-jstransform')
var jsdc = require('gulp-jsdc')
var esnext = require('gulp-esnext')
var es6transpiler = require('gulp-es6-transpiler')

var es6src = 'src/**.js'
var es6src_client = 'client/**.js'
var usedTranspiler = 'babel'

var es6tasks = []

function es6task(name, transpiler, options) {
	es6tasks.push(name)
	gulp.task(name, ['clean'], function () {
		return gulp.src(es6src)
			.pipe(plumber())
			.pipe(transpiler(options)/*.on('error', gutil.log)*/)
			.pipe(gulp.dest('dist/' + name))
	})
}

es6task('babel', babel/*, {stage: 0}*/)
es6task('traceur', traceur/*, {module: 'instantiate'}*/)
//es6task('jstransform', jstransform)
es6task('jsdc', jsdc)
es6task('esnext', esnext)
//es6task('es6-transpiler', es6transpiler)

gulp.task('es6', es6tasks)

gulp.task('clean', function (cb) {
	del('dist/**/*.js', cb)
})
es6tasks.unshift('clean')

gulp.task('client', function () {
	gulp.src(es6src_client).
		pipe(plumber()).
		pipe(babel({optional: ['es7.asyncFunctions']})).
		pipe(gulp.dest('public'))
})

gulp.task('server:start', [usedTranspiler], function () {
	server.listen({
		path: 'dist/' + usedTranspiler + '/server.js',
		execArgv: ['--harmony'],
	})
})

gulp.task('server:restart', [usedTranspiler], function () {
	server.restart()
})

gulp.task('default', es6tasks.concat('server:start'), function () {
	gulp.watch(es6src, es6tasks.concat('server:restart'))
	gulp.watch(es6src_client, ['client'])
})
