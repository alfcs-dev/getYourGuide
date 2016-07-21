(function() {
	'use strict';
	module.exports = function(grunt) {
		require('time-grunt')(grunt);
		grunt.initConfig({
			wiredep: {
				test: {
					devDependencies: true,
					src: '<%= karma.unit.configFile %>',
					ignorePath: /\.\.\//,
					fileTypes: {
						js: {
							block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
							detect: {
								js: /'(.*\.js)'/gi
							},
							replace: {
								js: '\'{{filePath}}\','
							}
						}
					}
				}
			},
			karma: {
				unit: {
					configFile: 'karma.conf.js',
					singleRun: true
				}
			},
			ngAnnotate: {
				options: {
					singleQuotes: true,
				},
				build: {
					expand: true,
					src: ['**/*.js', '!**/*.spec.js'],
					dest: '.tmpjs/',
					cwd: 'src/js',
					ext: '.annotated.js',
					extDot: 'last',
				}
			},
			uglify: {
				vendor: {
					files: {
						'dist/js/vendor.js': [require('wiredep')().js]
					}
				},
				dist: {
					files: {
						'dist/js/getYourGuideApp.js': ['.tmpjs/app.module.annotated.js', '.tmpjs/**/*.annotated.js']
					}
				}
			},
			imagemin: {
				dist: {
					files: [{
						expand: true,
						src: '**/*',
						cwd: 'src/img',
						dest: 'dist/img'
					}]
				}
			},
			sass: {
				dist: {
					files: {
						'.tmpcss/styles.css': "src/scss/style.scss"
					}
				}

			},
			cssmin: {
				options: {
					banner: '/*\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
				},
				dist: {
					files: {
						'dist/css/styles.min.css': ['.tmpcss/styles.css']
					}
				}
			},
			ngtemplates: {
				app: {
					src: ['dist/templates/**/*.html'],
					dest: 'dist/js/templates.js'
				}
			},
			connect: {
				server: {
					options: {
						port: 9001,
						open: true,
						keepalive: true
					}
				},
				watcher: {
					options: {
						port: 9001,
						open: true,
					}
				}
			},
			watch: {
				js: {
					files: ['src/**/*.js'],
					//'karma'
					tasks: ['jsdev', 'clean:js']
				},
				css: {
					files: ['src/scss/**/*.scss', '!.sass-cache/**/*.scssc'],
					tasks: ['css', 'clean:css']
				},
				html: {
					files: ['src/templates/**/*.html'],
					tasks: ['htmlmin', 'ngtemplates']
				}
			},
			htmlmin: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				dist: {
					files: [{
						expand: true,
						cwd: 'src/',
						src: '**/*.html',
						dest: 'dist/'
					}]
				}
			},
			clean: {
				js: ['.tmpjs'],
				css: ['.tmpcss']
			},
			concat: {
				options: {
					separator: '\n',
					stripBanners: false
				},
				dev: {
					files: {
						'dist/js/getYourGuideApp.js': ['.tmpjs/app.module.annotated.js', '.tmpjs/**/*.annotated.js']
					}
				},
			}

		});

		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-ng-annotate');
		grunt.loadNpmTasks('grunt-contrib-imagemin');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-karma');
		grunt.loadNpmTasks('grunt-wiredep');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-angular-templates');

		grunt.registerTask('jsdev', ['ngAnnotate', 'concat', 'clean:js']);
		grunt.registerTask('js', ['ngAnnotate', 'uglify:dist', 'clean:js']);
		grunt.registerTask('css', ['sass', 'cssmin', 'clean:css']);
		grunt.registerTask('html', ['htmlmin', 'ngtemplates']);

		grunt.registerTask('default', ['uglify:vendor', 'js', 'html', 'css', 'connect:server']);
		grunt.registerTask('dev', ['uglify:vendor', 'jsdev', 'html', 'css', 'connect:watcher', 'watch']);

	};
})();