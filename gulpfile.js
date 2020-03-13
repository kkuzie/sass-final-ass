let gulp = require('gulp');
//to bring in imagemin:
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');


// TOP LEVEL FUNCTIONS

// gulp.task - define tasks 
// gulp.src - point to files to use 
// gulp.dist - points to folder to output 
// gulp.watch - watch files and folders for changes 

//logs message
gulp.task('ciao', function(done) {
    // return gulp.src('package.json')//need this to rid of 'did you forget to signal async completion
    console.log('ciao karen'); done();
});

//to run console by default change ciao to default

// gulp.task('default', function(done) {
//   console.log('ciao karen'); done();
// });

//copy all html files
gulp.task('copyHtml', function(done) 
{
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

//optimize images (plugin gulp imagemin)
//npm install --save-dev gulp-imagemin
//dont forget to bring it in (line 2)
gulp.task ('imageMin', () => 
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

//minify js code
//npm install --save-dev gulp-uglify
//dont forget to bring it in (line 3)
gulp.task('minify', function(done) 
{
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
});

//compile sass
//npm install --save-dev gulp-sass
gulp.task('sass', function(done) 
{
    gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError)) 
      .pipe(gulp.dest('dist/css'));//to css folder not sass bcuz it will be converted to css!
      done();
});

// gulp.task('default', ['ciao', 'copyHtml', 'imageMin', 'minify', 'sass']);

gulp.task('watch', function()
{
  // gulp.watch('src/js/*.js', gulp.series('scripts'));//file path and [name of task]
  gulp.watch('src/images/*',gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  // done();
});


// gulp.task('sass', function(){
//     return gulp.src('src/scss/styles.scss')
//       .pipe(sass()) // Converts Sass to CSS with gulp-sass
//       .pipe(gulp.dist('src/css'))
//   });

//   gulp.task('sass', function() {
//     return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
//       .pipe(sass())
//       .pipe(gulp.dist('src/css'))
//   })

  // NOTE! Gulp 4.x watch syntax (all the rest of the examples would need to be like this for Gulp 4

// gulp.task('watch', function(){
// gulp.watch('src/scss/**/*.scss', gulp.series(['sass']));
// });

//GET ERROR:
// npm ERR! code EINVAL
// npm ERR! EINVAL: invalid argument, read

// npm ERR! A complete log of this run can be found in:
// npm ERR!     C:\Users\kkuzi\AppData\Roaming\npm-cache\_logs\2020-03-09T02_42_57_289Z-debug.log    
// AFTER ENTERING NPM INSTALL BROWSER-SYNC --SAVE-DEV AT CMD PROMPT


// var browserSync = require('browser-sync').create();
// gulp.task('browserSync', function() 
// {
//     browserSync.init(
//     {
//       server: 
//         {
//         baseDir: 'src'
//         },
//     })
// })
//   gulp.task('sass', function() 
//     {
//     return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
//       .pipe(sass())
//       .pipe(gulp.dest('src/css'))
//       .pipe(browserSync.reload({
//         stream: true
//     }))
// });
// gulp.task('watch', ['browserSync'], function (){
//     gulp.watch('app/scss/**/*.scss', ['sass']); 
//     // Other watchers
//   })
//   gulp.task('watch', ['browserSync', 'sass'], function ()
//   {
//     gulp.watch('src/scss/**/*.scss', ['sass']); 
//     // Other watchers
//   });