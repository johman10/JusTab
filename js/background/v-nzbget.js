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
      var url = this.nzbgetHost;
      var apiCall = '/listgroups';
      return ajax('GET', url + apiCall);
    },

    nzbgetHistory () {
      var url = this.nzbgetHost;
      var apiCall = '/history';
      return ajax('GET', url + apiCall);
    },

    nzbgetComponents (results) {
      let components = [];
      results.forEach((resultData, index) => {
        components.push(this.nzbgetSubheaders(index));
        if (resultData.result.length) {
          resultData.result.forEach((item) => {
            let downloadPercentage;
            let subtitle = item.Status;

            if (index === 0) {
              downloadPercentage = roundNumber(item.DownloadedSizeMB/(item.FileSizeMB/100));
              subtitle += ` - ${downloadPercentage}%`;
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

    nzbgetSubheaders (index) {
      let text;

      if (index === 0) {
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
