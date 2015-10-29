'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator latex:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        projectName: this.appname,
        coverSheet: true,
        bibtex: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'main.tex',
      'section.tex',
      'cites.bib',
      'coversheet/coversheet.tex',
      'coversheet/images/logo.png'
    ]);
  });
});
