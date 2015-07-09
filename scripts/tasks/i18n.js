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

  // Constants
  var JSON_PATH = path.join(__dirname, '../../i18n');
  var TEMPLATE_PATH = path.join(__dirname, '../../templates');
  var PUBLIC_PATH = path.join(__dirname, '../../public');
  var TEMPLATE_FILE = 'index.html';
  var DEFAULT_LANGUAGE = 'en-us.json';

  // Read the i18n directory and render a template with the json's data
  var generete = function () {
    var template = grunt.file.read(path.join(TEMPLATE_PATH, TEMPLATE_FILE));
    var data, t;
    var defaultData = grunt.file.readJSON(path.join(JSON_PATH,DEFAULT_LANGUAGE));

    grunt.file.recurse( JSON_PATH, function(abspath, rootdir, subdir, filename){
      grunt.log.write(filename + '\n');
      data = grunt.file.readJSON(path.join(JSON_PATH,filename));

      // Extend from default language
      data = extend(true, defaultData, data);

      t = grunt.template.process(template, {data: data});
      save(TEMPLATE_FILE, filename, t);
    });
  }

  // Save a file with the rendered template
  var save = function (name, dest, content) {
      try {
        grunt.log.write('Creating file ' + path.join(PUBLIC_PATH, dest.replace('.json', ''), name) + '\n');
        grunt.file.write(path.join(PUBLIC_PATH, dest.replace('.json', ''), name), content);
      } catch (e) {
        grunt.log.write(e);
      }
  }

  grunt.registerTask('i18n', function() {
      grunt.log.write('Translating...\n');
      generete.call();
  });
}
