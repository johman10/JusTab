module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-push-release');

  grunt.initConfig({
    prompt: {
      dist: {
        options: {
          questions: [
            {
              config: 'dist.changelog', // arbitrary name or config for any other grunt task
              type: 'confirm', // list, checkbox, confirm, input, password
              message: 'Did you change the changelog before running Grunt?', // Question to ask the user, function needs to return a string,
              default: 'false', // default value if nothing is entered
              validate: function(value) {
                var valid = semver.valid(value);
                return valid || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.';
              },
            }
          ]
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
        // commitFiles: ['-a'], // '-a' for all files
        createTag: false,
        // push: true,
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
    'push',
    'copy:dist',
    'compass:dist',
    'uglify:dist',
    'compress:dist'
  ]);
};
