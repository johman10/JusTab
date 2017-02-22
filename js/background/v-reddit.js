import ajax from 'modules/ajax';

export default {
  computed: {
    redditService () {
      return this.services.find(s => s.id === 11);
    }
  },

  methods: {
    reddit () {
      localStorage.setItem('redditError', false);
      return this.redditPosts()
        .then(this.redditComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('redditError', true);
        });
    },

    redditPosts () {
      let url = 'https://www.reddit.com';
      let sorting = this.redditService.sorting;
      let sortingArray = sorting.split(' - ');
      let sortingType = sortingArray[0].toLowerCase();
      let sortingTime;

      if (sortingArray.length > 1) {
        sortingTime = sortingArray[1].toLowerCase();
      }

      let apiCall = `/r/${this.redditService.subreddit}/${sortingType}.json${sortingTime ? `?t=${sortingTime}` : ''}`;
      return ajax('GET', url + apiCall);
    },

    redditComponents (posts) {
      let components = [];
      posts.data.children.forEach(function(post) {
        components.push({
          name: 'v-panel-item',
          props: {
            url: post.data.url,
            title: post.data.title,
            subtitleUrl: post.data.permalink,
            extraTitle: `/r/${post.data.subreddit}`,
            subtitle: `${post.data.num_comments} comments - ${post.data.score} points`
          }
        });
      });

      localStorage.setItem('redditComponents', JSON.stringify(components));
    }
  }
};
