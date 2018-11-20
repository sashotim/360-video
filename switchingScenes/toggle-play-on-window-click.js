AFRAME.registerComponent('toggle-play-on-window-click', {
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.onTouchend = this.onTouchend.bind(this);
  },
  play: function () {
    window.addEventListener('click', this.onClick);
    window.addEventListener('touchend', this.onClick);
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('touchend', this.onClick);
  },
  onClick: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    video.paused ? video.play() : video.pause();
  },
  onTouchend: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    video.paused ? video.play() : video.pause();
  }
});