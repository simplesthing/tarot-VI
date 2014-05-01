module.exports = {
	options: {
		configFile: '<%= build_dir %>/karma-unit.js'
	},
	unit: {
		runnerPort: 9101,
		background: true
	},
	runonce: {
		runnerPort: 9101,
		singleRun: true
	}
}