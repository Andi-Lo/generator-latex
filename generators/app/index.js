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
        name: 'author',
        message: 'Authors name?'
      },{
      type: 'input',
      name: 'projectName',
      message: 'Title of your Paper',
      default: this.appname
      },{
        type: 'input',
        name: 'subheadline',
        message: 'Enter a subtitle',
        default: 'Subtitle'
      },{
        type: 'rawlist',
        name: 'languages',
        message: 'Chose your Latex language',
        choices: [{
          name: 'German',
          value: 'setGerman',
          default: true
        },{
          name: 'English',
          value: 'setEnglish',
          default: false
        }]
      },{
      type: 'checkbox',
      name: 'features',
      message: 'What extras would you like to have?',
      choices: [{
        name: 'Create cover sheet',
        value: 'coversheet',
        checked: true
      }, {
        name: 'Include a Bibtex file',
        value: 'bibtex',
        checked: true
      },{
        name: 'Include an affidavit section (Eidenstaatliche Erklärung)',
        value: 'affidavit',
        checked: false
      }]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.author = props.author;
      this.subheadline = props.subheadline;
      this.projectName = props.projectName;
      var features = props.features;
      var languages = props.languages;
       
      var hasFeature = function(feature) {
        return features.indexOf(feature) !== -1;
      };
      var hasLanguage = function(language) {
        return languages.indexOf(language) !== -1;
      };
      
      this.includeCoversheet = hasFeature('coversheet');
      this.includeBibtex = hasFeature('bibtex');
      this.includeAffidavit = hasFeature('affidavit');
      
      this.setGerman = hasLanguage('German');
      this.setEnglish = hasLanguage('English');

      done();
    }.bind(this));
  },

  writing: {
    makeDirs: function () {
      this.mkdir('images');
    },
    texFiles: function () {
      this.fs.copyTpl(
        this.templatePath('_main.tex'),
        this.destinationPath('main.tex'),
        { author: this.author,
          projectName: this.projectName,
          subheadline: this.subheadline,
          english: this.setEnglish,
          german: this.setGerman,
          includeAffidavit: this.includeAffidavit
        }
      );
      if(this.includeAffidavit){
        this.fs.copyTpl(
          this.templatePath('_affidavit.tex'),
          this.destinationPath('affidavit.tex'),
          {
            english: this.setEnglish,
            german: this.setGerman,
          }
        );
      }
      if(this.includeBibtex) {
        this.fs.copy(
          this.templatePath('_cites.bib'),
          this.destinationPath('cites.bib')
        );
      }
      this.fs.copyTpl(
        this.templatePath('_section.tex'),
        this.destinationPath('sections/section.tex'),
        {
          english: this.setEnglish,
          german: this.setGerman,
        }
      );
      if(this.includeCoversheet) {
        this.fs.copyTpl(
          this.templatePath('_coversheet.tex'),
          this.destinationPath('coversheet/coversheet.tex'),
          { author: this.author,
            projectName: this.projectName,
            subheadline: this.subheadline,
            english: this.setEnglish,
            german: this.setGerman
          }
        );
      }
      this.fs.copy(
        this.templatePath('_logo.png'),
        this.destinationPath('coversheet/images/dummyLogo.png')
      );
    }
  },

  // install: function () {
  //   this.installDependencies();
  // }
});
