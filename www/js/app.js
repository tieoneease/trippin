angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

        // Window setup
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        var scene,
        camera, 
        renderer,
        element,
        container,
        effect,
        controls,
        clock;
        var t = 0;

        var movingstars = [];

        var audio = new Audio();
        audio.src = 'heaven.mp3';
        audio.play(0);


        init();
        render();


        function init() {
            scene = new THREE.Scene();
            starForge(1000,200, 50);
            starForge(500,300, 100);
            starForge(0,100, 1000);
            starForge(-100,100, 80);
            starForge(-900,300, 50);
            starForge(-900,100, 10, movingstars);
            starForge(-200,300, 20, movingstars);
            starForge(-900,300, 50, movingstars);
            starForge(-3000,500, 20);
            starForge(-1000,1000, 50, movingstars);
            starForge(-3000,300, 100);
            starForge(-5000,200, 50);
            starForge(-7000,100, 50);

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
            controls = new THREE.DeviceOrientationControls( camera );

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );

            effect = new THREE.StereoEffect(renderer);
            effect.eyeSeparation = .6;
            effect.focalLength = 10;
            effect.setSize( window.innerWidth, window.innerHeight );

            camera.position.y = 2050;
            camera.matrixAutoUpdate = true;
            document.body.appendChild( renderer.domElement );



            var ray = [], bkg_ray = [], smallray, material = [], smallmaterial = [], geometry, bkg_material = [], bkg_smallmaterial = [], bkg_geometry, i, j;
            var nlines = 5;
            var nrayparts = 5;
            var colors = ['0x00FFFF', '0x00FF00', '0xFFFF30', '0xFF0066', '0x0000FF', '0x00FFFF', '0x00FF00', '0xFFFF30', '0xFF0066', '0x0000FF'];
            var pi = 3.14159;
            var linelength = 50000;

            for (i = 0; i < nlines; i++)
            {
                smallray = [];
                for (j = 0; j < nrayparts; j++)
                {
                    geometry = new THREE.CylinderGeometry(7.7,7.7,linelength/nrayparts);
                    smallmaterial[j] = new THREE.MeshBasicMaterial
                    (
                        { color: parseInt(colors[i]), transparent: true, opacity: 0.8}
                    )
                    smallray[j] = new THREE.Mesh(geometry,smallmaterial[j]);
                    smallray[j].position.set(100*Math.cos(2*pi*i/nlines), -j*linelength/nrayparts, 100*Math.sin(2*pi*i/nlines));
                    scene.add(smallray[j]);
                }
                material[i] = smallmaterial;
                ray[i] = smallray;


            }

            for (i = 0; i < nlines; i++)
            {
                smallray = [];
                for (j = 0; j < nrayparts; j++)
                {
                    geometry = new THREE.CylinderGeometry(4.4,4.4,linelength/nrayparts);
                    bkg_smallmaterial[j] = new THREE.MeshBasicMaterial
                    (
                        { color: parseInt(colors[i+nlines]), transparent: true, opacity: 0.25}
                    )
                    smallray[j] = new THREE.Mesh(geometry,bkg_smallmaterial[j]);

                    smallray[j].position.set(100*Math.cos(2*pi*i/nlines + pi/4 ),  -j*linelength/nrayparts,100*Math.sin(2*pi*i/nlines+ pi/4 ));
                    scene.add(smallray[j]);
                }
                bkg_material[i] = bkg_smallmaterial;
                bkg_ray[i] = smallray;
            }




            var light = new THREE.PointLight( 0xFFFFFF, 1000, 100 );
            light.position.set( 0, 0, 0 );
            scene.add(light);
        }

        function render() {
            requestAnimationFrame( render );
            controls.update();
            travelForward();
            moveStars();
            effect.render( scene, camera );
        }

        function moveStars() {
            for (var n=0; n<movingstars.length; n++) {
                movingstars[n].translateY(Math.random()*5);
            }
        }


        function starForge(int1, int2, int3, arr) {

            var starQty = 10000;
            geometry = new THREE.SphereGeometry(int1, int2, int3);

            materialOptions = {
                size: 0.9, //I know this is the default, it's for you.  Play with it if you want.
                transparency: true, 
                opacity: 0.7
            };

            starStuff = new THREE.PointCloudMaterial(materialOptions);


            for (var i = 0; i < starQty; i++) {     

                var starVertex = new THREE.Vector3();
                starVertex.x = Math.random() * 2000 - 1000;
                starVertex.y = Math.random() * 2000 - 1000;
                starVertex.z = Math.random() * 2000 - 1000;

                geometry.vertices.push(starVertex);

            }
            stars = new THREE.PointCloud(geometry, starStuff);
            arr = stars;
            scene.add(stars);
        }

        function travelForward() {
            //camera.translateZ( -1 );
            camera.position.y -= 0.5;
        }





    })});
