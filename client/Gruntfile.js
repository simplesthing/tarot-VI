module.exports = function (grunt){
  var  path = require('path'); 

  var config = grunt.util._.extend({},

    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'tasks/options'),
        loadGruntTasks: { 
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        },
        init: true
    }),
    
    require('load-grunt-config')(grunt, { // Custom options have precedence
        configPath: path.join(__dirname, 'tasks/custom-options'),
        init: false
    }),

    require( './build.config.js' )

  );

	grunt.task.loadTasks('tasks'); // Loads tasks in `tasks/` folder

	config.env = process.env;

	// Default Task
  // ------------------
	grunt.registerTask('default', "Build the app", ['build']);

	grunt.initConfig(config);
};