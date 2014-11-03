module.exports = function(grunt) {
  grunt.initConfig({
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      improvparty: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "test/protractor.conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },
  })

  grunt.loadNpmTasks('grunt-protractor-runner')

  grunt.registerTask('default', ['protractor'])
};
