// Docs:
// http://developers.news.layervault.com/
import ajax from 'modules/ajax';

export default {
  computed: {
    designerNewsService () {
      return this.services.find(s => s.id === 6);
    }
  },
  methods: {
    designerNews () {
      return this.getStories()
        .then(this.designerNewsComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('designerNewsError', true);
        });
    },

    getStories () {
      return new Promise((resolve, reject) => {
        var url = 'https://www.designernews.co/api/v2/';
        var apiCall = 'stories';
        var apiKey = '?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a';

        ajax('GET', url + apiCall + apiKey)
          .then(function(data) {
            localStorage.setItem('designerNewsError', false);
            resolve(data);
          })
          .catch(reject);
      });
    },

    designerNewsComponents (data) {
      let components = [];
      data.stories.forEach((story) => {
        let url = story.url || 'https://www.designernews.co/stories/' + story.id;
        let subUrl = `https://www.designernews.co/stories/${story.id}`;
        let badge = story.badge ? require(`img/dn_badges/badge_${story.badge}.png`) : false;

        components.push({
          name: 'v-panel-item',
          props: {
            image: badge,
            title: story.title,
            url: url,
            subtitle: story.comment_count + ' comments - ' + story.vote_count + ' points',
            subtitleUrl: subUrl
          }
        });
      });

      localStorage.setItem('designerNewsComponents', JSON.stringify(components));
    }
  }
};
