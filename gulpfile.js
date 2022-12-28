const gulp = require("gulp");
const rename = require("gulp-rename");
const merge = require("merge-stream");

function deploy() {
  const noHTMLStream = gulp.src(["./out/**/*.*", "!./out/**/*.html"]);

  const HTMLStream = gulp.src("./out/**/*.html").pipe(
    rename(function (path) {
      if (path.basename !== "index") {
        path.extname = "";
      }
    })
  );

  return merge(noHTMLStream, HTMLStream).pipe(gulp.dest("./dist"));
}

exports.default = gulp.series(deploy);
