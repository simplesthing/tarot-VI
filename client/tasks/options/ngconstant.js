module.exports = {
	options: {
		name: 'config'
	},
	development: {
		options: {
			dest: '<%= app_files.src %>/app/config.js'
		},
		constants: {
			ENV: {
				name: 'development',
				apiEndpoint: 'http://localhost:3000/'
			}
		}
	},
	production: {
		options: {
			dest: '<%= app_files.src %>/app/config.js'
		},
		constants: {
			ENV: {
				name: 'production',
				apiEndpoint: '/'
			}
		}
	}
}

