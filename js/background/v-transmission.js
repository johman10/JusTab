import ajax from 'modules/ajax';

const TRANSMISSION_FIELDS =  ['activityDate', 'addedDate', 'bandwidthPriority', 'comment', 'corruptEver', 'creator', 'dateCreated', 'desiredAvailable', 'doneDate', 'downloadDir', 'downloadedEver', 'downloadLimit', 'downloadLimited', 'error', 'errorString', 'eta', 'files', 'fileStats', 'hashString', 'haveUnchecked', 'haveValid', 'honorsSessionLimits', 'id', 'isFinished', 'isPrivate', 'leftUntilDone', 'magnetLink', 'manualAnnounceTime', 'maxConnectedPeers', 'metadataPercentComplete', 'name', 'peer-limit', 'peers', 'peersConnected', 'peersFrom', 'peersGettingFromUs', 'peersKnown', 'peersSendingToUs', 'percentDone', 'pieces', 'pieceCount', 'pieceSize', 'priorities', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedIdleLimit', 'seedIdleMode', 'seedRatioLimit', 'seedRatioMode', 'sizeWhenDone', 'startDate', 'status', 'trackers', 'trackerStats', 'totalSize', 'torrentFile', 'uploadedEver', 'uploadLimit', 'uploadLimited', 'uploadRatio', 'wanted', 'webseeds', 'webseedsSendingToUs'];
const STATUS_ARRAY = ['Stopped', 'Check Waiting', 'Checking', 'Download Waiting', 'Downloading', 'Seed Waiting', 'Seeding', 'Isolated'];

export default {
  computed: {
    transmissionService () {
      return this.services.find(s => s.id === 14);
    },
    emptyListComponent () {
      return {
        name: 'v-panel-item',
        props: {
          title: 'There are no torrents to show here at the moment.'
        }
      };
    }
  },

  data () {
    return {
      transmissionSessionKey: ''
    };
  },

  methods: {
    transmission (page) {
      this.transmissionPage = page || this.transmissionPage;
      localStorage.setItem('transmissionError', false);
      return this.transmissionItems()
        .then(this.transmissionComponents)
        .catch(this.transmissionRetry);
    },

    transmissionItems () {
      const authPassword = this.transmissionService.password ? `:${this.transmissionService.password}` : '';
      const authString = this.transmissionService.username + authPassword;
      const apiUrl = `${this.transmissionService.url}/rpc`;
      const headers = {
        'X-Transmission-Session-Id': this.transmissionSessionKey,
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(authString)}`
      };
      const data = {
        arguments: {
          fields: TRANSMISSION_FIELDS
        },
        method: 'torrent-get'
      };
      // TODO: See if I can limit the amount returned by the API
      return ajax('POST', apiUrl, headers, JSON.stringify(data));
    },

    transmissionComponents (requestResponse) {
      let torrents = requestResponse.arguments.torrents;
      // Only pick the first 25 items;
      let components = [];

      components = components.concat(this.transmissionQueueComponents(torrents));
      components = components.concat(this.transmissionHistoryComponents(torrents));
      localStorage.setItem('transmissionComponents', JSON.stringify(components));
    },

    transmissionQueueComponents (torrents) {
      torrents = torrents.filter(torrent => torrent.status !== 0);

      const queueComponents = [];
      queueComponents.push(this.transmissionSubheaders('Queue'));

      if (!torrents.length) {
        queueComponents.push(this.emptyListComponent);
        return queueComponents;
      }

      torrents.sort((torrentA, torrentB) => torrentB.percentDone - torrentA.percentDone);
      torrents.forEach(torrent => {
        const percentage = Number(Math.round(torrent.percentDone + 'e2') + 'e-2') * 100;
        queueComponents.push({
          name: 'v-panel-item',
          props: {
            title: torrent.name,
            subtitle: `${STATUS_ARRAY[torrent.status]} - ${percentage}%`
          }
        });
      });

      return queueComponents;
    },

    transmissionHistoryComponents (torrents) {
      torrents = torrents.filter(torrent => torrent.status === 0);
      torrents.sort((torrentA, torrentB) => torrentB.addedDate - torrentA.addedDate);

      const historyComponents = [];
      historyComponents.push(this.transmissionSubheaders('History'));

      if (!torrents.length) {
        historyComponents.push(this.emptyListComponent);
        return historyComponents;
      }

      torrents.forEach(torrent => {
        historyComponents.push({
          name: 'v-panel-item',
          props: {
            title: torrent.name,
            subtitle: STATUS_ARRAY[torrent.status]
          }
        });
      });

      return historyComponents;
    },

    transmissionSubheaders (text) {
      return {
        name: 'v-panel-subheader',
        props: {
          text
        }
      };
    },

    transmissionRetry (error) {
      // TODO: Prevent endless loop
      if (error && error.request && error.request.status === 409) {
        this.transmissionSessionKey = error.request.getResponseHeader('X-Transmission-Session-Id');
        return this.transmission();
      }
      console.error(error); // eslint-disable-line no-console
      localStorage.setItem('transmissionError', true);
    }
  }
};
