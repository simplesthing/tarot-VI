module.exports = {
	build_404: {
		files: [
		  {
			src: [ '404.html' ],
	        dest: '<%= build_dir %>/',
	        cwd: 'src/',
	        expand: true
		  }
		]
	},
	build_app_assets: {
		files: [
	      { 
	        src: [ '**' ],
	        dest: '<%= build_dir %>/assets/',
	        cwd: 'src/assets',
	        expand: true
	      }
	   ]   
	},
	build_vendor_assets: {
		files: [
		  { 
		    src: [ '<%= vendor_files.assets %>' ],
		    dest: '<%= build_dir %>/assets/',
		    cwd: '.',
		    expand: true,
		    flatten: true
		  }
		]   
	},
	build_appjs: {
		files: [
		  {
		    src: [ '<%= app_files.js %>' ],
		    dest: '<%= build_dir %>/',
		    cwd: '.',
		    expand: true
		  }
		]
	},
	build_vendorjs: {
		files: [
		  {
		    src: [ '<%= vendor_files.js %>' ],
		    dest: '<%= build_dir %>/',
		    cwd: '.',
		    expand: true
		  }
		]
	},
	compile_assets: {
		files: [
		  {
		    src: [ '**' ],
		    dest: '<%= compile_dir %>/assets',
		    cwd: '<%= build_dir %>/assets',
		    expand: true
		  }
		]
	},
	compile_404: {
		files: [
		  {
		    src: [ '404.html' ],
	        dest: '<%= compile_dir %>/',
	        cwd: '<%= build_dir %>',
	        expand: true
		  }
		]
	}
}