AFRAME.registerComponent('pin', {
   
   schema: {
       message: {type: 'string', default: 'No text was imported here!'},
    //   position: {type: 'string', default: '0 0 5'},
        color: {type: 'color', default: 'green'},
        radius: {type: 'number', default: 1},
        height: {type: 'number', default: 3},
    //   depth: {type: 'number', default: 1}
   },
   
   init: function() {
       var data = this.data;
       var el = this.el;
       
       var sphere = new THREE.SphereGeometry(data.radius, 80, 60);
       var cone = new THREE.ConeGeometry(data.radius, data.height, 60);
       
       var pinGeometry = new THREE.Geometry();
       
       var sphereMesh = new THREE.Mesh(sphere);
       var coneMesh = new THREE.Mesh(cone);
       coneMesh.rotation.z = Math.PI;
       coneMesh.translateY( data.height/2 );
       
       
       sphereMesh.updateMatrix();
       pinGeometry.merge(sphereMesh.geometry, sphereMesh.matrix);
       
       coneMesh.updateMatrix();
       pinGeometry.merge(coneMesh.geometry, coneMesh.matrix);
       
       
       
       this.geometry = pinGeometry;
       this.material = new THREE.MeshStandardMaterial({color: data.color});
       this.mesh = new THREE.Mesh(this.geometry, this.material);
       
       el.setObject3D('mesh', this.mesh);
   }
    
});