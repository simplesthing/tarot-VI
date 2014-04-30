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

  config.pkg = grunt.file.readJSON("package.json");
  config.meta = {
    banner: 
     '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed <%= pkg.license %>\n' +
      ' */\n'
  };
  
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
	grunt.registerTask('default', "Build the app", ['build', 'compile']);

};