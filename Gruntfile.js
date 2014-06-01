module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8089,
                    // last serves as base, others are browseable
                    base: ['.', './example'],
                    keepalive: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        uglify: {
            all_files: {
                files: {
                    'dist/qhull2d.min.js': ['src/qhull2d.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', ['connect']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('dist', ['uglify']);
    grunt.registerTask('default', ['dist']);
};
