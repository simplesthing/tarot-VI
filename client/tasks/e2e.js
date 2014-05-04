module.exports = function (grunt){
	grunt.registerTask('e2e', [
		'build',
		'connect',
		'protractor'
	]);
}