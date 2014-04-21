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
      ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
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

  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    console.log(this.filesSrc);
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' )
          }
        });
      }
    });
  });


};