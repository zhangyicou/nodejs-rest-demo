var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	path = require('path'),
	minifyCSS = require('gulp-clean-css'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify');

/*
 * 编译各页面less文件到css文件
 * 将demo中每个页面的less文件生成css文件，
 * 放置到原less文件夹的平级文件夹内.即如下结构。
 * .
 * ├── css
 * │   └── login.css
 * └── less
 *     └── login.less
 */ 
//clean css-build;
gulp.task("clean-css-build", function(){
	return gulp.src('dist/css')
		.pipe(clean());
});
gulp.task("clean-html-build", function(){
	return gulp.src('dist/html')
		.pipe(clean());
});

//cssmin
gulp.task('cssmin',function(obj){
	return gulp.src(['src/less/**/*.less'])
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(rename(function(path){
		path.dirname = path.dirname.replace('less','css');
		path.extname = '.css';
	}))
	.pipe(gulp.dest('src/css'));
});
//cssmin
/*gulp.task('cssmin',['clean-css-build'],function(obj){
	return gulp.src(['less/!**!/!*.less'])
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(rename(function(path){
			path.dirname = path.dirname.replace('less','css-dist');
			path.extname = '.css';
		}))
		.pipe(gulp.dest('css-dist'));
});*/

gulp.task('minifyjs', function() {
	return gulp.src('js/common/core/jquery-plugins/jquery.fullpage.js')
		.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
		.pipe(uglify())    //压缩
		.pipe(gulp.dest('js/common/core/jquery-plugins'));  //输出
});


//js concat use r.js in build.js

//md5
gulp.task('rev-css-page',['cssmin','clean-css-build'],function(obj){
	return gulp.src('src/css/page/*.css')
	//.pipe(clean())
	.pipe(rev())  //文件名加MD5后缀
	.pipe(gulp.dest('dist/css/page'))
	.pipe(rev.manifest({
		base:''
		//merge:true
	}))  //生成一个rev-manifest.json
	.pipe(rename({basename:"rev-css-manifest"}))
	.pipe(gulp.dest('dist/rev'));
});

gulp.task('rev-js-page',function(obj){
	return gulp.src('dist/js/test-page/*.js')
		.pipe(clean())
		.pipe(rev())  //文件名加MD5后缀
		.pipe(gulp.dest('dist/js/test-page'))
		.pipe(rev.manifest({
			base:''
			//merge:true
		}))  //生成一个rev-manifest.json
		.pipe(rename({basename:"rev-js-manifest"}))
		.pipe(gulp.dest('dist/rev'));
});

gulp.task('collector',['clean-html-build','rev-css-page','rev-js-page'],function(){
	return gulp.src(['dist/rev/*.json','src/html/*/*.html'])
		.pipe(revCollector({
			replaceReved:true
		}))
		.pipe(gulp.dest('dist/html'))
});

gulp.task('default', ['cssmin','rev-css-page','rev-js-page','collector']);
