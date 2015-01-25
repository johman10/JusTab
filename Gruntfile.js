module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
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
    },
    watch: {
      scripts: {
        files: ['index.html', 'options.html'],
        tasks: ['shell'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'style/sass',
          cssDir: 'style/css',
          imagesDir: 'img',
          javascriptsDir: 'js',
        }
      }
    }
  });

  grunt.registerTask('default', 'watch');
};
