function phShowData() {
  document.querySelector('.ph-links').innerHTML = '';
  checkError('producthunt', 'ProductHunt_error');

  document.querySelector('.ph-links').innerHTML = serviceData.PH.HTML;
}
