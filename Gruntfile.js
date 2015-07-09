module.exports = function(grunt){

    // Loading i18n task
    require('./scripts/tasks/i18n')(grunt);
    // -- Init Configuration ---------------------------------------
    grunt.initConfig({

        uglify:{
            options: {
                compress: false,
                report: true,
                banner: '/* Minified on <%= grunt.template.date() %>*/\n'
            },
            app: {
                files: {
                    'js/core.min.js': [
                        'js/core.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                banner: '/* Minified on <%= grunt.template.date() %>*/\n'
            },
            app: {
                files: {
                    'css/core.min.css': [
                        'css/normalize.css',
                        'css/core.css'
                    ]
                }
            }
        },
        connect: {
          server: {
            options: 9001,
            keepalive: true
          }
        },
        watch: {
          assets: {
            files: ['**/*.js', '**/*.html', '**/*.css'],
            options: {
              livereload: true
            }
          }
        }

    });

    // -- Load Plugins ----------------------------------------------
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // -- Register Task ---------------------------------------------
    grunt.registerTask('default', ['i18n', 'uglify', 'cssmin']);
    grunt.registerTask('server', ['connect', 'watch']);

};
