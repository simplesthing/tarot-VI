module.exports = {
  /**
  * During development, we don't want to have wait for compilation,
  * concatenation, minification, etc. So to avoid these steps, we simply
  * add all script files directly to the `<head>` of `index.html`. The
  * `src` property contains the list of included files.
  */
	build: {
		dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/assets/main.css'
        ]
	},
  /**
  * When it is time to have a completely compiled application, we 
  * only a single JavaScript and a single CSS file.
  */
	compile: {
		dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= compile_dir %>/assets/main.css'
        ]
	}
}