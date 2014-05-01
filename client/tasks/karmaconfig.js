module.exports = function (grunt){
	/**
	* In order to avoid having to specify manually the files needed for karma to
	* run, we use grunt to manage the list for us. The `karma/*` files are
	* compiled as grunt templates for use by Karma. Yay!
	*/
	grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
		var jsFiles = filterForJS( this.filesSrc );

		grunt.file.copy( 'karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', { 
		  process: function ( contents, path ) {
		    return grunt.template.process( contents, {
		      data: {
		        scripts: jsFiles
		      }
		    });
		  }
		});
	});

	/**
	* A utility function to get all app JavaScript sources. Need to expose as a global function to avoid replication
	*/
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
	  		return file.match( /\.js$/ );
		});
	}
}