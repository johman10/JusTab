export default {
  methods: {
    _showRipple (event) {
      var element = event.target.closest('.ripple, .ripple--no');
      removeAllRipples(element);
      if (element && element.classList.contains('ripple')) {
        startEffect(event, element);
        element.addEventListener('mouseup', stopEffect);
        element.addEventListener('mouseleave', stopEffect);
      }
    }
  }
};

function startEffect(event, element) {
  var ripple = document.createElement('div');
  ripple.classList.add('ripple__element');
  element.appendChild(ripple);

  var pos = element.getBoundingClientRect();
  var relativeY = (event.clientY - pos.top);
  var relativeX = (event.clientX - pos.left);

  ripple.style.top = relativeY + 'px';
  ripple.style.left = relativeX + 'px';
  ripple.style.transform = 'scale(20)';
}

function stopEffect() {
  var ripple = this.querySelector('.ripple__element');
  if (ripple) {
    fadeOut(ripple, 300).then(function() {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });
  }
}

function removeAllRipples (element) {
  const ripples = element.querySelectorAll('.ripple__element');
  for (let i = 0; i < ripples.length; i++) {
    let ripple = ripples[i];
    ripple.parentNode.removeChild(ripple);
  }
}

function fadeOut(element, time) {
  return new Promise(function(resolve) {
    element.style.opacity = 0;
    setTimeout(function() {
      resolve();
    }, time);
  });
}
