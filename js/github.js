function ghShowData() {
  document.querySelector('.gh-links').innerHTML = '';
  checkError('github', 'Github_error');

  document.querySelector('.gh-links').innerHTML = serviceData.GH.HTML;
}
