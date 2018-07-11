var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./limeiwang/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./limeiwang/css'))
});
gulp.task('watch', function () {
    gulp.watch('./limeiwang/scss/*.scss',['sass']);
});

gulp.task('server', ['sass'], function () {
    gulp.src('limeiwang')
        .pipe(server({
            port: 9090,
            middleware: function (req, res) {
                var pathname = url.parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'limeiwang',pathname)))
            }
        }))
});

gulp.task('dev', ['server', 'watch']);