module.exports = function(grunt){

    // Loading i18n task
    require('./scripts/tasks/i18n')(grunt);
    // -- Init Configuration ---------------------------------------
    grunt.initConfig({

        application:{
          dev: {
            csspath:"/assets/css/",
            jspath:"/assets/js/",
            imgpath:"/assets/img/",

          },
          dist:{
            csspath:"/assets/css/",
            jspath:"/assets/js/",
            imgpath:"/assets/img/",
          }
        },
        uglify:{
            options: {
                compress: false,
                report: true,
                banner: '/* Minified on <%= grunt.template.date() %>*/\n'
            },
            dev: {
                files: {
                    '.tmp/public/assets/js/core.min.js': [
                        'public/assets/js/core.js'
                    ]
                }
            },
            dist: {
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
            dev: {
                files: {
                    '.tmp/public/assets/css/core.min.css': [
                        'public/assets/css/normalize.css',
                        'public/assets/css/core.css'
                    ]
                }
            },
            dist: {
                files: {
                    'dist/public/assets/css/core.min.css': [
                        'public/assets/css/normalize.css',
                        'public/assets/css/core.css'
                    ]
                }
            }
        },
        copy: {
          dist: {
            files: [
              // includes files within path and its sub-directories
              {expand: true, src: ['public/**', '!**/*[.css|.js]'], dest: 'dist/'}
            ],
          },
          dev: {
            files: [
              // includes files within path and its sub-directories
              {expand: true, src: ['public/**', '!**/*[.css|.js]'], dest: '.tmp/'}
            ],
          },
        },
        clean: {
          dev: [".tmp/"],
          dist: ["dist/"]
        },
        connect: {
          dev: {
            options: {
              port: 9001,
              base: ['.tmp/public']
            }
          },
          dist: {
            options: {
              port: 9002,
              base: ['dist/public/'],
              keepalive:true
            }
          }
        },
        watch: {
          assets: {
            files: ['public/assets/css/*.css', 'public/assets/js/*.js', 'templates/**/*.html', 'i18n/**/*.json', 'i18n/**/*.html'],
            tasks:['build'],
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
    grunt.loadNpmTasks('grunt-contrib-clean');

    // -- Register Task ---------------------------------------------
    grunt.registerTask('server', ['clean:dev' ,'i18n', 'copy:dev','cssmin:dev', 'uglify:dev','connect:dev', 'watch']);
    grunt.registerTask('dist', ['clean:dist', 'i18n', 'copy:dist', 'cssmin:dist', 'uglify:dist', 'imagemin']);
    grunt.registerTask('build', ['clean:dev', 'i18n', 'copy:dev', 'cssmin:dev', 'uglify:dev']);
    grunt.registerTask('serverdist', ['connect:dist']);

};
