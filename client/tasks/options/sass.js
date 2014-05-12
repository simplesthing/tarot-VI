module.exports = {
	dev: {
		options: {
			sourceComments : 'map'
		},
		files: {
			'<%= build_dir %>/assets/main.css': '<%= app_files.sass %>'
		}
	}
}