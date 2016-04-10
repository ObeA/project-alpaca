module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            livereload: {
                files: '**',
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('dev', ['connect', 'watch']);
};
