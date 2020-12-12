import ajax from 'modules/ajax';

export default {
  computed: {
    githubService () {
      return this.services.find(s => s.id === 8);
    }
  },

  methods: {
    github () {
      localStorage.setItem('githubError', false);
      return this.githubRequest()
        .then(this.githubBuildJson)
        .then(this.githubComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('githubError', true);
        });
    },

    githubRequest () {
      var url = `https://github.com/trending?since=${this.githubService.time}`;
      return ajax('GET', url);
    },

    githubBuildJson (html) {
      return new Promise((resolve) => {
        const parsedDom = document.createElement('html');
        parsedDom.innerHTML = html;

        const repoListItems = Array.from(parsedDom.querySelectorAll('article'));
        const repos = repoListItems.map((repoListItem) => {
          const languageElement = repoListItem.querySelector('[itemprop="programmingLanguage"]');
          const starGazersLink = repoListItem.querySelector('[href*="/stargazers"]');
          const repoLink = repoListItem.querySelector('a:not([href*="login"]):not([aria-label*="Sponsor @"])');
          const repoInfo = repoLink.innerText.trim().replace(/[ \n]/g, '');
          const descriptionElement = repoListItem.querySelector('p.text-gray');
          const title = repoInfo.split('/')[1];
          const owner = repoInfo.split('/')[0];

          return {
            language: languageElement ? languageElement.innerText.trim() : null,
            stars: starGazersLink ? starGazersLink.innerText.trim() : 0,
            title,
            owner,
            description: descriptionElement ? descriptionElement.innerText.trim() : null,
            url: `https://github.com/${owner}/${title}`
          };
        });

        resolve(repos);
      });
    },

    githubComponents (json) {
      let components = [];

      json.forEach((repo) => {
        let extraTitle = '';
        if (repo.language) {
          extraTitle += `${repo.language} - `;
        }
        extraTitle += `${repo.stars} Stars`;

        components.push({
          name: 'v-panel-item',
          props: {
            url: repo.url,
            title: `${repo.owner}/${repo.title}`,
            extraTitle,
            subtitle: repo.description
          }
        });
      });

      if (components.length === 0) {
        components.push({
          name: 'v-panel-item',
          props: {
            title: 'There are no repositories to show at the moment.'
          }
        });
      }

      localStorage.setItem('githubComponents', JSON.stringify(components));
    }
  }
};
