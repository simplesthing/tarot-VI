module.exports = {
	src: [
		'<%= app_files.js %>'
	],
	gruntfile: [
		'Gruntfile.js'
	],
	options: {
		// http://www.jshint.com/docs/options
		curly: true,
		eqeqeq: true,
	    immed: true,
	    newcap: true,
	    noarg: true,
	    unused: true,
	    // Relaxing opttions make jshint product less warnings
	    eqnull: true,
	    sub: true,
	},
	globals: {}
}