module.exports = function(grunt) {
	/**
	* The `build` task gets your app ready to run for development and testing.
	*/
	grunt.registerTask('build', [
		'clean',
		'sass'
	]);
};