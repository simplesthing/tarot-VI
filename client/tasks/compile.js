module.exports = function (grunt){
	/**
	* The `compile` task gets your app ready for deployment by concatenating and
	* minifying your code.
	*/
	grunt.registerTask('compile', [
		'copy:compile_404',
		'copy:compile_assets', 
		'ngAnnotate',
		'concat:compile_js', 
		'uglify', 
		'index:compile'
	]);
}