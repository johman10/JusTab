export default function imageResize (imageUrl) {
  return new Promise((resolve) => {
    var image = new Image();

    image.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // set its dimension to target size
      canvas.width = 150;
      canvas.height = canvas.width / image.width * image.height;

      // draw source image into the off-screen canvas:
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // encode image to data-uri with base64 version of compressed image
      // TODO: replace mime type with a dynamic var based on the url
      resolve(canvas.toDataURL('image/jpeg'));
    };

    image.onerror = function () {
      resolve('img/poster_fallback.png');
    };

    image.src = imageUrl;
  });
}
