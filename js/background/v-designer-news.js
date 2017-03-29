// Docs:
// http://developers.news.layervault.com/
import ajax from 'modules/ajax';
const badges = {
  ama: require('img/dn_badges/badge_ama.png'),
  apple: require('img/dn_badges/badge_apple.png'),
  ask: require('img/dn_badges/badge_ask.png'),
  css: require('img/dn_badges/badge_css.png'),
  design: require('img/dn_badges/badge_design.png'),
  discussion: require('img/dn_badges/badge_discussion.png'),
  layervault: require('img/dn_badges/badge_layervault.png'),
  pinned: require('img/dn_badges/badge_pinned.png'),
  podcast: require('img/dn_badges/badge_podcast.png'),
  show: require('img/dn_badges/badge_show.png'),
  sponsored: require('img/dn_badges/badge_sponsored.png'),
  type: require('img/dn_badges/badge_type.png'),
  video: require('img/dn_badges/badge_video.png')
};

export default {
  computed: {
    designerNewsService () {
      return this.services.find(s => s.id === 6);
    }
  },
  methods: {
    designerNews () {
      localStorage.setItem('designerNewsError', false);
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
        let badge = story.badge ? badges[story.badge] : false;

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
