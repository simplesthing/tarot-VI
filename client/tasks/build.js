module.exports = function(grunt) {
	/**
	* The `build` task gets your app ready to run for development and testing.
	*/
	grunt.registerTask('build', [
		'clean', 
		'ngconstant:development',
		'html2js', 
		'jshint', 
		'sass:dev',
		'concat:build_css',
		'copy:build_app_assets', 
		'copy:build_app_svg_assets',
		'copy:build_app_img_assets', 
		'copy:build_vendor_assets',
		'copy:build_appjs', 
		'copy:build_vendorjs', 
		'index:build', 
		'karmaconfig',
		'karma:runonce',
		'copy:move_build'
	]);
}; 