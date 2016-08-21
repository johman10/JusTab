'use strict';

function drShowData() {
  document.querySelector('.dr-links').innerHTML = '';
  if (serviceData.DR.smallImages) {
    document.querySelector('.dr-links').classList.add('small-images');
  }

  checkError('dribbble', 'Dribbble_error');

  document.querySelector('.dr-links').innerHTML = serviceData.DR.HTML;
}
