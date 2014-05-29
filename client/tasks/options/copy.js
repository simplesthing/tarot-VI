module.exports = {
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
	build_app_img_assets: {
		files: [
	      { 
	        src: ['src/app/topnav/images/*.png'],
	        dest: '<%= build_dir %>/assets/images/topnav/',
	        expand: true,
	        flatten: true
	      },
	      { 
	        src: ['src/app/login/images/*.png'],
	        dest: '<%= build_dir %>/assets/images/login/',
	        expand: true,
	        flatten: true
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
		  },
		  { 
		    src: [ '<%= vendor_files.fonts %>' ],
		    dest: '<%= build_dir %>/fonts',
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
	move_build: {
		files: [{
			src: ['**'],
			dest: '<%= compile_dir %>/',
			expand: true,
			cwd: '<%= build_dir %>/',
		}]
	},
	compile_assets: {
		files: [
		  {
		    src: [ '**', '!main.css', '!*.map' ],
		    dest: '<%= compile_dir %>/assets',
		    cwd: '<%= build_dir %>/assets',
		    expand: true
		  }
		]
	}
}