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
  // vendor-prefix all css files automatically
  .use(prefixer())
  // parse scss files into css files
  .use(sass({
    outputDir: './styles',
    outputStyle: "expanded",
    includePaths: ["./node_modules/foundation-sites/scss/", "./node_modules/spinkit/scss/spinners/"]
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "src/styles/**/*": "**/*",
      "partials/**/*": "**/*",
      "layouts/**/*": "**/*"
    },
    livereload: true
  }))
  .source('./src')
  .destination('./dist')
  .build(function(err, files) {
    if (err) throw err;
  })

// Remove unused CSS from css files

const files = ['./dist/*.html'];
const options = {
  // array of css selectors that are added
  // by javascript/jQuery events. Important
  // to list as they will be removed otherwise
  ignore: [
    '.animated',
    '.fadeOut',
    '.fadeIn',
    '.fadeInUp',
    '.slideInUp',
    '.overlay-menu.close nav ul',
    '.overlay-menu.open nav ul',
    '.overlay-menu nav ul',
    '.overlay-menu nav',
    '.overlay-menu.open',
    '.overlay-menu',
  ]
}

// uncss(files, options, function (err, res) {
//   if (err) throw err;
//   console.log('Cleaned up CSS');
//   fs.writeFile('./dist/styles/styles.css', res);
// })
