
function tabsInWindow () {
  return new Promise(function(resolve) {
    chrome.tabs.getAllInWindow(function (tabs) {
      resolve(tabs);
    });
  });
}
function fetchBookmarks () {
  return new Promise((resolve) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
    });
  });
}

function isInRightFolder (storage, folder) {
  const bookmarksFolder = storage.bookmarksFolder.split('/').filter(s => s).join('/');
  folder = folder.split('/').filter(s => s).join('/');
  return (storage.recursive && folder.startsWith(bookmarksFolder)) ||
          (!storage.recursive && folder === bookmarksFolder);
}
function findBookmarksFolder (root, storage, parentPath='', parentId=undefined) {
  return new Promise((resolve) => {
    if (isInRightFolder(storage, parentPath)) {
      resolve({ parentPath, children: root, id: parentId })
    } else {
      const childrens = root.map((bookmark) => {
        if (bookmark.children) {
          // Be warned! To many nested folders is not good with this solution
          return findBookmarksFolder(bookmark.children, storage, parentPath + bookmark.title + '/', bookmark.id)
        }
      }).filter(b => b);
      if (childrens.length == 0) resolve();
      else Promise.all(childrens).then((bookmarks) => {
        const b = bookmarks.filter(b => b)
        if (b.length === 0) resolve();
        else resolve(b[0]);
      });
    }
  }).then((root) => {
    if (root) return root;
    if (parentPath === '') throw new Error("No bookmarks folder found: " + (storage.bookmarksFolder || '/'));
  });
}

export let saveOpenTabsToFolder = function (storage) {
  return () => {
    fetchBookmarks()
    .then((root) => findBookmarksFolder(root, storage))
    .then((bookmark) => {
      tabsInWindow()
      .then(function (tabs) {
        const tabsToRemove = tabs.map((tab) => {
          if (tab.url.startsWith('chrome://')) return false;
          chrome.bookmarks.create({
            url: tab.url,
            title: tab.title,
            parentId: bookmark.id
          });
          return tab.id;
        }).filter(t => t);
        chrome.tabs.remove(tabsToRemove)
      })
      .then(() => {
        chrome.runtime.sendMessage({ name: 'startRefresh', serviceId: 15 });
      });
    });
  }
}
export let openNonOpenBookmarks = function () {
  // TODO: Implement method to open all bookmarks in the list that isn't currently open in the active window
  throw new Error("Not implemented yet!");
}
export let closeOpenedBookmarks = function () {
  // TODO: Implement method to close all bookmarks that are open in current window and also exist in the bookmarks list
  throw new Error("Not implemented yet!");
}