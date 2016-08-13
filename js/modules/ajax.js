function ajax(method, url, headers, data) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    for (var key in headers) {
      request.setRequestHeader(key, headers[key]);
    }

    request.onload = function() {
      var resp;
      try {
        resp = JSON.parse(request.responseText);
      }
      catch(err) {
        resp = request.responseText;
      }

      if (request.status >= 200 && request.status < 400) {
        resolve(resp);
      } else {
        reject(resp);
      }
    };

    request.onerror = function() {
      var resp = JSON.parse(request.responseText);
      console.log(request.responseText);
      reject(resp);
    };

    console.log(request);

    request.send(data);
  })
}
