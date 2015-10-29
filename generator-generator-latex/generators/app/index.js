'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wondrous ' + chalk.red('Generator Latex')
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Please, tell me the name of your article',
      default: this.appname
      }, {
      type: 'checkbox',
      name: 'features',
      message: 'What would you like to have?',
      choices: [{
        name: 'Cover Sheet',
        value: 'coverSheet',
        checked: true
      }, {
        name: 'Bibtex',
        value: 'bibtex',
        checked: true
      }]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      var features = props.features;
      // To access props later use this.props.someOption;
       
      var hasFeature = function(feature) {
        return features.indexOf(feature) !== -1;
      };
      
      this.coverSheet = hasFeature('coverSheet');
      this.bibtex = hasFeature('bibtex');

      done();
    }.bind(this));
  },

  writing: {
    texFiles: function () {
      this.fs.copy(
        this.templatePath('_main.tex'),
        this.destinationPath('main.tex'),
      );
      this.fs.copy(
        this.templatePath('_section.tex'),
        this.destinationPath('section.tex'),
      );
      this.fs.copy(
        this.templatePath('_cites.bib'),
        this.destinationPath('cites.bib'),
      );
    },

    makeDirs: function () {
      this.mkdir('../coversheet/images');
      this.mkdir('images');
      // this.fs.copy(
      //   this.templatePath('editorconfig'),
      //   this.destinationPath('.editorconfig')
      // );
      // this.fs.copy(
      //   this.templatePath('jshintrc'),
      //   this.destinationPath('.jshintrc')
      // );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
