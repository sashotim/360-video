AFRAME.registerComponent('toggle-play-on-window-click', {
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.onTouch = this.onTouch.bind(this);
  },
  play: function () {
    window.addEventListener('click', this.onClick);
    window.addEventListener('touch', this.onClick);
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('touch', this.onClick);
  },
  onClick: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    video.paused ? video.play() : video.pause();
  },
  onTouch: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    video.paused ? video.play() : video.pause();
  }
});