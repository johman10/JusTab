// Docs:
// https://github.com/HackerNews/API

function hnShowData() {
  document.querySelector('.hn-links').innerHTML = '';
  checkError('hackernews', 'Hackernews_error');

  document.querySelector('.hn-links').innerHTML = serviceData.HN.HTML;
}
