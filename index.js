// Metalsmith packages
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-partial');
const sass = require('metalsmith-sass');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const prefixer = require('metalsmith-autoprefixer');

// Node packages
const Handlebars = require('handlebars');
const uncss = require('uncss');
const fs = require('fs');

Metalsmith(__dirname)
  // create layouts using the handlebars templates
  .use(layouts({
    'engine': 'handlebars',
    'partials': 'partials',
  }))
  // used in development for easy work flow
  .use(serve())
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "${source}/styles/*": "**/*.scss",
        "./layouts/**/*": "**/*.html",
        "./partials/**/*": "**/*.html",
      },
      livereload: true,
    })
  )
  // vendor-prefix all css files automatically
  .use(prefixer())
  // parse scss files into css files
  .use(sass({
    outputDir: './styles',
    outputStyle: "expanded",
    includePaths: ["./node_modules/foundation-sites/scss/", "./node_modules/spinkit/scss/spinners/"]
  }))
  .source('./src')
  .destination('./dist')
  .build(function(err, files) {
    if (err) throw err;
  })

// Remove unused CSS from css files

const files = ['./dist/index.html','./dist/landing.html'];

uncss(files, function (err, res) {
  if (err) throw err;
  console.log('Cleaned up CSS');
  fs.writeFile('./dist/styles/styles.css', res);
})
