(function(window, document) {
  var globalName = window['dummyWidgetName']
  var dummyWidget = window[globalName]
  var queue = dummyWidget.q

  dummyWidget = function() {
    if(dummyWidget[arguments[0]] && dummyWidget[arguments[0]].apply) {
      dummyWidget[arguments[0]].apply(null, arguments)
    } else {
      console.log('Unknown call: ' + arguments[0])
    }
  }

  dummyWidget.init = function(config) {
    var loader = new WidgetLoader(config);
    if(config['client_id']) loader.loadWidget();
  }

  applyQueuedCalls(queue)

  function applyQueuedCalls(queue) {
    if(!queue) return;

    for(var i = 0; i < queue.length; i++) {
      var currentEntry = queue[i]
      dummyWidget.apply(null, currentEntry)
    }
  }

  function WidgetLoader(initConfig) {
    this.config = initConfig;
  }

  WidgetLoader.prototype.iframeUrl = function() {
    'https://raw.githack.com/fatbeard2/dummy-embed/master/script/iframe.html?' + 'client_id=' + this.initConfig['client_id']
  }

  WidgetLoader.prototype.loadWidget = function() {
    var url = this.iframeUrl()
    var iframeElement = document.createElement('iframe');
    scriptElement.src = url;
    document.body.appendChild(iframeElement);
  }

})(window, document)
