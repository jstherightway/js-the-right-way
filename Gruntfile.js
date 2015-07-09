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
                    'dist/public/assets/js/core.min.js': [
                        'public/assets/js/core.js'
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
                    'dist/public/assets/css/core.min.css': [
                        'public/assets/css/normalize.css',
                        'public/assets/css/core.css'
                    ]
                }
            }
        },
        copy: {
          main: {
            files: [
              // includes files within path and its sub-directories
              {expand: true, src: ['public/**'], dest: 'dist/'}
            ],
          },
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
        },
        imagemin: {                          // Task
          dynamic: {                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'public/assets/img',                   // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'dist/public/assets/img'                  // Destination path prefix
            }]
          }
        }

    });

    // -- Load Plugins ----------------------------------------------
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // -- Register Task ---------------------------------------------
    grunt.registerTask('default', ['i18n', 'uglify', 'cssmin']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('dist', ['i18n', 'copy', 'cssmin', 'uglify', 'imagemin']);

};
