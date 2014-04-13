module.exports = function(grunt){

    // -- Init Configuration ---------------------------------------
    grunt.initConfig({

        uglify:{
            options: {
                compress: true,
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
        }

    });

    // -- Load Plugins ----------------------------------------------
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // -- Register Task ---------------------------------------------
    grunt.registerTask('default', ['uglify', 'cssmin']);

};
