// load plugins
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;

// paths of the project
var path = {
    watch: {
        html: [
            'app/index.html',
            'app/core/directives/**/*.html',
            'app/templates/**/*.html',
            'app/templates/**/**/**/*.html'
        ],
        js: [
            'app/index.js',
            'app/core/*.js',
            'app/core/directives/**/*.js',
            'app/core/factories/*.js',
            'app/core/filters/*.js',
            'app/core/services/*.js',
            'app/templates/**/*.js',
            'app/templates/**/**/**/*.js'
        ],
        scss: [
            'app/*.scss',
            'app/templates/**/*.scss',
            'app/templates/**/**/**/*.scss'
        ],
        css: 'app/css/main.css',
        img: 'app/assets/img/*.*',
        fonts: 'app/assets/fonts/*.*',
        bower: 'app/bower_components/**/**/**/*.*'
    },
    build: {
        app: 'build/src/',
        bower: 'build/src/bower_components/',
        css: 'build/src/css/',
        img: 'build/src/assets/img/',
        fonts: 'build/src/assets/fonts/'
    }
};

// connect from [ build/ ] - check your build before production!
gulp.task('check-control', function () {
    connect.server({
        port: 9000,
        base: 'build',
        open: false
    });

    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: [
                'build/app'
            ]
        }
    });
});

// connect with the root development folder
gulp.task('connect', ['watch'], function () {
    connect.server({
        port: 9002,
        base: 'app',
        open: false
    });

    browserSync.init({
        notify: false,
        port: 8082,
        server: {
            baseDir: [
                'app'
            ]
        }
    });
});

// convert scss to css
gulp.task('css', function () {
    return gulp.src(path.watch.scss)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(concatCss('main.css'))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

// watch for changes in scss, html, js
gulp.task('watch', function () {
    gulp.watch(path.watch.html).on('change', reload);
    gulp.watch(path.watch.js).on('change', reload);
    gulp.watch(path.watch.scss, ['css']);
    gulp.watch('bower.json', ['bower']);
});

// clean folder [build]
gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// auto-write bower plugins src into index.html
// <html>
//  <head>
//      <!-- bower:css -->
//      <!-- endbower -->
//  </head>
//  <body>
//      <!-- bower:js -->
//      <!-- endbower -->
//  </body>
// </html>
gulp.task('bower', function () {
    gulp.src('app/index.html')
        .pipe(wiredep({
            directory: "app/bower_components"
        }))
        .pipe(gulp.dest('app'));
});

// build project
gulp.task('build', ['clean'], function () {
    // get main bower files
    gulp.src(path.watch.bower)
        .pipe(gulp.dest(path.build.bower));
    // get html
    gulp.src(path.watch.html, {base: "app/."})
        .pipe(gulp.dest(path.build.app));
    // get js
    gulp.src(path.watch.js, {base: "app/."})
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.app));
    // get css
    gulp.src(path.watch.css)
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
    // get img
    gulp.src(path.watch.img)
        .pipe(imagemin({
            progressive: true,
            svgo: {plugins: [{removeViewBox: true}]},
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
    // get fonts
    gulp.src(path.watch.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// start by default
gulp.task('default', ['css', 'bower', 'connect']);