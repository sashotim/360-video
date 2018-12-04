AFRAME.registerComponent('reset-on-click', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var video = document.querySelector('#video');
    this.el.addEventListener('click', function(evt){
        if (!video) { return; }
        video.pause();
        video.currentTime = 0; 
    });
  }
});