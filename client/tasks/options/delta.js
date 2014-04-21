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
		tasks: ['jshint:src']
	},
	sass: {
		files: ['<%= app_files.src%>/**/*.scss'],
		tasks: ['sass']
	},
	/**
	* When assets are changed, copy them. Note that this will *not* copy new
	* files, so this is probably not very useful.
	*/
	assets: {
		files: [ 
		  'src/assets/**/*'
		],
		tasks: [ 'copy:build_assets' ]
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
	}
}