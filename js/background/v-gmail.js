import moment from 'moment';
import ajax from 'modules/ajax';

export default {
  computed: {
    gmailService () {
      return this.services.find(s => s.id === 2);
    }
  },

  data () {
    return {
      gmailPage: 1
    };
  },

  methods: {
    gmail (page) {
      this.gmailPage = page || this.gmailPage;
      localStorage.setItem('gmailError', false);
      return this.gmailToken()
        .then(this.getMailIds)
        .then(this.getMails)
        .then(this.gmailComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('gmailError', true);
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
      var email;
      return this.getUserData()
        .then((userData) => {
          email = encodeURIComponent(userData.email);
          const query = '&q=' + encodeURIComponent('-in:chats -in:sent -in:notes');
          const mailAmount = this.gmailService.perPage * this.gmailPage;
          const messagesUrl = `https://www.googleapis.com/gmail/v1/users/${email}/messages?maxResults=${mailAmount}&oauth_token=${token}${query}`;
          return messagesUrl;
        })
        .then((messagesUrl) => {
          return ajax('GET', messagesUrl);
        })
        .then((data) => {
          return { token, email, messages: data.messages };
        });
    },

    getUserData () {
      return new Promise((resolve) => {
        chrome.identity.getProfileUserInfo((userData) => {
          resolve(userData);
        });
      });
    },

    getMails (data) {
      let promises = [];

      data.messages.forEach((message) => {
        let messageUrl = 'https://www.googleapis.com/gmail/v1/users/' + data.email + '/messages/' + message.id + '?&oauth_token=' + data.token;
        promises.push(ajax('GET', messageUrl));
      });

      return Promise.all(promises)
        .then((messages) => {
          return rebuildGmailJson(messages).sort(sortGmailResults);
        });
    },

    gmailComponents (emails) {
      let unreadEmails = emails.filter((email) => { return email.labelIds.indexOf('UNREAD') > -1; });
      let readEmails = emails.filter((email) => { return email.labelIds.indexOf('UNREAD') < 0; });
      let components = [];

      components.push({
        name: 'v-panel-subheader',
        props: {
          text: 'Unread'
        }
      });

      components = components.concat(this.buildMailItems(unreadEmails, 'unread'));

      components.push({
        name: 'v-panel-subheader',
        props: {
          text: 'Read'
        }
      });

      components = components.concat(this.buildMailItems(readEmails, 'read'));

      localStorage.setItem('gmailComponents', JSON.stringify(components));
    },

    buildMailItems (mails, type) {
      let mailComponents = [];
      if (mails.length) {
        mails.forEach((email) => {
          mailComponents.push(this.buildMailItem(email));
        });
      } else {
        mailComponents.push({
          name: 'v-panel-item',
          props: {
            title: `There are no ${type} emails at the moment.`
          }
        });
      }
      return mailComponents;
    },

    buildMailItem (mail) {
      let messageSubject = mail.payload.headers.Subject || 'No subject';
      let messageFrom = (mail.payload.headers.From  || 'No sender').replace(/<(.|\n)*?>/, '');
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
