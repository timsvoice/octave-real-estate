const Handlebars = require('handlebars');
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-partial');
const sass = require('metalsmith-sass');

Handlebars.registerPartial('offering', './partials/offering.html');

Metalsmith(__dirname)
  .use(markdown())
  .use(layouts({
    'engine': 'handlebars',
  }))
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
