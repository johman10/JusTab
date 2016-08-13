// Docs:
// http://developers.news.layervault.com/v2

function dnShowData() {
  document.querySelector('.dn-links').innerHTML = '';
  checkError('designernews', 'Designernews_error');

  document.querySelector('.dn-links').innerHTML = serviceData.DN.HTML;
}
