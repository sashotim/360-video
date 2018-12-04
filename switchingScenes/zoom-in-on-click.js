AFRAME.registerComponent('zoom-in-on-click', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var camera = document.querySelector('#camera');
    camera.setAttribute('zoom', 1);
    
    this.el.addEventListener('click', function(){
      var currentZoom = camera.getAttribute('zoom');
      var zoomAfterClick = 0.25 + parseFloat(currentZoom);
      camera.setAttribute('zoom', zoomAfterClick);
    });
  }
});