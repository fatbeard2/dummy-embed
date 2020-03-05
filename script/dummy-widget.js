(function(window, document) {
  var globalName = window['dummyWidgetName']
  var queue = window[globalName].q

  var dummyWidget = function() {
    console.log(arguments)
    if(dummyWidget[arguments[0]] && dummyWidget[arguments[0]].apply) {
      dummyWidget[arguments[0]].apply(null, Array.prototype.slice.call(arguments, 1))
    } else {
      console.log('Unknown call: ' + arguments[0])
    }
  }

  dummyWidget.init = function(config) {
    var loader = new WidgetLoader(config);
    if(config['client_id']) loader.loadWidget();
  }

  window[globalName] = dummyWidget
  applyQueuedCalls(queue)

  function applyQueuedCalls(queue) {
    if(!queue) return;

    for(var i = 0; i < queue.length; i++) {
      var currentEntry = queue[i]
      dummyWidget.apply(null, currentEntry)
    }
  }

  function WidgetLoader(config) {
    this.config = config;
  }

  WidgetLoader.prototype.iframeUrl = function() {
    return 'https://raw.githack.com/fatbeard2/dummy-embed/master/script/iframe.html?' + 'client_id=' + this.config['client_id']
  }

  WidgetLoader.prototype.loadWidget = function() {
    var url = this.iframeUrl()
    var iframeElement = document.createElement('iframe');
    iframeElement.src = url;
    document.body.appendChild(iframeElement);
  }

})(window, document)
