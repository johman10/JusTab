'use strict';

serviceDataRefreshDone.then(function () {
  if (serviceData.RD.status) {
    document.querySelector('#reddit .panel-header .panel-header-foreground .bottom a').setAttribute('href', 'https://www.reddit.com/r/' + serviceData.RD.subreddit);
  }
});

function rdShowData() {
  document.querySelector('.rd-links').innerHTML = '';
  checkError('reddit', 'Reddit_error');

  document.querySelector('.rd-links').innerHTML = serviceData.RD.HTML;
}
