module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'js/*.js',
        dest: '../prod/<%= pkg.name %>.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sassDir: 'sass',
          cssDir: '../prod/',
          quiet: true
        }
      }
    },
    notify:{
      start:{
        options:{
          title: 'GRUNT Start',
          message: 'Great succes!'
        }
      },
      watchCSS: {
        options:{
          title: 'CSS compiled',
          message: 'Great success!'
        }
      },
      watchJS: {
        options:{
          title: 'JS compiled',
          message: 'Great success!'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/*.scss'],
        tasks: ['compass', 'notify:watchCSS'],
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify', 'notify:watchJS'],
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: '../prod/'
        }
      }
    },
    open : {
      prod : {
        path: 'http://localhost:9000/',
        app: 'Safari'
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-open');

  // Setup tasks
  grunt.registerTask('default', ['uglify','compass']);
  grunt.registerTask('start', ['uglify','compass','connect','open','notify:start','watch']);
  
};