/*
 * i18n
 *
 * Make/render the index file for each language
 * Copyright (c) 2015 Allan Esquina, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');
  var extend = require('node.extend');
  var mustache = require('mustache');
  var Entities = require('html-entities').AllHtmlEntities;
  var htmlMinify = require('html-minifier').minify;
  var entities = new Entities();

  // Constants
  var JSON_PATH = path.join(__dirname, '../../i18n');
  var TEMPLATE_PATH = path.join(__dirname, '../../templates');
  var PUBLIC_PATH = path.join(__dirname, '../../public');
  var TEMPLATE_FILE = 'index.html';
  var DEFAULT_LANGUAGE = 'en-us.json';

  // Read the i18n directory and render a template with the json's data
  var generate = function () {
    var template = grunt.file.read(path.join(TEMPLATE_PATH, TEMPLATE_FILE));
    var data, t, label;
    var defaultData = grunt.file.readJSON(path.join(JSON_PATH, DEFAULT_LANGUAGE.replace('.json', ''),DEFAULT_LANGUAGE));


    grunt.file.recurse( JSON_PATH, function (abspath, rootdir, subdir, filename){

      if(filename.indexOf('.json') !== -1) {
        data = getData(path.join(JSON_PATH, filename.replace('.json', ''), filename), filename.replace('.json', ''));

        // Extend from default language
        data = extend(true, defaultData, data);

        data.dropdown = {
          options: data.languages.map(function (lang) {
            var buf;
            if(lang.url !== filename.replace('.json', '')) {

              buf = {name:lang.name, url: DEFAULT_LANGUAGE.replace('.json', '') === lang.url ? '' : lang.url};
            } else {
              label = lang.name;
              buf = false;
            }
            return buf;
          }).filter(function (l) {
            return l;
          }),
          label: label
        };

        // Paths
        var prop  = grunt.cli.tasks.indexOf('dist') !== -1 ? 'dist' : 'dev';
        data.paths =  grunt.config.get('application')[prop];

        t = mustache.to_html(template, data);
        save(TEMPLATE_FILE, filename, entities.decode(t));

        // Save the index file on the Public derectory with the default language
        if(DEFAULT_LANGUAGE === filename) {
          save(TEMPLATE_FILE, '', entities.decode(t));
        }
      }
    });
  }

  // Save a file with the rendered template
  var save = function (name, dest, content) {
      try {
        grunt.log.write('Creating file ' + path.join(PUBLIC_PATH, dest.replace('.json', ''), name) + '\n');
        grunt.file.write(path.join(PUBLIC_PATH, dest.replace('.json', ''), name), htmlMinify(content));
      } catch (e) {
        grunt.log.write(e);
      }
  }

  // Parse @link files if exists
  var getData = function (filename, lang) {
    var data = grunt.file.readJSON(filename);
    var re = /{{@link=([^\s]+)}}/, res;
    data = (function r(o) {
      var tmp;
        if( typeof o === "object" ) {
          for (var v in o) {
            if (o.hasOwnProperty(v)) {
                o[v] = r(o[v]);
            }
          }
        }
        else {
            res= re.exec(o);
            if(res) {
              tmp = grunt.file.read(path.join(JSON_PATH,lang,res[1]));
              o = tmp !== '' ? tmp : 'File ' + path.join(JSON_PATH,lang,res[1]) + ' not found.'
            }
        }
        return o;
    }(data));
    return data
  }

  grunt.registerTask('i18n', function () {
      grunt.log.write('Translating...\n');
      generate.call();
  });
}
