var gulp = require('gulp');
var browserSync = require('browser-sync');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var protractor = require('gulp-protractor').protractor;

gulp.task("test-browser", function(){
	new Server({
		configFile:__dirname + '/karma.conf.js',
		singleRun:true
	}).start();
})

gulp.task('serve-test', function(){
	browserSync.init({
		notify:false,
		port:8081,
		server:{
			baseDir:["test","app"],
			routes:{
				'/bower_components':'bower_components'
			}
		}
	})
	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
})

gulp.task('app-test', function(){
	browserSync.init({
		notify:false,
		port:8080,
		server:{
			baseDir:["app"],
			routes:{
				'/bower_components':'bower_components'
			}
		}
	})
	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
})

gulp.task('sass', function () {
 return gulp.src('app/sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./css'))
  .pipe(gulp.dest('app/css'));
});

gulp.task("protractor", ['app-test'], function(done){
	gulp.src(['e2e/*.js'])
		.pipe(protractor({
			configFile: "test/protractor.config.js",
			args:['--baseUrl','http://localhost:8000']
		}))
		.on('end', done);
})

