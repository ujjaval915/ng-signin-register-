/**
 * Created by Ujjaval on 5/31/2016.
 */
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
    minifyCss = require("gulp-minify-css"),
    templateCache = require("gulp-angular-templatecache"),
    sequence = require("gulp-sequence"),
    gulpBowerFiles = require("gulp-bower-files"),
    wiredep = require("wiredep").stream,
    minifyHTML = require("gulp-minify-html"),
    order = require("gulp-order"),
    server = require("gulp-develop-server");

//Convert SASS to css
gulp.task("sass",function() {
    return gulp.src("src/client/sass/**/*.scss")
        .pipe(order(["global.scss","**/*.scss"]))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});


//Minify Javascript file

gulp.task ("javascript",function(){
    return gulp.src(['src/client/app/**/*.js'])
        .pipe(order(['module.js','**/*.js']))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'));
});


//Create template Cache
gulp.task('template',function(){
    return gulp.src(['src/client/app/**/*.html','!src/client/app/index.html'])
        .pipe(minifyHTML({ empty : true}))
        .pipe(templateCache({standalone : true}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/template'));
});

gulp.task('bower-copy',function(){
    return gulpBowerFiles().pipe(gulp.dest("dist/bower_components"))
});


gulp.task('inject',function(){
    var target = gulp.src('src/client/app/index.html'),
        jsSource = gulp.src(['dist/template/*.js','dist/script/*.js'], {read:false}, {relative: true}),
        cssSource = gulp.src(['dist/css/*.css'], {read:false}, {relative: true});
        target.pipe(inject(jsSource, {ignorePath : 'dist/', addRootSlash : false}))
        target.pipe(inject(cssSource, {ignorePath : 'dist/', addRootSlash : false}))
            .pipe(gulp.dest('dist/'));

});

gulp.task('bower-inject',function () {
   return gulp.src('dist/index.html')
       .pipe(wiredep({
           ignorePath : '../'
       }))
       .pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
    gulp.watch('src/client/sass/**/*.scss',['sass']);
    gulp.watch('src/client/app/**/*.html',['template']);
    gulp.watch('src/client/app/**/*.js',['javascript']);
});


gulp.task('server:start',function(){
    server.listen({path:'src/server/index.js'});
});
gulp.task('build',sequence(['sass','template','javascript'],'inject','bower-copy','bower-inject','watch','server:start'));




