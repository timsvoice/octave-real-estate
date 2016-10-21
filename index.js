const Handlebars = require('handlebars');
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const partials = require('metalsmith-partial');

Handlebars.registerPartial('offering', './partials/offering.html');

Metalsmith(__dirname)
  .use(markdown())
  .use(layouts({
    'engine': 'handlebars',
  }))
  .source('./src')
  .destination('./dest')
  .build(function(err, files) {
    if (err) console.log(err);
  })
