module.exports = {
	src: [
		'<%= app_files.js %>', '!src/app/user/smiley/*.js'
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
	    // Relaxing opttions make jshint product less warnings
	    eqnull: true,
	    sub: true,
	},
	globals: {}
}