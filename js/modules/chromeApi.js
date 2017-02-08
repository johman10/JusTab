export function getBackgroundPage() {
  return new Promise((resolve, reject) => {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      resolve(backgroundPage);
    });
  });
}

export function getBackgroundFunction(functionName) {
  return new Promise((resolve, reject) => {
    getBackgroundPage().then((backgroundPage) => {
      resolve(backgroundPage[functionName]);
    });
  });
}
