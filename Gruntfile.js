module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-push-release');
  grunt.loadNpmTasks('grunt-confirm');

  grunt.initConfig({
    confirm: {
      dist: {
        options: {
          question: 'Did you update the changelog on the options page?',
          continue: function(answer) {
            return answer.toLowerCase() === 'y';
          }
        }
      }
    },
    compass: {
      dev: {
        options: {
          environment: 'development',
          sassDir: 'dev/style/sass',
          specify: 'dev/style/sass/main.scss',
          cssDir: 'dev/style/css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'style/fonts',
          outputStyle: 'compressed',
          watch: true
        }
      },
      dist: {
        options: {
          environment: 'production',
          sassDir: 'dev/style/sass',
          specify: 'dev/style/sass/main.scss',
          cssDir: 'dist/style/css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'style/fonts',
          outputStyle: 'compressed',
          force: true
        }
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/js',
          src: '**/*.js',
          dest: 'dist/js'
        }]
      }
    },

    push: {
      options: {
        files: ['package.json', 'bower.json', 'dev/manifest.json'],
        commitFiles: ['-a'], // '-a' for all files
        createTag: false
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
            'bower_components/dragula.js/dist/dragula.min.js',
            'bower_components/dragula.js/dist/dragula.min.css',
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
    'confirm:dist',
    'push',
    'copy:dist',
    'compass:dist',
    'uglify:dist',
    'compress:dist'
  ]);
};
