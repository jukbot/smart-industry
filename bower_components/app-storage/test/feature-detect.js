/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
(function() {

onmessage = function(e) {
  if (e.data != 'featureDetect') {
    return;
  }

  if (self.indexedDB == null || self.indexedDB === undefined ||
      self.Promise === undefined) {
    self.postMessage('fail');
    return;
  }

  var timeout = self.setTimeout(function() {
    self.postMessage('fail');
  }, 1000);

  self.addEventListener('testWorkerEvents', function() {
    self.postMessage('pass');
    self.clearTimeout(timeout);
  });

  try {
    var EventConstructor = self.CustomEvent || self.Event ||
        // NOTE(cdata): Have mercy on my soul..
        event.__proto__.__proto__.constructor;

    var testWorkerEvents = new EventConstructor('testWorkerEvents');
    self.dispatchEvent(testWorkerEvents);
    return;

  } catch (e) {
    self.postMessage('fail');
  }
}
}())