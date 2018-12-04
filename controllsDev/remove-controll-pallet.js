AFRAME.registerComponent('remove-controll-pallet', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var pallet = this.el;
    this.el.addEventListener('click', function(e){
      if (e.target != pallet) {return; }
      pallet.setAttribute('position', '0 -5 0');
      pallet.setAttribute('visible', 'false');
      // <a-entity geometry='primitive: circle; radius: 3' rotation='-90 0 0' position='0 -3 0' material='opacity: 0.1' id='controllsTriggerArea'></a-entity>
      var controllsTriggerArea = document.createElement('a-entity');
      document.querySelector('a-scene').appendChild(controllsTriggerArea);
      controllsTriggerArea.setAttribute('geometry', 'primitive: circle; radius: 3');
      controllsTriggerArea.setAttribute('rotation', '-90 0 0');
      controllsTriggerArea.setAttribute('position', '0 -3 0');
      controllsTriggerArea.setAttribute('material', 'opacity: 0.1');
      controllsTriggerArea.setAttribute('id', 'controllsTriggerArea');
      controllsTriggerArea.addEventListener('mouseleave', function(e) {
        controllsTriggerArea.addEventListener('mouseenter', function(e) {
          // console.log('I was clicked at: ', e.detail.intersection.point);
          var controls = document.querySelector('#controlsCenter');
          controls.setAttribute('position', e.detail.intersection.point);
          controls.setAttribute('visible', 'true');
          controls.setAttribute('look-at', '[camera]');
          document.querySelector('a-scene').removeChild(controllsTriggerArea);
        });
      });
    });
  }
});