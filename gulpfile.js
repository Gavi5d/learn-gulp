
// grab our gulp packages
var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync");
var eslint = require("gulp-eslint");

gulp.task("default", ["watch", "browser-sync"]);

gulp.task("browser-sync", function () {
    browserSync.init({
        server: "./"
    })
});

gulp.task("eslint", function () {
    return gulp.src("source/javascript/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
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
    gulp.watch("source/javascript/**/*.js", ["eslint", "build-js"]);
    gulp.watch("source/scss/**/*.scss", ["build-css"]);
    gulp.watch(["public/assets/**", "index.html"]).on("change", browserSync.reload);
});
