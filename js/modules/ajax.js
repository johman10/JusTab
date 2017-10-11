function ajax(method, url, headers, data) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    for (var key in headers) {
      request.setRequestHeader(key, headers[key]);
    }

    request.onload = function() {
      var response;
      try {
        response = JSON.parse(request.responseText);
      }
      catch(err) {
        response = request.responseText;
      }

      if (request.status >= 200 && request.status < 400) {
        resolve(response);
      } else {
        reject({ response, request });
      }
    };

    request.onerror = function() {
      try {
        var response = JSON.parse(request.responseText);
        reject({ response, request });
      } catch (e) {
        reject({ response: request.responseText, request });
      }
    };

    request.send(data);
  });
}

export default ajax;
