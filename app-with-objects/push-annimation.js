AFRAME.registerComponent('push-annimation', {
  schema: {
    color: {default: 'blue'}
  },
  init: function(){
    var data = this.data;
    this.el.addEventListener('click', function(){
      this.setAttribute('color', data.color);
    })
  }                
});
