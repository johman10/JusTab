function GmailShowData() {
  var mailUnread = document.querySelector('.mail-unread');
  var mailRead = document.querySelector('.mail-read')
  mailUnread.innerHTML = '';
  mailRead.innerHTML = '';
  checkError('gmail', 'Gmail_error');

  if (serviceData.GM.UnreadHTML && serviceData.GM.ReadHTML) {
    mailUnread.innerHTML = serviceData.GM.UnreadHTML;
    mailRead.innerHTML = serviceData.GM.ReadHTML;

    if (!mailUnread.querySelector('.core-item')) {
      mailUnread.innerHTML = '<h2>Unread</h2><div class="core-item without-hover">There are no unread e-mails at the moment.</div>';
    }

    if (!mailRead.querySelector('.core-item')) {
      mailRead.innerHTML = '<h2>Read</h2><div class="core-item without-hover">There are no read e-mails at the moment.</div>';
    }
  }
}

function gmailCheckScroll(event) {
  var elem = event.target;
  var nextPage = localStorage.getItem('Gmail_page');
  var length = document.querySelectorAll('#gmail .gm-message').length;
  if (elem.scrollHeight - elem.scrollTop == elem.offsetHeight) {
    if (!document.querySelector('#gmail .mail-read .loading-bar')) {
      document.querySelector('#gmail .mail-read').insertAdjacentHTML('beforeend', '<div class="core-item without-hover loading-bar">' + serviceData.spinner + '</div>');
    }
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.getGmailData(length + 25);
    });
  }
}
