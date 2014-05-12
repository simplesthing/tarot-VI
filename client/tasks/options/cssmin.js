module.exports = {
	minify: {
		expand: true,
		cwd: '<%= build_dir %>/assets/',
		src: ['main.css'],
		dest: '<%= compile_dir %>/assets'
	}
}