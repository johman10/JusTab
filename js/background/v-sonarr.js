// Docs:
// https://github.com/Sonarr/Sonarr/wiki/API

import dayjs from 'dayjs';
import ajax from '~modules/ajax';
import dateFormat from '~modules/date-format';
import imageResize from '~modules/image-resize';

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
        .then(this.sonarrImages)
        .then(this.sonarrComponents)
        .catch((error) => {
          console.error(error); // eslint-disable-line no-console
          localStorage.setItem('sonarrError', true);
        });
    },

    sonarrEpisodes () {
      const url = this.sonarrService.url;
      const startDate = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
      const endDate = dayjs().add(1, 'months').format('YYYY-MM-DD');
      const params = `apikey=${this.sonarrService.key}&start=${startDate}&end=${endDate}`;
      const apiUrl = `${url}/api/calendar?${params}`;
      return ajax('GET', apiUrl);
    },

    sonarrImages (episodes) {
      const posterPromises = episodes.map(this.sonarrPoster);
      return Promise.all(posterPromises);
    },

    sonarrPoster (episode) {
      const episodeClone = Object.assign({}, episode);
      const posterUrl = episode.series.images.find(image => image.coverType === 'poster').url;
      return imageResize(posterUrl).then((posterString) => {
        episodeClone.customPoster = posterString;
        return episodeClone;
      });
    },

    sonarrComponents (episodes) {
      episodes = episodes.sort(sortSonarrEpisodes);
      let components = [];
      let currentSection;

      episodes.forEach((episode) => {
        if (!episode.hasFile && episode.monitored) {
          let airDate = dayjs(episode.airDate, 'YYYY-MM-DD');
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
      let posterUrl = episodeObject.customPoster;
      let showname = episodeObject.series.title;
      let season = episodeObject.seasonNumber;
      let episode = episodeObject.episodeNumber;
      let episodeString = 'S' + (season<10?'0':'') + season + 'E' + (episode<10?'0':'') + episode;
      let date = dateFormat(dayjs(episodeObject.airDate));

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
      let dateToday = dayjs().startOf('day');
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
