/**
* @author arturitu / http://unboring.net/
*/

THREE.MouseLockControls = function ( object ) {

	var scope = this;

	// How much to rotate for mouse events.
	var MOUSE_SPEED_X = 0.5;
	var MOUSE_SPEED_Y = 0.3;

	this.object = object;
	this.object.rotation.reorder( "YXZ" );

	this.enabled = false;


	this.phi = 0;
	this.theta = 0;

	// Variables for mouse-based rotation.
	this.rotateStart = new THREE.Vector2();
	this.rotateEnd = new THREE.Vector2();
	this.rotateDelta = new THREE.Vector2();

	var onMouseMove = function ( e ) {

		var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

		scope.rotateEnd.set(scope.rotateStart.x - movementX, scope.rotateStart.y - movementY);

		// Calculate how much we moved in mouse space.
		scope.rotateDelta.subVectors(scope.rotateEnd, scope.rotateStart);
		scope.rotateStart.copy(scope.rotateEnd);

		// Keep track of the cumulative euler angles.
		var element = document.body;
		scope.phi += 2 * Math.PI * scope.rotateDelta.y / element.clientHeight * MOUSE_SPEED_Y;
		scope.theta += 2 * Math.PI * scope.rotateDelta.x / element.clientWidth * MOUSE_SPEED_X;

		// Clamp phi to be in [-Math.PI, Math.PI].
		scope.phi = Math.min(Math.max(-Math.PI, scope.phi), Math.PI)
	};

	var normalizeValue = function (val, min, max){
		   return THREE.Math.mapLinear ( val, min, max,-1, 1 ); 
	}

	var setObjectQuaternion = function ( quaternion, phi, theta, orient) {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis
			
		return function ( quaternion, phi, theta, orient ) {
			//console.log(alpha, beta, gamma, orient);

			euler.set( phi, theta, 0, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler );                               // orient the device

			quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation
		}

	}();

	this.update = function () {
		
		if ( this.enabled === false ) return;		

		var orient = 0;
		
		setObjectQuaternion( scope.object.quaternion, scope.phi, scope.theta, orient );
			
	}

	document.addEventListener( 'mousemove', onMouseMove, false );

};