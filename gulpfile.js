const gulp = require("gulp");
const tslint = require("gulp-tslint");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const child = require('child_process');
const chalk = require('chalk');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    return gulp.src('build/*', {
        read: false
    })
        .pipe(clean());
});

gulp.task("lint", ["build"], function () {
    return gulp.src("src/**/*.ts").pipe(tslint({}))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('build', ["clean"], function () {

    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init()) 
        .pipe(tsProject());

    return tsResult.js
       .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['server']);
});

var server;
gulp.task('server', ["build", 'lint'], function () {
    process.env.gulpTesting = false;

    if (server) {
        server.kill("SIGINT");
    }
    server = child.spawn('node', ['build/start.js']);
    server.stdout.on('data', function (data) {
        console.log(chalk.white(data.toString()));
    });
    server.stderr.on('data', function (data) {
        console.log(chalk.red(data.toString()));
    });
});

gulp.task('test', ['build'], function () {
    process.env.gulpTesting = true;

    if (server) {
        server.kill("SIGINT");
    }
    server = child.spawn('node', ['node_modules/mocha/bin/_mocha', 'build/**/*.test.js']);
    server.stdout.on('data', function (data) {
        console.log(chalk.green(data.toString()));
    });
    server.stderr.on('data', function (data) {
        console.log(chalk.red(data.toString()));
    });

    server.on('close', () => {
        server.kill("SIGINT");
    });


});

gulp.task('default', ['server', 'watch']);
