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
  
  grunt.initConfig(config);

  /**
  * In order to make it safe to just compile or copy *only* what was changed,
  * we need to ensure we are starting from a clean, fresh build. So we rename
  * the `watch` task to `delta` and then add a new task called `watch` that 
  * does a clean buid before watching for changes.
  */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask('watch', ['build','delta']);

	// Default Task
  // ------------------
	grunt.registerTask('default', "Build the app", ['build']);

};