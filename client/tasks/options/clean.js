module.exports = {
	clean: {
		build: ['<%= build_dir %>'],
      	release: ['<%= compile_dir %>'],
		dist: {
			options: {
				force: true
			}
		}
	}
}