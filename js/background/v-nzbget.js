// Docs:
// https://github.com/nzbget/nzbget/wiki/API

import ajax from 'modules/ajax';

export default {
  computed: {
    nzbgetService () {
      return this.services.find(s => s.id === 12);
    },

    nzbgetHost () {
      let strippedUrl = this.nzbgetService.url.replace(/http(s?):\/\//, '');
      return `https://${this.nzbgetService.username}:${this.nzbgetService.password}@${strippedUrl}/jsonrpc`;
    }
  },

  methods: {
    nzbget () {
      localStorage.setItem('nzbgetError', false);
      return Promise.all([this.nzbgetQueue(), this.nzbgetHistory()])
        .then(this.nzbgetComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('nzbgetError', true);
        });
    },

    nzbgetQueue () {
      const url = this.nzbgetHost;
      const apiCall = '/listgroups';
      return ajax('GET', url + apiCall);
    },

    nzbgetHistory () {
      const url = this.nzbgetHost;
      const apiCall = '/history';
      return ajax('GET', url + apiCall);
    },

    capitalize (string) {
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    },

    nzbgetComponents (results) {
      let components = [];
      results.forEach((resultData, index) => {
        const isQueue = index === 0;
        components.push(this.nzbgetSubheaders(isQueue));
        if (resultData.result.length) {
          resultData.result.forEach((item) => {
            let downloadPercentage;
            let subtitle;

            if (isQueue) {
              downloadPercentage = roundNumber(item.DownloadedSizeMB/(item.FileSizeMB/100));
              subtitle = `${this.capitalize(item.Status)} - ${downloadPercentage}%`;
            } else {
              const splittedStatus = item.Status.split('/');
              subtitle = `${this.capitalize(splittedStatus[0])} - ${this.capitalize(splittedStatus[1])}`;
            }

            components.push({
              name: 'v-panel-item',
              props: {
                title: item.NZBName || item.Name,
                subtitle
              }
            });
          });
        } else {
          components.push({
            name: 'v-panel-item',
            props: {
              title: 'There are no NZB\'s to show here at the moment.'
            }
          });
        }
      });

      localStorage.setItem('nzbgetComponents', JSON.stringify(components));
    },

    nzbgetSubheaders (isQueue) {
      let text;

      if (isQueue) {
        text = 'Queue';
      } else {
        text = 'History';
      }

      return {
        name: 'v-panel-subheader',
        props: {
          text
        }
      };
    }
  }
};

function roundNumber (number) {
  return Math.round(number*100)/100;
}
