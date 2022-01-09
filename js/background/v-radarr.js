// Docs:
// https://github.com/radarr/radarr/wiki/API

import dayjs from 'dayjs';
import ajax from 'modules/ajax';
import dateFormat from 'modules/date-format';
import imageResize from 'modules/image-resize';

export default {
  computed: {
    radarrService() {
      return this.services.find(s => s.id === 15);
    },
  },
  methods: {
    radarr() {
      localStorage.setItem('radarrError', false);
      return this.radarrMovies()
        .then(this.radarrLists)
        .then(this.radarrImages)
        .then(this.radarrComponents)
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          localStorage.setItem('radarrError', true);
        });
    },

    radarrMovies() {
      const url = this.radarrService.url;
      const params = `apikey=${this.radarrService.key}`;
      const apiUrl = `${url}/api/v3/movie?${params}`;
      return ajax('GET', apiUrl);
    },

    radarrLists(movies) {
      const released = [];
      const inCinemas = [];
      const wanted = [];
      const today = dayjs().startOf('day');
      movies.forEach(movie => {
        const daysToCinema = dayjs(movie.inCinemas).diff(today, 'days');
        const daysToPhysical = dayjs(movie.physicalRelease).diff(today, 'days');
        if (movie.hasFile || !movie.monitored) return;
        if (daysToPhysical < 0 && daysToPhysical > -14) {
          released.push(movie);
        } else if (daysToCinema < 0 && daysToCinema > -14) {
          inCinemas.push(movie);
        } else {
          wanted.push(movie);
        }
      });
      return [released, inCinemas, wanted.splice(0, 25)];
    },

    radarrImages(movieLists) {
      const promises = movieLists.map(movies => {
        const posterPromises = movies.splice(0, 25).map(this.radarrPoster);
        return Promise.all(posterPromises);
      });
      return Promise.all(promises);
    },

    radarrPoster(movie) {
      const movieClone = Object.assign({}, movie);
      const posterObject = movie.images.find(
        image => image.coverType === 'poster',
      );
      if (!posterObject) return Promise.resolve(movieClone);
      const url = posterObject.remoteUrl;
      return imageResize(url).then(posterString => {
        movieClone.customPoster = posterString;
        return movieClone;
      });
    },

    radarrComponents([released, inCinemas, wanted]) {
      let components = [];
      components.push(this.radarrSubheader('Released'));
      if (released.length) {
        components = components.concat(
          released.map(this.radarrBuildEpisodeItem),
        );
      } else {
        components.push(
          this.radarrEmptyItem('There are no released movies at the moment.'),
        );
      }
      components.push(this.radarrSubheader('In the cinema'));
      if (inCinemas.length) {
        components = components.concat(
          inCinemas.map(this.radarrBuildEpisodeItem),
        );
      } else {
        components.push(
          this.radarrEmptyItem(
            'There are no movies in the cinema at the moment.',
          ),
        );
      }
      components.push(this.radarrSubheader('Wanted'));
      components = components.concat(wanted.map(this.radarrBuildEpisodeItem));
      localStorage.setItem('radarrComponents', JSON.stringify(components));
    },

    radarrBuildEpisodeItem(movieObject) {
      let tmdbId = movieObject.tmdbId;
      let posterUrl = movieObject.customPoster;
      let movieName = movieObject.title;
      let date = dateFormat(dayjs(movieObject.inCinemas));

      return {
        name: 'v-panel-item',
        props: {
          image: posterUrl,
          title: `${movieName}`,
          collapseText: date,
          components: [
            {
              name: 'v-panel-item-button',
              props: {
                iconClass: 'info-icon',
                url: `https://www.themoviedb.org/movie/${tmdbId}`,
              },
            },
          ],
        },
      };
    },

    radarrEmptyItem(title) {
      return {
        name: 'v-panel-item',
        props: {
          title,
        },
      };
    },

    radarrSubheader(text) {
      return {
        name: 'v-panel-subheader',
        props: {
          text,
        },
      };
    },
  },
};
