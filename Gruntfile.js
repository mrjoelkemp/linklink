module.exports = function (grunt) {
    var path = require('path'),
        fs = require('fs');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      "sass": {
        "dist": {
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
        "sass": {
          "files": [
            "**/*.scss",
            "!node_modules/**/*.scss",
            "!.git/**/*.scss",
            "!.sass-cache/**/*.scss",
            "!bower_components/**/*.scss",
            "!vendor/**/*.scss"
          ],
          "tasks": [
            "newer:sass"
          ]
        }
      }
    });

    grunt.registerTask('default', ['watch']);
  }