export default {
  computed: {
    bookmarksService () {
      return this.services.find(s => s.id === 15);
    }
  },

  methods: {
    bookmarks () {
      localStorage.setItem('bookmarksError', false);
      return this.fetchBookmarks()
        .then(this.flattenBookmarks)
        .then(this.bookmarkComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('bookmarksError', true);
        });
    },

    fetchBookmarks () {
      return new Promise((resolve) => {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
          resolve(bookmarkTreeNodes);
        });
      })
    },
    flattenBookmarks (root, parentPath='', parentId=undefined) {
      let bookmarks = [];
      root.forEach((bookmark) => {
        if (!bookmark.children) {
          if (this.isInRightFolder(parentPath)) {
            bookmarks.push(Object.assign({ parentPath }, bookmark));
          }
        } else {
          // Be warned! To many nested folders is not good with this solution
          const childBookmarks = this.flattenBookmarks(bookmark.children, parentPath + bookmark.title + '/', bookmark.id);
          bookmarks = childBookmarks.concat(bookmarks);
        }
      });
      if (this.isInRightFolder(parentPath)) {
        bookmarks.push({ parentPath, children: root, id: parentId })
      }
      return bookmarks;
    },
    bookmarkComponents (bookmarks) {
      let components = [];
      let folderId = '';
      bookmarks.reverse().forEach((bookmark) => {
        if (!bookmark.children) {
          components.push({
            name: 'v-panel-item',
            props: {
              url: bookmark.url,
              title: `${bookmark.title}`,
              subtitle: `${bookmark.parentPath}`,
              components: [{
                name: 'v-panel-item-button',
                props: {
                  url: 'chrome://bookmarks/?id=' + folderId,
                  iconClass: 'edit-icon'
                }
              }]
            }
          });
        } else {
          folderId = bookmark.id;
          components.push({
            name: 'v-panel-subheader',
            props: {
              icon: this.bookmarksService.logo,
              text: bookmark.parentPath
            }
          });
        }
      });

      if (components.length === 0) {
        components.push({
          name: 'v-panel-item',
          props: {
            title: 'There are no bookmarks to show at the moment.',
            subtitle: `Selected folder: ${this.bookmarksService.folder}`
          }
        });
      }

      localStorage.setItem('bookmarksComponents', JSON.stringify(components));
    },

    isInRightFolder (folder) {
      return (this.bookmarksService.recursive && folder.startsWith(this.bookmarksService.folder)) ||
              (!this.bookmarksService.recursive && folder === this.bookmarksService.folder);
    }
  }
};
