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
      try {
        var resp = JSON.parse(request.responseText);
        reject(resp);
      } catch (e) {
        reject(request.responseText);
      }
    };

    request.send(data);
  });
}

export default ajax;
