import ajax from 'modules/ajax';

export default {
  computed: {
    productHuntService () {
      return this.services.find(s => s.id === 9);
    }
  },

  methods: {
    productHunt () {
      localStorage.setItem('productHuntError', false);
      return this.productHuntToken()
        .then(this.productHuntPosts)
        .then(this.productHuntComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('productHuntError', true);
        });
    },

    productHuntToken () {
      var url = 'https://api.producthunt.com/v1/oauth/token';
      return ajax(
        'POST',
        url,
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // '{"client_id" : "f8127a54f3e548ae178cbcb42b3bbf5d7465e99549839a17c00ae1697dfd07c5", "client_secret" : "b37ff09eaa04c1d148e03af94555774c9b653c2dc56391dcec85a5b657ce8c8c", "grant_type" : "client_credentials"}'
        '{"client_id" : "4a6c8ab542d980ab608413902710f2902d76d771737a4ae4d9824a1627dc5a5b", "client_secret" : "bd9ca7a89b428c7f32f3fcfaac6b8c46c0916efcf077fef221ac6b5c20b313a8", "grant_type" : "client_credentials"}'
      );
    },

    productHuntPosts (tokenData) {
      return ajax(
        'GET',
        'https://api.producthunt.com/v1/posts',
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenData.access_token
        }
      );
    },

    productHuntComponents (postData) {
      let components = [];
      postData.posts.forEach((post) => {
        components.push({
          name: 'v-panel-item',
          props: {
            url: post.redirect_url,
            title: post.name,
            subtitleUrl: post.discussion_url,
            subtitle: `${post.comments_count} comments - ${post.votes_count} points`
          }
        });
      });

      localStorage.setItem('productHuntComponents', JSON.stringify(components));
    }
  }
};
