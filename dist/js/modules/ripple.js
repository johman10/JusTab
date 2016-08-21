'use strict';

document.querySelector('body').addEventListener('mousedown', function (event) {
  var element = event.target.closest('.waves-effect');
  if (element) {
    startEffect(event, element);
    element.addEventListener('mouseup', stopEffect);
    element.addEventListener('mouseleave', stopEffect);
  }
});

function startEffect(event, element) {
  var ripple = document.createElement('div');
  ripple.classList.add('waves-ripple');
  element.appendChild(ripple);

  var pos = element.getBoundingClientRect();
  var relativeY = event.clientY - pos.top;
  var relativeX = event.clientX - pos.left;

  ripple.style.top = relativeY + 'px';
  ripple.style.left = relativeX + 'px';
  ripple.style.transform = 'scale(20)';
}

function stopEffect(event) {
  var ripple = this.querySelector('.waves-ripple');
  if (ripple) {
    fadeOut(ripple, 300).then(function () {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });
  }
}

function fadeOut(element, time) {
  return new Promise(function (resolve, reject) {
    element.style.opacity = 0;
    setTimeout(function () {
      resolve();
    }, 300);
  });
}
