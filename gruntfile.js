module.exports = function(grunt) {

    var gruntConfig = {

        "imagemin": {
            "content": {
                "options": {
                    "optimizationLevel": 5
                },
                "files": [{
                    "expand": true,                  // Enable dynamic expansion
                    "cwd": 'src/images/',                   // Src matches are relative to this path
                    "src": ['**/**/*.{JPG,GIF,PNG,jpg,gif,png}'],   // Actual patterns to match
                    "dest": 'static/assets/'               // Destination path prefix
                }]
            }
        },

        "responsive_images": {
            "content": {
                "options": {
                    "newFilesOnly": false,
                    "separator": "-",
                    "sizes": [{
                        "name": "thumb",
                        "height": 50
                    },{
                        "name": "x1",
                        "width": 320
                    },{
                        "name": "x2",
                        "width": 640,
                    },{
                        "name": "x4",
                        "width": 1280
                    }]
                },
                "files": [{
                    "expand": true,
                    "cwd": 'src/',
                    "src": ['**/*.{JPG,GIF,PNG,jpg,gif,png}'],
                    "custom_dest": 'tmp/{%= path %}/{%= name %}'
                    // "dest": "tmp/"
                }]
            }
        },

        "clean": {
            "content": ['content/*'],
            "tmp": ['tmp/*']
        },


        jade: {
            compile: {
                options: {
                    data: function(dest, src) {
                        // generate data for marcelaviola
                        return require('./data/marcelaviola');
                    }
                },
                files: {
                    "marcelaviola.html": ["./views/marcelaviola.jade"]
                    "shows.html": ["./views/shows.jade"],
                    "classes.html": ["./views/classes.jade"],
                    "contact.html": ["./views/contact.jade"]
                }
            }
        }
    };

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Generate images from /src and dump in /tmp
    grunt.registerTask('images', ['responsive_images']);
    // Optimize /tmp images and dump in /content
    grunt.registerTask('optimize', ['imagemin', 'clean:tmp']);
    // Compile web site
    grunt.registerTask('compile', ['images', 'optimize']);
    // Default task
    grunt.registerTask('default', ['jade']);
};