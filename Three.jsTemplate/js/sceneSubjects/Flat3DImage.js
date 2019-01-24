function GeneralLights(scene) {

	// const light = new THREE.PointLight("#2222ff", 1);
	//   scene.add(light);

	var geometry = new THREE.PlaneBufferGeometry(1.6, 0.9, 1);

	var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('/videos/3d_test_L.png') });

	var mesh = new THREE.Mesh(geometry, material);
	mesh.layers.set(1);
	scene.add(mesh);
	mesh.position.set(0, -1, -3);
	
	
	var geometry = new THREE.PlaneBufferGeometry(1.6, 0.9, 1);

	var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('/videos/3d_test_R.png') });

	var mesh = new THREE.Mesh(geometry, material);
	mesh.layers.set(2);
	scene.add(mesh);
	mesh.position.set(0, -1, -3);

	this.update = function(time) {
		// light.intensity = (Math.sin(time)+1.5)/1.5;
		// light.color.setHSL( Math.sin(time), 0.5, 0.5 );
	}
}
