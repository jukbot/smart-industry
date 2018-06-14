const gulp = require("gulp");
const del = require("del");
/**
 * Builds the Firebase-ready version of the PWA, moving the necessary
 * files to the functions folder to be used by PRPL Server
 */
gulp.task("firebase", () => {
  // These are the files needed by PRPL Server, that are going to be moved to the functions folder
  const filesToMove = ["build/polymer.json", "build/**/index.html"];
  // Delete the build folder inside the functions folder
  return (
    del("functions/build")
      .then(
        () =>
          // Copy the files needed by PRPL Server
          new Promise(resolve =>
            gulp
              .src(filesToMove, { base: "." })
              .pipe(gulp.dest("functions"))
              .on("end", resolve)
          )
      )
      // Delete them from the original build
      .then(() => del(filesToMove))
  );
});
