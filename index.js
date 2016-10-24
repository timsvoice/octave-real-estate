const Handlebars = require('handlebars');
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-partial');
const sass = require('metalsmith-sass');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .use(layouts({
    'engine': 'handlebars',
    'partials': 'partials',
  }))
  .use(serve())
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "./layouts/**/*": true,
        "./partials/**/*": true,
      },
      livereload: true,
    })
  )
  .use(sass({
    outputDir: './css',
    outputStyle: "expanded",
    includePaths: ["./node_modules/foundation-sites/scss/"]
  }))
  .source('./src')
  .destination('./dist')
  .build(function(err, files) {
    if (err) throw err;
  })
