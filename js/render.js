function goto(){
    location.href = "main.html"
 }
 
 var mouseX = 0, mouseY = 0,

windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,

SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,

camera, scene, renderer;

init();
animate();

function init() {

    var container, separation = 100, amountX = 50, amountY = 50,
    particles, particle;

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 500;

    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xffffff, 1);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // particles

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial( {

        color: 0x999999,
        program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.fill();

        }

    } );

    var points = [];

    for ( var i = 0; i < 300; i ++ ) {

        particle = new THREE.Sprite( material );
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar( Math.random() * 10 + 500 );
        particle.scale.x = particle.scale.y = Math.random() * 4 + 1;
        scene.add( particle );

        points.push( particle.position );

    }

    // lines

    var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xdddddd, opacity: 0.4 } ) );
    scene.add( line );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length > 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    camera.position.x += ( mouseX - camera.position.x ) * .005;
    camera.position.y += ( - mouseY + 200 - camera.position.y ) * .005;
    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}