AFRAME.registerComponent('replay-on-click', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var video = document.querySelector('#video');
    this.el.addEventListener('click', function(){
      var currentTimestamp = video.currentTime;
      console.log(video.currentTime);
        video.currentTime = currentTimestamp - 30;
        console.log(video.currentTime);
    })
  }
});