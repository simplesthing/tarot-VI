module.exports = function (grunt){
  var  path = require('path'); 
  // Loads task options from `tasks/options/` and `tasks/custom-options`
  // and loads tasks defined in `package.json`
  var config = grunt.util._.extend({},
    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'tasks/options'),
        loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        },
        init: false
      }),
    require('load-grunt-config')(grunt, { // Custom options have precedence
        configPath: path.join(__dirname, 'tasks/custom-options'),
        init: false
      })
  );

	grunt.task.loadTasks('tasks'); // Loads tasks in `tasks/` folder

	config.env = process.env;

	// Default Task
  	// ------------------
  	grunt.registerTask('default', "Build (in debug mode) & test your application.", ['helloWorld']);

	grunt.initConfig(config);
};