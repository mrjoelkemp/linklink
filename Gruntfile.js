module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    "sass": {
      "dist": {
        options: {
          style: 'compressed'
        },
        "files": [
          {
            "expand": true,
            "src": [
              "**/*.{scss, sass}",
              "!node_modules/**/*.{scss, sass}"
            ],
            "ext": ".css"
          }
        ]
      }
    },
    "watch": {
      sass: {
        files: [
          "**/*.scss",
          "!node_modules/**/*.scss",
          "!.git/**/*.scss",
          "!.sass-cache/**/*.scss",
          "!bower_components/**/*.scss",
          "!vendor/**/*.scss"
        ],
        "tasks": [
          "newer:sass",
          'cacheBust'
        ]
      },

      js: {
        files: [
          "public/javascripts/**/*.js",
          "!public/javascripts/vendor/**/*.js"
        ],
        tasks: [
          'cacheBust'
        ]
      }
    },

    cacheBust: {
      options: {
        rename: false,
        baseDir: 'public'
      },
      assets: {
        files: [{
          src: ['views/**/*.{ejs,html}']
        }]
      }
    }
  });

  grunt.registerTask('default', ['watch']);
};