function Video360StereoView(scene) {

	// const radius = 2;
	// const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));

	// mesh.position.set(0, 0, -20);

	video = document.createElement('video');
	video.crossOrigin = 'anonymous';
	video.loop = true;
	video.muted = true;
	// video.src = 'textures/MaryOculus.webm';
	video.src = '/3dvr/threejsExample/textures/MaryOculus.webm';
	// video.src = '/videos/Ayutthaya - Easy Tripod Paint _ 360_VR Master Series _ Free Download.mp4';
	video.setAttribute('webkit-playsinline', 'webkit-playsinline');
	video.play();

	texture = new THREE.Texture(video);
	texture.generateMipmaps = false;
	texture.minFilter = THREE.NearestFilter;
	texture.maxFilter = THREE.NearestFilter;
	texture.format = THREE.RGBFormat;

	setInterval(function() {

		if (video.readyState >= video.HAVE_CURRENT_DATA) {

			texture.needsUpdate = true;

		}

	}, 1000 / 24);
	// scene.add(mesh);

	var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(-1, 1, 1);

	var uvs = geometry.attributes.uv.array;

	for (var i = 0; i < uvs.length; i += 2) {

		uvs[i] *= 0.5;

	}

	var material = new THREE.MeshBasicMaterial({ map: texture });

	var mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = -Math.PI / 2;
	mesh.layers.set(1); // display in left eye only
	scene.add(mesh);



	// right

	var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	geometry.scale(-1, 1, 1);

	var uvs = geometry.attributes.uv.array;


	for (var i = 0; i < uvs.length; i += 2) {

		uvs[i] *= 0.5;
		uvs[i] += 0.5;

	}


	var material = new THREE.MeshBasicMaterial({ map: texture });

	var mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = -Math.PI / 2;
	mesh.layers.set(2); // display in right eye only
	scene.add(mesh);

	
	this.update = function(time) {
		// const scale = Math.sin(time)+2;

		// mesh.scale.set(scale, scale, scale);
	}
}
