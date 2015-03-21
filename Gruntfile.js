module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.initConfig({
    compass: {
      dev: {
        options: {
          sassDir: 'dev/style/sass',
          specify: 'dev/style/sass/main.scss',
          cssDir: 'dev/style/css',
          imagesDir: 'dev/img',
          javascriptsDir: 'dev/js',
          fontsDir: 'dev/style/fonts',
          outputStyle: 'compressed',
          watch: true
        }
      },
      dist: {
        options: {
          sassDir: 'dev/style/sass',
          specify: 'dev/style/sass/main.scss',
          cssDir: 'dist/style/css',
          imagesDir: 'dist/img',
          javascriptsDir: 'dist/js',
          fontsDir: 'dist/style/fonts',
          outputStyle: 'compressed'
        }
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/js',
          src: '**/*.js',
          dest: '../dist/js'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: [
            'img/**',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/unveil/jquery.unveil.min.js',
            'style/fonts/**',
            'index.html',
            'options.html',
            'background.html',
            'manifest.json'
          ],
          dest: 'dist/'
        }]
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist.zip'
        },
        files: [{
          expand: true,
          src: ['dist/**'],
          dest: '.'
        }]
      }
    }
  });

  grunt.registerTask('default', 'compass:dev');
  grunt.registerTask('dist', [
    'copy:dist',
    'compass:dist',
    'uglify:dist',
    'compress:dist'
  ]);
};
