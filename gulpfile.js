
// grab our gulp packages
var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

gulp.task("default", ["watch"]);

gulp.task("jshint", function () {
    return gulp.src("source/javascript/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("build-css", function () {
    return gulp.src("source/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public/assets/stylesheets"));
});

gulp.task("build-js", function () {
    return gulp.src("source/javascript/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(gutil.env.type === "production" ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public/assets/javascript"));
});

gulp.task("watch", function () {
    gulp.watch("source/javascript/**/*.js", ["jshint"]);
    gulp.watch("source/scss/**/*.scss", ["build-css"]);
});








