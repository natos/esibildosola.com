module.exports = function(grunt) {

    var gruntConfig = {

        "imagemin": {
            "content": {
                "options": {
                    "optimizationLevel": 5
                },
                "files": [{
                    "expand": true,                  // Enable dynamic expansion
                    "cwd": 'static/assets/images/',                   // Src matches are relative to this path
                    "src": ['**/**/*.{JPG,GIF,PNG,jpg,gif,png}'],   // Actual patterns to match
                    "dest": 'static/assets/images/'               // Destination path prefix
                }]
            }
        },

        "responsive_images": {
            "content": {
                "options": {
                    "newFilesOnly": false,
                    "separator": "-",
                    "sizes": [{
                        "name": "x1",
                        "width": 640,
                    },{
                        "name": "x2",
                        "width": 1280
                    }]
                },
                "files": [{
                    "expand": true,
                    "cwd": 'src/images/',
                    "src": ['**/*.{JPG,GIF,PNG,jpg,gif,png}'],
                    "custom_dest": 'static/assets/images/{%= path %}/{%= name %}'
                    // "dest": "tmp/"
                }]
            }
        },

        "clean": {
            "content": ['content/*'],
            "tmp": ['tmp/*']
        },

        "pkg": grunt.file.readJSON('package.json'),
        "uglify": {
            "options": {
                "banner": '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                "sourceMap": true,
                "sourceMapIncludeSources": true,
                "sourceMapName": 'static/assets/js/<%= pkg.name %>.min.js.map'
            },
            "build": {
                "src": [
                    'src/js/lib/jquery.js',
                    // 'bower_components/instagramas/dist/instagramas.min.js',
                    'src/js/lib/viewport.js',
                    'src/js/lib/smooth-scroll.min.js',
                    'src/js/lib/requestAnimFrame.js',
                    'src/js/fader.js',
                    'src/js/menu.js',
                    'src/js/images.js',
                    'src/js/instagramas.js',
                    'src/js/scroller.js'
                ],
                "dest": 'static/assets/js/<%= pkg.name %>.min.js'
            }
        },
        "watch": {
            "scripts": {
                "files": ['src/js/*.js', 'src/js/**/*.js'],
                "tasks": ['uglify'],
                "options": {
                    "spawn": false,
                }
            }
        }
    };

    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Generate images from /src and dump in /tmp
    grunt.registerTask('responsive-images', ['responsive_images']);
    // Optimize /tmp images and dump in /content
    grunt.registerTask('minimize-images', ['imagemin']);
    // Compile web site
    grunt.registerTask('compile', ['uglify', 'watch']);
    grunt.registerTask('default', 'compile');

};