var gulp =require('gulp')
    less=require('gulp-less')
    cleanCSS = require('gulp-clean-css');
    // concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var pump = require('pump');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 20 versions"]});
// var rimraf = require('gulp-rimraf');
// const image = require('gulp-image');
 
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: './build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: './src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/script.js',//В стилях и скриптах нам понадобятся только main файлы
        less: 'src/less/style.less',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: './src/**/*.html',
        js: 'src/js/**/*.js',
        less: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
    /**
     * img
     */
gulp.task('img', function () {
  gulp.src(path.src.img)
    // .pipe(image())
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});
    /**
     * less
     */
gulp.task('less',function(){ 
    return gulp.src(path.src.less)
        .pipe(rigger())
        .pipe(less({ plugins: [autoprefixPlugin] }).on('error',function(error){
            console.log(error)
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});
    /**
     * html
     */
gulp.task('html',function(){ 
    // console.log('rewrite', (new Date()).getMinutes());
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
});
    /**
     * js
     */
gulp.task('js',function(cb){ 
    // console.log('rewrite', (new Date()).getMinutes());
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});
    /**
     * fonts
     */
    gulp.task('fonts', function() {
        gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
            .pipe(browserSync.stream());
    });
    /**
     * browsersync
     */
gulp.task('serve',['less'],function(){
    browserSync.init({
        server:path.build.html
    });
    gulp.watch("./src/less/**/*.less",['less']);
    gulp.watch("./src/js/**/*.js",['js']).on("change",browserSync.reload);
    gulp.watch(path.src.fonts,['fonts']).on("change",browserSync.reload);
    gulp.watch('./src/img/**/*.*',["img"]).on("change",browserSync.reload);
    gulp.watch("./src/**/*.html", ["html"]).on("change",browserSync.reload);

});
gulp.task('default',["html", "less", "js", "img", "fonts", "serve"]);
    /** 
    * clean
    */
gulp.task('cleanjs', function () {
	gulp.src('build/js/script.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('build/js/script.min.js'));
});