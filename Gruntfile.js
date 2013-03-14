module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        meta: {
            src: 'app/**/*.js',
            specs: 'spec/**/*.js'
        },
        jasmine: {
            src: '<%= meta.src %>',
            options: {
            specs: '<%= meta.specs %>'
            }
        },
        jshint: {
            src: ['<%= meta.src %>', '<%= meta.specs %>'],
            options: {
                jshintrc: '.jshintrc',
            }
        },
        uglify: {
            options: {
                banner: '// human readable source available at: \n',
            },
            build: {
                src: '<%= meta.src %>',
                dest: 'web/js/app.min.js'

            }
        },
        watch: {
            files: ['<%= meta.src %>', '<%= meta.specs %>'],
            tasks: ['jshint', 'jasmine']
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'jasmine']);
    grunt.registerTask('release', ['jshint', 'jasmine', 'uglify']);

};
