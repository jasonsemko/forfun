module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint','copy'],
      },
      scss: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'public/assets/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.js'],
          dest: 'public/assets/js/'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        ignores: ['src/js/vendor/requirejs/require.js']
      },
      files: {
        expand: true,
        cwd: 'src/js',
        src: ['**/*.js'],
        dest: 'public/assets/js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['sass','jshint', 'copy']);

};
