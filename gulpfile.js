'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var del = require('del')
var server = require('gulp-develop-server')

var to5 = require('gulp-6to5')
var traceur = require('gulp-traceur')
var jstransform = require('gulp-jstransform')
var jsdc = require('gulp-jsdc')
var esnext = require('gulp-esnext')
var es6transpiler = require('gulp-es6-transpiler')

var es6src = 'src/**.js'
var es6src_client = 'client/**.js'
var usedTranspiler = '6to5'

var es6tasks = []

function es6task(name, transpiler, options) {
	es6tasks.push(name)
	gulp.task(name, ['clean'], function () {
		return gulp.src(es6src).
			pipe(plumber()).
			pipe(transpiler(options)/*.on('error', gutil.log)*/).
			pipe(gulp.dest('dist/' + name))
	})
}

es6task('6to5', to5/*, {experimental: true}*/)
es6task('traceur', traceur/*, {module: 'instantiate'}*/)
//es6task('jstransform', jstransform)
es6task('jsdc', jsdc)
es6task('esnext', esnext)
//es6task('es6-transpiler', es6transpiler)

gulp.task('es6', es6tasks)

gulp.task('clean', function (cb) {
	return del('dist/**/*.js', cb)
})

gulp.task('server', ['es6'], function () {
	return server.listen({
		path: 'dist/' + usedTranspiler + '/server.js',
		execArgv: ['--harmony']
	})
})

gulp.task('restart-server', [usedTranspiler], server.restart)

gulp.task('client', function () {
	gulp.src(es6src_client).
		pipe(plumber()).
		pipe(to5()).
		pipe(gulp.dest('public'))
})

gulp.task('watch', function () {
	gulp.watch(es6src, ['clean'].concat(es6tasks, 'restart-server'))
	gulp.watch(es6src_client, ['client'])
})

gulp.task('default', ['server', 'watch'])
