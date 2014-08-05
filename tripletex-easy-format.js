var frame = document.getElementsByName('content')[0];

// Wait until the frame(!) is loaded
frame.onload = function () {

  var doc = frame.contentDocument || frame.contentWindow.document;
  var inputs = doc.getElementsByTagName('input');
  var arr = Array.prototype.slice.call(inputs);

  for(var i=0; i<arr.length; i++) {
    var element = arr[i];
    if(element.id.indexOf('weeks[') !== -1) {
      element.addEventListener("blur", function( event ) {
        var value = event.target.value;
        var parts = value.split(':');
        
        if(parts.length === 2) {
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
      }, true);
    }
  }
};
