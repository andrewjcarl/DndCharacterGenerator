module.exports = function(grunt) {
  var banner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * Build date: <%= grunt.template.today("yyyy-mm-dd") %>',
    ' * Copyright 2014 SolarCity Corporation.',
    ' */'
  ].join('\n');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['<%= pkg.directories.sass_dev %>/**/*.scss'],
        tasks: ['compileCssDev'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: ['<%= pkg.directories.js_dev %>/**/*.js'],
        tasks: ['compileJs'],
        options: {
          livereload: true,
        }
      }
    },
    sass: {
      options: {
        banner: banner
      },
      dev: {
        options: {
          style: 'expanded',
          trace: true
        },
        files: {
          '<%= pkg.directories.css %>/style.css': '<%= pkg.directories.sass_dev %>/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
         '<%= pkg.directories.css %>/style.min.css': '<%= pkg.directories.sass_dev %>/style.scss' 
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
      },
      dev: {
        src: '<%= pkg.directories.css %>/style.css',
        dest: '<%= pkg.directories.css %>/style.css'
      },
      dist: {
        src: '<%= pkg.directories.css %>/style.min.css',
        dest: '<%= pkg.directories.css %>/style.min.css'
      }
    },
  });

  //grunt.loadNpmTasks ('grunt-contrib-uglify');
  grunt.loadNpmTasks ('grunt-contrib-concat');
  //grunt.loadNpmTasks ('grunt-contrib-jshint');
  grunt.loadNpmTasks ('grunt-autoprefixer');
  grunt.loadNpmTasks ('grunt-contrib-sass');
  grunt.loadNpmTasks ('grunt-contrib-watch');
  grunt.loadNpmTasks ('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['compileCssDev', 'dist', 'watch']);
  grunt.registerTask('dist', ['compileCssProd']);

  //grunt.registerTask('compileJs', ['concat', 'jshint']);
  grunt.registerTask('compileCssDev', ['sass:dev', 'autoprefixer:dev']);
  grunt.registerTask('compileCssProd', ['sass:dist', 'autoprefixer:dist']);

};