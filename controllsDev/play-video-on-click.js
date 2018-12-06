AFRAME.registerComponent('play-on-click', {
  init: function () {
    var video = document.querySelector('#video');
    this.el.addEventListener('click', function(){
        if (!video) { return; }
        if (video.paused){
          video.play();
        } else {
          video.pause();
        }
    });
  }
});