module.exports = function(grunt){

	grunt.initConfig({
		uglify:{
			options: {
				compress: true,
				report: true,
				banner: "/* Minified on <%= grunt.template.date() %>*/\n"
			},
			app:{
				files:{
					'js/core.min.js': [
						'js/core.js'
					]

				}
			}

		},
		cssmin: {
		  	add_banner: {
		    options: {
		      banner: '/* Minified on <%= grunt.template.date() %>*/\n'
		    },
		    files: {
		      	'css/core.min.css': [
		      		'css/core.css'
		      	]
		    }
		  }
		}

	});

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify', 'cssmin']);

}