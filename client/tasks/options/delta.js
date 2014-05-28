module.exports = {
	options: {
		livereload: true
	},
	gruntfile: {
		files: 'Gruntfile.js',
		tasks: ['jshint:gruntfile'],
		options: {
			livereload: false
		}
	},
	jssrc: {
		files: [
			'<%= app_files.js %>'
		],
		tasks: ['build']
	},
	sass: {
		files: ['<%= app_files.src%>/**/*.scss'],
		tasks: ['sass'],

	},
	/**
	* When assets are changed, copy them. Note that this will *not* copy new
	* files, so this is probably not very useful.
	*/
	assets: {
		files: [ 
		  'src/assets/**/*',
		  'src/app/**/images/*'
		],
		tasks: [ 'copy:build_app_assets', 'copy_build_app_img_assets']
	},
	/**
	* When index.html changes, we need to compile it.
	*/
	html: {
		files: [ '<%= app_files.html %>' ],
		tasks: [ 'index:build' ]
	},
	/**
	* When our templates change, we only rewrite the template cache.
	*/
	tpls: {
		files: [ 
		  '<%= app_files.atpl %>', 
		  '<%= app_files.ctpl %>'
		],
		tasks: [ 'html2js' ]
	},
	 /**
       * When a JavaScript unit test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jsunit: {
        files: [
          '<%= app_files.jsunit %>'
        ],
        tasks: [ 'jshint:test', 'karma:unit:run' ],
        options: {
          livereload: false
        }
      },
      /**
       * When a JavaScript e2e test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jse2e: {
        files: [
          '<%= app_files.jse2e %>'
        ],
        tasks: [ 'jshint:test', 'karma:unit:run' ],
        options: {
          livereload: false
        }
      }
}