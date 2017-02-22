// Docs:
// https://github.com/Sonarr/Sonarr/wiki/API

import moment from 'moment';
import ajax from 'modules/ajax';

export default {
  computed: {
    sonarrService () {
      return this.services.find(s => s.id === 13);
    }
  },
  methods: {
    sonarr () {
      localStorage.setItem('sonarrError', false);
      return this.sonarrEpisodes()
        .then(this.sonarrComponents)
        .catch((error) => {
          console.error(error);
          localStorage.setItem('sonarrError', true);
        });
    },

    sonarrEpisodes () {
      let url = this.sonarrService.url;
      let startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
      let endDate = moment().add(1, 'months').format('YYYY-MM-DD');
      let apiCall = `api/calendar?apikey=${this.sonarrService.key}&start=${startDate}&end=${endDate}`;
      return ajax('GET', url + apiCall);
    },

    sonarrComponents (episodes) {
      episodes = episodes.sort(sortSonarrEpisodes);
      let components = [];
      let currentSection;

      episodes.forEach((episode) => {
        if (!episode.hasFile && episode.monitored) {
          let airDate = moment(episode.airDate, 'YYYY-MM-DD');
          let header = this.sonarrBuildHeader({airDate, currentSection});
          if (header) {
            currentSection = header.currentSection;
            components.push(header.component);
          }
          components.push(this.sonarrBuildEpisodeItem(episode));
        }
      });

      localStorage.setItem('sonarrComponents', JSON.stringify(components));
    },

    sonarrBuildEpisodeItem (episodeObject) {
      let tvdbid = episodeObject.series.tvdbId;
      let posterUrl = episodeObject.series.images.find(function(v) {
        return v.coverType === 'poster';
      }).url;
      let showname = episodeObject.series.title;
      let season = episodeObject.seasonNumber;
      let episode = episodeObject.episodeNumber;
      let episodeString = 'S' + (season<10?'0':'') + season + 'E' + (episode<10?'0':'') + episode;
      let date = moment(episodeObject.airDate).calendar();

      return {
        name: 'v-panel-item',
        props: {
          image: posterUrl,
          title: `${showname} ${episodeString}`,
          collapseText: date,
          components: [{
            name: 'v-panel-item-button',
            props: {
              iconClass: 'info-icon',
              url: `http://thetvdb.com/?tab=series&id=${tvdbid}`
            }
          }]
        }
      };
    },

    sonarrBuildHeader ({ airDate, currentSection }) {
      let dateToday = moment().startOf('day');
      let dateDifference = airDate.diff(dateToday, 'days');
      if (currentSection !== 'missed' && dateDifference < 0) {
        return { component: this.sonarrSubheader('Missed'), currentSection: 'missed' };
      }
      else if (currentSection !== 'today' && dateDifference === 0) {
        return { component: this.sonarrSubheader('Today'), currentSection: 'today' };
      }
      else if (currentSection !== 'tomorrow' && dateDifference === 1) {
        return { component: this.sonarrSubheader('Tomorrow'), currentSection: 'tomorrow' };
      }
      else if (currentSection !== 'soon' && dateDifference > 1 && dateDifference <= 7) {
        return { component: this.sonarrSubheader('Soon'), currentSection: 'soon' };
      }
      else if (currentSection !== 'later' && dateDifference > 7) {
        return { component: this.sonarrSubheader('Later'), currentSection: 'later' };
      }
    },

    sonarrSubheader (text) {
      return {
        name: 'v-panel-subheader',
        props: {
          text
        }
      };
    }
  }
};

function sortSonarrEpisodes (a, b) {
  return new Date(a.airDate) - new Date(b.airDate);
}
