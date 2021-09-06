'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin'    //useminPrepare is hundled by grunt usemin
    });


    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },



        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand:true,
                    dot:true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true, //config parameters to set up the copy task
                    dot:true,
                    cwd: 'node_modules/font-awesome',
                    src:['fonts/*.*'],
                    dest:'dist'
                }]
            }
        },
        clean:{
            build:{
                src: ['dist/']
            }
        },
        imagemin: {
            dymanic : {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        useminPrepare : {  //usemin prepare the files & configure the ConCache CSS min & Uglify & file ref plugins,they can work correctly
            foo: {
                dest: 'dist',
                src: ['contactus.html','aboutus.html','index.html'] //all 3files need to process
            },
            options: {    //next part of Usemin specify the options
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify'],
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context,block){  //parameters
                                var generated = context.options.generated // var generated context optioon Generator
                                generated.options = {
                                    keepSpecialComments: 0,rebase: false  //supply this for my csssmin task to currently hundle font awesome modification & inclusion in concatinated file
                                };
                            }
                        }]
                    }
                }
            }
        },
    concat: {
        options: {
            separator : ';'
        },
        dist: {} //dist configuration is provided by useminPrepare
    },
        uglify: { //dis configaruration is provided by useminPrepare
            dist:{}
        },
        cssmin:{
            dist: {}
        },

        filerev: {  //What filerev Does? Ans: it adds an aditional extension to that main name,Website would not render correctly
            options: {                    //filerev takes the context of these files ,does some procesing MD5 compressed ,compressed 20charcter,which will attached to the main file
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {    //filerev: releases hashes(md5) all assets(imgs,js,css) in dist derectory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        usemin:{ 
        html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'], // Replace all assets with their revver version in html css files
        options: {
            assetsDirs: ['dist','dist/css','dist/js']  //options.assetDir contains the Directories for finding the assets
           }                                          //according to their relative paths
        
        },

        htmlmin: {    //task
            dist:  {      //target
                options:{
                collapseWhitespace:true
              },
            
            files: {
                'dist/index.html':'dist/index.html',
                'dist/aboutus.html':'dist/aboutus.html',
                'dist/contactus.html':'dist/contactus.html',
            }
          }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};