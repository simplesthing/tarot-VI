module.exports = function (grunt){
	/**
	* The `compile` task gets your app ready for deployment by concatenating and
	* minifying your code.
	*/
	grunt.registerTask('compile', [
		'copy:compile_assets',
		'cssmin', 
		'ngAnnotate',
		'ngconstant:production',
		'concat:compile_js', 
		'uglify', 
		'index:compile'
	]);
}