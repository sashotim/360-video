 AFRAME.registerComponent('c-example', {
  init: function () {
    var mesh = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshLambertMaterial({color: 0xffff00}));
    this.el.setObject3D('mesh', mesh);

    this.calculatePosition();
  },
  calculatePosition: function () {
    var mesh = this.el.object3D;
    mesh.updateMatrixWorld();

    var pos = new THREE.Vector3();
    var rot = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    mesh.matrixWorld.decompose(pos, rot, scale);

    console.log(pos);
    // returns 0, 1, 0 rather than expected global position of 0 1 -3
  }
});