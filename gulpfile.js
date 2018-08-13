const gulp = require('gulp')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const del = require('del')

/**
 * STEP 1 Cleans the prpl-server build in the server directory.
 */
gulp.task('prpl-server:clean', () => {
  return del('build/')
})

/**
 * STEP 2 Copies the prpl-server build to the server directory while renaming the
 * node_modules directory so services like App Engine will upload it.
 */
gulp.task('prpl-server:build', () => {
  const pattern = 'node_modules'
  const replacement = 'node_assets'

  return gulp.src('build/**')
    .pipe(rename((path) => {
      path.basename = path.basename.replace(pattern, replacement)
      path.dirname = path.dirname.replace(pattern, replacement)
    }))
    .pipe(replace(pattern, replacement))
    .pipe(gulp.dest('build/'))
})

gulp.task('prpl-server', gulp.series(
  'prpl-server:clean',
  'prpl-server:build'
))

/**
 * Builds the Firebase-ready version of the PWA, moving the necessary
 * files to the functions folder to be used by PRPL Server
 */
gulp.task('firebase', () => {
  // These are the files needed by PRPL Server, that are going to be moved to the functions folder
  const filesToMove = [ 'build/polymer.json', 'build/**/index.html', 'build/**/push-manifest.json' ]
  // Delete the build folder inside the functions folder
  return del('functions/build')
    .then(() =>
      // Copy the files needed by PRPL Server
      new Promise((resolve) =>
        gulp
          .src(filesToMove, { base: '.' })
          .pipe(gulp.dest('functions'))
          .on('end', resolve)))
    // Delete them from the original build
    .then(() => del(filesToMove))
})