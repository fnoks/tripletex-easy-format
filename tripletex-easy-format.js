var doc = window.document;

function setup(container) {
  var inputs = container.getElementsByClassName('hours');
  var arr = Array.prototype.slice.call(inputs);
  for (var i=0; i<arr.length; i++) {
    var element = arr[i];
    if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" smart-processed ") > -1 ) {
      //Skip already processed fields
      continue;
    }
    element.addEventListener("blur", function (event) {
      var value = event.target.value;
      var parts = value.split(':');

      if (parts.length === 2) {
        var element = event.target;
        element.value = parseInt(parts[0]) + parseFloat(parseInt(parts[1])/60);
        if ("createEvent" in doc) {
          var evt = doc.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          element.dispatchEvent(evt);
        }
        else {
          element.fireEvent("onchange");
        }
      }
      var oldClasses = element.getAttribute('class');
      element.setAttribute('class', oldClasses + ' smart-processed');
    }, true);
    
  }
}

var interval = setInterval(function () {
  var container = doc.getElementById('ajaxContenthourListTable');
  if (container) {
    setup(container);
  }
}, 3000);