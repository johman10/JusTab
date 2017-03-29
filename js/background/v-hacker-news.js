// Docs:
// https://github.com/HackerNews/API
import ajax from 'modules/ajax';

export default {
  computed: {
    hackerNewsService () {
      return this.services.find(s => s.id === 7);
    }
  },

  methods: {
    hackerNews () {
      localStorage.setItem('hackerNewsError', false);
      return this.hackerNewsStoryIds()
        .then(this.hackerNewsStories)
        .then(this.hackerNewsComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('hackerNewsError', true);
        });
    },

    hackerNewsStoryIds () {
      return new Promise((resolve, reject) => {
        var url = 'https://hacker-news.firebaseio.com/v0/';
        var apiCall = 'topstories.json';

        ajax('GET', url + apiCall)
          .then(function(data) {
            resolve(data.slice(0,25));
          })
          .catch(reject);
      });
    },

    hackerNewsStories (ids) {
      var promises = [];

      ids.forEach(function(id) {
        var url = 'https://hacker-news.firebaseio.com/v0/';
        var apiCall = `item/${id}.json`;
        promises.push(ajax('GET', url + apiCall));
      });

      return Promise.all(promises);
    },

    hackerNewsComponents (stories) {
      let components = [];
      stories.forEach((story) => {
        components.push({
          name: 'v-panel-item',
          props: {
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            title: story.title,
            subtitleUrl: `https://news.ycombinator.com/item?id=${story.id}`,
            subtitle: `${story.descendants} comments - ${story.score} points`
          }
        });
      });

      localStorage.setItem('hackerNewsComponents', JSON.stringify(components));
    }
  }
};
