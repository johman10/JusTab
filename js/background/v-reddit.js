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
        .then(this.redditFilter)
        .then(this.redditComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
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

    redditFilter (posts) {
      let filteredPosts = [];
      if (this.redditService.nsfw === false) {
        posts.data.children.forEach((post) => {
          const isNotOver18 = !post.data.over_18;
          if (isNotOver18) {
            filteredPosts.push(post);
          }
        });
      } else {
        filteredPosts = posts.data.children;
      }
      return filteredPosts;
    },

    redditComponents (posts) {
      let components = [];
      posts.forEach((post) => {
        const isOver18 = post.data.over_18;
        components.push({
          name: 'v-panel-item',
          props: {
            url: post.data.url,
            title: post.data.title,
            subtitleUrl: `https://reddit.com${post.data.permalink}`,
            extraTitle: `/r/${post.data.subreddit}`,
            subtitle: `${post.data.num_comments} comments - ${post.data.score} points${isOver18 ? ' - NSFW' : ''}`
          }
        });
      });

      localStorage.setItem('redditComponents', JSON.stringify(components));
    }
  }
};
