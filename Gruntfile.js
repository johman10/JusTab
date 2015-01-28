module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    concurrent: {
      watch: {
        tasks: ['watch', 'compass'],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    watch: {
      html: {
        files: ['index.html', 'options.html'],
        tasks: ['shell'],
        options: {
          spawn: false,
        },
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'style/sass',
          specify: 'style/sass/main.scss',
          cssDir: 'style/css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'style/fonts',
          outputStyle: 'compressed',
          watch: true
        }
      }
    },
    shell: {
      options: {
          stderr: false
      },
      target: {
          command: [
            'vulcanize --csp -o build.html index.html',
            'vulcanize --csp -o options_build.html options.html',
          ].join('&&')
      }
    }
  });

  grunt.registerTask('default', 'concurrent');
};
