import moment from 'moment';
import ajax from 'modules/ajax';

export default {
  computed: {
    service () {
      return this.services[1];
    }
  },
  methods: {
    gmail () {
      return this.gmailToken()
        .then(this.getMailIds)
        .then(this.getMails)
        .then(this.gmailComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('googleCalendarError', true);
        });
    },

    gmailToken () {
      return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
          if (!token) reject();
          resolve(token);
        });
      });
    },

    getMailIds (token) {
      return new Promise((resolve, reject) => {
        chrome.identity.getProfileUserInfo((data) => {
          var email = encodeURIComponent(data.email);
          var query = '&q=' + encodeURIComponent('-in:chats -in:sent -in:notes');
          var messagesUrl = `https://www.googleapis.com/gmail/v1/users/${email}/messages?maxResults=${this.service.length}&oauth_token=${token}${query}`;

          ajax('GET', messagesUrl)
            .then(function(data) {
              localStorage.setItem('gmailError', false);
              resolve({ token, email, messages: data.messages });
            })
            .catch(reject);
        });
      });
    },

    getMails (data) {
      return new Promise((resolve, reject) => {
        let promises = [];
        let messages = [];

        data.messages.forEach((message) => {
          let messageUrl = 'https://www.googleapis.com/gmail/v1/users/' + data.email + '/messages/' + message.id + '?&oauth_token=' + data.token;

          promises.push(
            ajax('GET', messageUrl)
              .then((data) => {
                messages.push(data);
                localStorage.setItem('gmailError', false);
              })
              .catch(() => {
                localStorage.setItem('gmailError', true);
              })
          );
        });

        Promise.all(promises)
          .then(function() {
            resolve(rebuildGmailJson(messages).sort(sortGmailResults));
          })
          .catch(reject);
      });
    },

    gmailComponents (emails) {
      let unreadEmails = emails.filter((email) => { return email.labelIds.indexOf('UNREAD') > -1; });
      let readEmails = emails.filter((email) => { return email.labelIds.indexOf('UNREAD') < 0; });
      let components = [];

      components.push({
        name: 'v-panel-header',
        props: {
          text: 'Unread'
        }
      });

      unreadEmails.forEach((email) => {
        components.push(this.buildMailItem(email));
      });

      components.push({
        name: 'v-panel-header',
        props: {
          text: 'Read'
        }
      });

      readEmails.forEach((email) => {
        components.push(this.buildMailItem(email));
      });

      localStorage.setItem('gmailComponents', JSON.stringify(components));
    },

    buildMailItem (mail) {
      let messageSubject = mail.payload.headers.Subject || 'No subject';
      let messageFrom = mail.payload.headers.From.replace(/<(.|\n)*?>/, '') || 'No sender';
      let messageSnippet = mail.snippet || 'No content';
      let messageDate = new Date(mail.payload.headers.Date);
      if (moment(messageDate).isSame(moment(), 'day')) {
        messageDate = moment(messageDate).format('hh:mm A');
      }
      else {
        messageDate = moment(messageDate).format('MMM D, hh:mm A');
      }
      let messageUrl = 'https://mail.google.com/mail/u/0/#inbox/' + mail.id;

      return {
        name: 'v-panel-item',
        props: {
          title: messageSubject,
          subtitle: `${messageFrom} - ${messageSnippet}`,
          extraTitle: messageDate,
          url: messageUrl
        }
      };
    }
  }
};

function rebuildGmailJson(JSON) {
  for (var key in JSON) {
    var message = JSON[key];

    message.payload.headers.forEach(function(header) {
      message.payload.headers[header.name] = header.value;
    });
  }
  return JSON;
}

function sortGmailResults(a, b) {
  return (new Date(b.payload.headers.Date) - new Date(a.payload.headers.Date));
}
