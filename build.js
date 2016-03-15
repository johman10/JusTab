var compass = require('compass');
var mversion = require('mversion');
var fs = require('fs-extra');
var zipFolder = require('zip-folder');

compass.compile(function(err, stdout, stderr) {
  if(err) {
    console.log('compass failed with error: ' + err);
  } else {
    console.log('compass done');
    mversion.update('patch', function (err, data) {
      if(err) {
        console.log('version patching failed with error: ' + err);
      } else {
        console.log('version patched');

        fs.emptyDirSync('dist');
        fs.copySync('img', 'dist/img');
        fs.copySync('node_modules/dragula/dist/dragula.min.js', 'dist/node_modules/dragula/dist/dragula.min.js');
        fs.copySync('node_modules/dragula/dist/dragula.min.css', 'dist/node_modules/dragula/dist/dragula.min.css');
        fs.copySync('node_modules/jquery/dist/jquery.min.js', 'dist/node_modules/jquery/dist/jquery.min.js');
        fs.copySync('node_modules/moment/min/moment.min.js', 'dist/node_modules/moment/min/moment.min.js');
        fs.copySync('node_modules/jquery-lazyload/jquery.lazyload.js', 'dist/node_modules/jquery-lazyload/jquery.lazyload.js');
        fs.copySync('style/css', 'dist/style/css');
        fs.copySync('style/fonts', 'dist/style/fonts');
        fs.copySync('index.html', 'dist/index.html');
        fs.copySync('options.html', 'dist/options.html');
        fs.copySync('background.html', 'dist/background.html');
        fs.copySync('manifest.json', 'dist/manifest.json');
        console.log('copying done');

        zipFolder('./dist', './dist.zip', function(err) {
          if(err) {
            console.log('Compression failed with the following errors: ' + err);
          } else {
            console.log('Compression done');
          }
        });
      }
    });
  }
});
