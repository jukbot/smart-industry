'use strict';

// Documentation on what goes into PolymerProject.
const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const mergeStream = require('merge-stream');
const del = require('del');
const PolymerProject = require('polymer-build').PolymerProject;
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const project = new PolymerProject(require('./polymer.json'));
const buildDirectory = 'build/default';

/**
 * Waits for the given ReadableStream
 */
function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

function build() {
  return new Promise((resolve, reject) => {
    // Okay, so first thing we do is clear the build
    console.log(`Deleting build/ directory...`);
    del([buildDirectory])
      .then(_ => {
        // Okay, now lets get your source files
        let sourcesHtmlSplitter = new HtmlSplitter();
        let sourcesStream = project.sources()
          // Oh, well do you want to minify stuff? Go for it! 
          // Here's how splitHtml & gulpif work
          .pipe(sourcesHtmlSplitter.split())
          //.pipe(gulpif(/\.js$/, uglify()))
          //.pipe(gulpif(/\.css$/, cssSlam()))
          //.pipe(gulpif(/\.html$/, htmlMinifier()))
          .pipe(sourcesHtmlSplitter.rejoin());

        // Okay now lets do the same to your dependencies
        let depsStream = project.dependencies()
          //.pipe(sourcesHtmlSplitter .splitHtml())
          // .pipe(gulpif(/\.js$/, uglify()))
          // .pipe(gulpif(/\.css$/, cssSlam()))
          // .pipe(gulpif(/\.html$/, htmlMinifier()))
          //.pipe(sourcesHtmlSplitter .rejoinHtml());

        // Okay, now lets merge them into a single build stream.
        let buildStream = mergeStream(sourcesStream, depsStream)
          .once('data', () => {
            console.log('Analyzing build dependencies...');
          });

        // If you want bundling, do some bundling! Explain why?
        // buildStream = buildStream.pipe(polymerProject.bundler);

        // If you want to add prefetch links, do it! Explain why?
        // buildStream = buildStream.pipe(new PrefetchTransform(polymerProject));

        // Okay, time to pipe to the build directory
        buildStream = buildStream.pipe(gulp.dest(buildDirectory));

        // waitFor the buildStream to complete
        return waitFor(buildStream);
      })
      .then(_ => {
        // You did it!
        console.log('Build complete!');
        resolve();
      });
  });
}

gulp.task('default', build);