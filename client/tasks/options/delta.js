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
	}
}