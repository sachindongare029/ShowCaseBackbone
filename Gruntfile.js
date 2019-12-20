module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        src: 'index.html',
        dest: 'build/'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      scripts: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/underscore/underscore.js',
          'node_modules/backbone/backbone.js',
          'node_modules/handlebars/dist/handlebars.js',
          'src/utils/templateLoader.js',
          'src/utils/handlebarHelpers.js',
          'src/index.js',
          // 'src/utils/helpers.js',
          'src/models/*.js',
          'src/collections/*.js',
          'src/views/*.js',
          'src/routes.js',
          'src/app.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    // less: {
    //   development: {
    //     options: {
    //       compress: true,
    //       yuicompress: true,
    //       optimization: 2
    //     },
    //     files: {
    //       'assets/css/app.css': 'assets/css/app.less'
    //     }
    //   }
    // },
    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: [
          'node_modules/bootstrap/dist/css/bootstrap.css',
          './assets/css/app.css'
        ],
        dest: 'build/styles.css'
      }
    },
    watch: {
      files: ['src/**', 'assets/css/**'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concat-css');


  grunt.registerTask('default', ['copy', 'concat', 'concat_css', 'watch']);

};
