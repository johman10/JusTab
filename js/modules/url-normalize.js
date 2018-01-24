export default function (url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `http://${url}`;
  }

  while (url.endsWith('/')) {
    url = url.slice(0, (url.length - 1));
  }

  return url;
}
