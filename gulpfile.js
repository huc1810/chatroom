/**
 * Created by hsantiago on 10/10/2016.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
    /*browserSync({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch(['public/!*.html', 'public/css/!**!/!*.css', 'public/js/!**!/!*.js'], {cwd: 'app'}, reload);*/
});

gulp.task('nodestart', function (cb) {
    exec('node app/server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})